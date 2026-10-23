"use client";

import Link from "next/link";
import { pagePath, type Locale } from "@/i18n/routing";
import { formCopy } from "@/i18n/form";
import { ArrowUpRight, LoaderCircle, ShieldCheck } from "lucide-react";
import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { serviceSlugs, serviceLabels } from "@/data/service-identifiers";
import {
  contactFieldErrors,
  contactSchema,
  type ContactFieldErrors,
  type ContactResponse,
} from "@/lib/contact-schema";

interface ContactFormProps {
  enabled: boolean;
  locale?: Locale;
  initialService?: string;
}

const subscribe = () => () => {};

export function ContactForm({
  enabled,
  initialService = "",
  locale = "de",
}: ContactFormProps) {
  const t = formCopy[locale];
  const titles = serviceLabels[locale];
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
  const selectedService = serviceSlugs.some((slug) => slug === initialService)
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
      setMessage(t.invalid);
      focusFirstError(errors);
      return;
    }
    setFieldErrors({});
    if (!enabled) {
      setState("checked");
      setMessage(t.checked);
      return;
    }

    setSending(true);
    setState("sending");
    setMessage(t.sending);
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
        setMessage(t.sent);
        formRef.current?.reset();
      } else {
        setState(response.status === 503 ? "unavailable" : "failed");
        setMessage(
          response.status === 429
            ? t.limited
            : response.status === 503
              ? t.unavailable
              : t.failed,
        );
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
          focusFirstError(result.fieldErrors);
        }
      }
    } catch {
      setState("failed");
      setMessage(t.failed);
    } finally {
      setSending(false);
    }
  }

  function errorFor(name: keyof ContactFieldErrors) {
    const errors = fieldErrors[name];
    return errors?.length ? (
      <p id={`${name}-error`} className="field-error">
        {locale === "de" ? errors[0] : t.errors[name]}
      </p>
    ) : null;
  }

  return (
    <form
      ref={formRef}
      className="contact-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label={t.label}
      aria-describedby="contact-mode"
      aria-busy={sending}
    >
      <div className="contact-form-heading">
        <p className="eyebrow">{t.eye}</p>
        <h2>{t.title}</h2>
        <p>{t.intro}</p>
      </div>
      {!enabled && (
        <div id="contact-mode" className="form-notice">
          <strong className="flex items-center gap-2">
            <ShieldCheck size={18} aria-hidden="true" />
            {t.demo}
          </strong>
          <p>{t.demoText}</p>
        </div>
      )}
      {enabled && <p id="contact-mode">{t.required}</p>}
      {!enabled && <p className="form-help">{t.required}</p>}
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="contact-name">{t.name} *</label>
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
          <label htmlFor="contact-email">{t.email} *</label>
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
          <label htmlFor="contact-phone">{t.phone}</label>
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
          <label htmlFor="contact-service">{t.service} *</label>
          <select
            id="contact-service"
            name="service"
            required
            defaultValue={selectedService}
            disabled={sending}
            aria-invalid={Boolean(fieldErrors.service)}
            aria-describedby={fieldErrors.service ? "service-error" : undefined}
          >
            <option value="">{t.select}</option>
            {serviceSlugs.map((slug) => (
              <option key={slug} value={slug}>
                {titles[slug]}
              </option>
            ))}
          </select>
          {errorFor("service")}
        </div>
        <div className="form-field form-field-full">
          <label htmlFor="contact-message">{t.message} *</label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            required
            minLength={20}
            maxLength={3000}
            disabled={sending}
            placeholder={t.placeholder}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={
              fieldErrors.message
                ? "message-help message-error"
                : "message-help"
            }
          />
          <p id="message-help" className="form-help">
            {t.help}
          </p>
          {errorFor("message")}
        </div>
      </div>
      <div hidden aria-hidden="true">
        <label htmlFor="contact-website">{t.honeypot}</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
        />
      </div>
      <p className="form-help">
        {enabled ? t.remote : t.local} {t.privacy}{" "}
        <Link href={pagePath("privacy", locale)}>{t.privacyLink}</Link>.
      </p>
      <button
        className="button button-primary"
        type="submit"
        disabled={!hydrated || sending}
      >
        {sending && (
          <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />
        )}
        {sending ? t.sending : enabled ? t.send : t.check}
        {!sending && <ArrowUpRight size={18} aria-hidden="true" />}
      </button>
      {!enabled && <p className="form-help">{t.unavailable}</p>}
      <noscript>
        <p>{t.nojs}</p>
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
