"use client";

import Link from "next/link";
import { ArrowUpRight, LoaderCircle, ShieldCheck } from "lucide-react";
import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { services } from "@/data/services";
import {
  contactFieldErrors,
  contactSchema,
  type ContactFieldErrors,
  type ContactResponse,
} from "@/lib/contact-schema";

interface ContactFormProps {
  enabled: boolean;
  initialService?: string;
}

const subscribe = () => () => {};

export function ContactForm({
  enabled,
  initialService = "",
}: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [state, setState] = useState<
    | "idle"
    | "invalid"
    | "checked"
    | "sending"
    | "sent"
    | "failed"
    | "unavailable"
  >("idle");
  const selectedService = services.some(
    (service) => service.slug === initialService,
  )
    ? initialService
    : "";

  function focusFirstError(errors: ContactFieldErrors) {
    const name = Object.keys(errors)[0];
    requestAnimationFrame(() => {
      const field = name ? formRef.current?.elements.namedItem(name) : null;
      if (field instanceof HTMLElement) field.focus();
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setMessage("");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const errors = contactFieldErrors(parsed.error);
      setFieldErrors(errors);
      setState("invalid");
      setMessage("Bitte prüfen Sie die markierten Eingaben.");
      focusFirstError(errors);
      return;
    }
    setFieldErrors({});
    if (!enabled) {
      setState("checked");
      setMessage(
        "Die Eingaben sind gültig. Demomodus: Es wurde keine Nachricht gesendet. Ihre Eingaben wurden nicht übertragen.",
      );
      return;
    }

    setSending(true);
    setState("sending");
    setMessage("Ihre Nachricht wird übermittelt …");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
        signal: AbortSignal.timeout(25_000),
      });
      const result = (await response.json()) as ContactResponse;
      if (response.ok && result.ok === true) {
        setState("sent");
        setMessage(result.message);
        formRef.current?.reset();
      } else {
        setState(response.status === 503 ? "unavailable" : "failed");
        setMessage(
          typeof result.message === "string"
            ? result.message
            : "Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.",
        );
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
          focusFirstError(result.fieldErrors);
        }
      }
    } catch {
      setState("failed");
      setMessage(
        "Die Übermittlung konnte nicht bestätigt werden. Bitte versuchen Sie es später erneut.",
      );
    } finally {
      setSending(false);
    }
  }

  function errorFor(name: keyof ContactFieldErrors) {
    const errors = fieldErrors[name];
    return errors?.length ? (
      <p id={`${name}-error`} className="field-error">
        {errors[0]}
      </p>
    ) : null;
  }

  return (
    <form
      ref={formRef}
      className="contact-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Projektanfrage"
      aria-describedby="contact-mode"
      aria-busy={sending}
    >
      <div className="contact-form-heading">
        <p className="eyebrow">Ihr Projekt</p>
        <h2>Was haben Sie vor?</h2>
        <p>
          Ob einzelner Raum oder mehrere Arbeiten: Ein paar Angaben helfen, Ihr
          Vorhaben einzuordnen.
        </p>
      </div>
      {!enabled && (
        <div id="contact-mode" className="form-notice">
          <strong className="flex items-center gap-2">
            <ShieldCheck size={18} aria-hidden="true" />
            Demomodus – kein Versand
          </strong>
          <p>
            Sie können das Formular ausprobieren. „Eingaben prüfen“ kontrolliert
            Ihre Angaben nur in diesem Browser. Es werden keine Formulardaten
            übertragen und keine Nachrichten gesendet.
          </p>
        </div>
      )}
      {enabled && (
        <p id="contact-mode">
          Beschreiben Sie Ihr Vorhaben. Mit * gekennzeichnete Felder sind
          erforderlich.
        </p>
      )}
      {!enabled && (
        <p className="form-help">
          Mit * gekennzeichnete Felder sind für die Prüfung erforderlich.
        </p>
      )}
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="contact-name">Name *</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            disabled={sending}
            required
            minLength={2}
            maxLength={100}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
          />
          {errorFor("name")}
        </div>
        <div className="form-field">
          <label htmlFor="contact-email">E-Mail *</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            disabled={sending}
            required
            maxLength={254}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          {errorFor("email")}
        </div>
        <div className="form-field">
          <label htmlFor="contact-phone">
            Telefon <span>(freiwillig)</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            disabled={sending}
            maxLength={30}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
          />
          {errorFor("phone")}
        </div>
        <div className="form-field">
          <label htmlFor="contact-service">Gewünschte Leistung *</label>
          <select
            id="contact-service"
            name="service"
            required
            defaultValue={selectedService}
            disabled={sending}
            aria-invalid={Boolean(fieldErrors.service)}
            aria-describedby={fieldErrors.service ? "service-error" : undefined}
          >
            <option value="">Bitte auswählen</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.title}
              </option>
            ))}
          </select>
          {errorFor("service")}
        </div>
        <div className="form-field form-field-full">
          <label htmlFor="contact-message">Nachricht *</label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            required
            minLength={20}
            maxLength={3000}
            disabled={sending}
            placeholder="Welche Räume oder Flächen möchten Sie verändern? Wie ist der aktuelle Zustand?"
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={
              fieldErrors.message
                ? "message-help message-error"
                : "message-help"
            }
          />
          <p id="message-help" className="form-help">
            20 bis 3000 Zeichen. Bitte keine vertraulichen oder sensiblen
            Angaben eintragen.
          </p>
          {errorFor("message")}
        </div>
      </div>
      <div hidden aria-hidden="true">
        <label htmlFor="contact-website">Dieses Feld bitte leer lassen</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
        />
      </div>
      <p className="form-help">
        {enabled
          ? "Ihre Angaben werden zur Bearbeitung Ihrer Anfrage übermittelt. "
          : "Die Prüfung erfolgt lokal in Ihrem Browser. "}
        Hinweise zum Umgang mit Daten finden Sie in der{" "}
        <Link href="/datenschutz">Datenschutzerklärung</Link>.
      </p>
      <button
        className="button button-primary"
        type="submit"
        disabled={!hydrated || sending}
      >
        {sending && (
          <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />
        )}
        {sending
          ? "Wird übermittelt …"
          : enabled
            ? "Nachricht senden"
            : "Eingaben prüfen"}
        {!sending && <ArrowUpRight size={18} aria-hidden="true" />}
      </button>
      {!enabled && (
        <p className="form-help">
          Der Nachrichtenversand ist noch nicht verfügbar.
        </p>
      )}
      <noscript>
        <p>
          Bitte aktivieren Sie JavaScript, um die Eingaben im Formular zu
          prüfen.
        </p>
      </noscript>
      <div
        className="form-status"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        data-state={state}
      >
        {message && <p>{message}</p>}
      </div>
    </form>
  );
}
