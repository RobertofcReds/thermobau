"use client";

import Link from "next/link";
import { Send, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/routing";
import { answerQuestion, type ChatReply } from "@/lib/chat-assistant";

const copy = {
  de: {
    subtitle: "Website-Assistent",
    disclosure:
      "Automatische Antworten aus den Angaben dieser Website. Kein Live-Chat.",
    welcome:
      "Hallo! Wie kann ich Ihnen helfen? Fragen Sie mich zu unseren Leistungen, zur Vorbereitung Ihres Projekts oder zum Kontakt mit Thermobau V&V.",
    close: "Chat schließen",
    conversation: "Gespräch mit dem Website-Assistenten",
    assistant: "Thermobau-Assistent",
    user: "Sie",
    suggestions: "Häufige Fragen",
    question: "Ihre Frage",
    placeholder: "Zum Beispiel: Welche Leistungen bieten Sie an?",
    send: "Senden",
    clear: "Gespräch löschen",
    keyboard:
      "Enter sendet die Frage. Umschalt + Enter fügt eine neue Zeile ein.",
    privacy:
      "Nachrichten bleiben in diesem Tab und werden nicht versendet. Neu laden löscht das Gespräch.",
    prompts: [
      { label: "Leistungen", question: "Welche Leistungen bieten Sie an?" },
      { label: "Angebot", question: "Wie frage ich ein Angebot an?" },
      { label: "Kontakt", question: "Wie kann ich Sie kontaktieren?" },
    ],
  },
  en: {
    subtitle: "Website assistant",
    disclosure:
      "Automatic answers from this website’s information. Not a live chat.",
    welcome:
      "Hello! How can I help? Ask me about our services, preparing your project or contacting Thermobau V&V.",
    close: "Close chat",
    conversation: "Conversation with the website assistant",
    assistant: "Thermobau assistant",
    user: "You",
    suggestions: "Common questions",
    question: "Your question",
    placeholder: "For example: What services do you offer?",
    send: "Send",
    clear: "Clear conversation",
    keyboard: "Enter sends the question. Shift + Enter inserts a new line.",
    privacy:
      "Messages stay in this tab and are not sent. Reloading clears the conversation.",
    prompts: [
      { label: "Services", question: "What services do you offer?" },
      { label: "Quote", question: "How can I request a quote?" },
      { label: "Contact", question: "How can I contact Thermobau?" },
    ],
  },
  fr: {
    subtitle: "Assistant du site",
    disclosure:
      "Réponses automatiques à partir des informations du site. Pas de conseiller en direct.",
    welcome:
      "Bonjour ! Comment puis-je vous aider ? Posez une question sur nos prestations, la préparation de votre projet ou les contacts de Thermobau V&V.",
    close: "Fermer la discussion",
    conversation: "Discussion avec l’assistant du site",
    assistant: "Assistant Thermobau",
    user: "Vous",
    suggestions: "Questions fréquentes",
    question: "Votre question",
    placeholder: "Par exemple : quelles prestations proposez-vous ?",
    send: "Envoyer",
    clear: "Effacer la discussion",
    keyboard:
      "Entrée envoie la question. Maj + Entrée ajoute un saut de ligne.",
    privacy:
      "Les messages restent dans cet onglet et ne sont pas envoyés. Actualiser efface la discussion.",
    prompts: [
      { label: "Prestations", question: "Quelles prestations proposez-vous ?" },
      { label: "Devis", question: "Comment demander un devis ?" },
      { label: "Contact", question: "Comment contacter Thermobau ?" },
    ],
  },
};

type ChatMessage = Pick<ChatReply, "locale" | "text" | "links"> & {
  id: number;
  role: "user" | "assistant";
};

function welcome(locale: Locale): ChatMessage {
  return {
    id: 0,
    role: "assistant",
    locale,
    text: copy[locale].welcome,
    links: [],
  };
}

export default function ChatPanel({
  locale,
  open,
  onClose,
}: {
  locale: Locale;
  open: boolean;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const messageList = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const previousTopic = useRef<{ pageLocale: Locale; topic: string } | null>(
    null,
  );
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    welcome(locale),
  ]);
  const [language, setLanguage] = useState({
    pageLocale: locale,
    replyLocale: locale,
  });
  // A page-language change supplies the new fallback, while an ongoing
  // conversation follows the language detected in the latest question.
  const activeLocale =
    language.pageLocale === locale ? language.replyLocale : locale;
  const t = copy[activeLocale];

  useEffect(() => {
    const panel = dialog.current;
    if (!panel) return;
    if (!open) {
      if (panel.open) panel.close();
      return;
    }
    if (!panel.open) panel.showModal();
    input.current?.focus({ preventScroll: true });
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      if (panel.open) panel.close();
    };
  }, [open]);

  useEffect(() => {
    if (open && messageList.current) {
      messageList.current.scrollTop = messageList.current.scrollHeight;
    }
  }, [messages, open]);

  function closePanel() {
    dialog.current?.close();
    onClose();
  }

  function sendMessage(question: string) {
    const text = question.trim().slice(0, 1000);
    if (!text) return;
    const topic =
      previousTopic.current?.pageLocale === locale
        ? previousTopic.current.topic
        : undefined;
    const reply = answerQuestion(text, activeLocale, topic);
    const userMessage: ChatMessage = {
      id: ++nextId.current,
      role: "user",
      locale: reply.locale,
      text,
      links: [],
    };
    const assistantMessage: ChatMessage = {
      id: ++nextId.current,
      role: "assistant",
      locale: reply.locale,
      text: reply.text,
      links: reply.links,
    };
    setMessages((current) => [...current, userMessage, assistantMessage]);
    setLanguage({ pageLocale: locale, replyLocale: reply.locale });
    previousTopic.current = { pageLocale: locale, topic: reply.topic };
    setDraft("");
    input.current?.focus({ preventScroll: true });
  }

  function clearConversation() {
    setMessages([welcome(activeLocale)]);
    previousTopic.current = null;
    setDraft("");
    input.current?.focus({ preventScroll: true });
  }

  return (
    <dialog
      ref={dialog}
      id="thermobau-chat"
      className="chat-dialog"
      data-testid="chat-dialog"
      lang={activeLocale}
      aria-labelledby="chat-title"
      aria-describedby="chat-disclosure"
      onCancel={(event) => {
        event.preventDefault();
        closePanel();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Tab" || !open || !event.currentTarget.open) return;
        const panel = event.currentTarget;
        const focusable = Array.from(
          panel.querySelectorAll<HTMLElement>(
            "a[href], button, input, select, textarea, [tabindex]",
          ),
        ).filter(
          (element) =>
            element.tabIndex >= 0 &&
            !element.matches(":disabled") &&
            !element.closest("[inert]") &&
            element.getClientRects().length > 0 &&
            getComputedStyle(element).visibility === "visible",
        );
        const first = focusable[0];
        const last = focusable.at(-1);
        if (!first || !last) {
          event.preventDefault();
          panel.focus();
          return;
        }
        const active = document.activeElement;
        // Native dialogs isolate the page, but Chrome can otherwise move from
        // the last control to its browser chrome. Keep this conversation's
        // keyboard loop explicit, including the reverse direction.
        if (event.shiftKey && (active === first || active === panel)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (active === last || active === panel)) {
          event.preventDefault();
          first.focus();
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) closePanel();
      }}
    >
      <div className="chat-shell">
        <header className="chat-heading">
          <div>
            <h2 id="chat-title">Thermobau V&amp;V</h2>
            <p>{t.subtitle}</p>
          </div>
          <button
            type="button"
            className="chat-icon-button"
            data-testid="chat-close"
            aria-label={t.close}
            title={t.close}
            onClick={closePanel}
          >
            <X size={22} aria-hidden="true" />
          </button>
        </header>
        <p id="chat-disclosure" className="chat-disclosure">
          {t.disclosure}
        </p>
        <div
          ref={messageList}
          className="chat-messages"
          role="log"
          aria-label={t.conversation}
          aria-live="polite"
          aria-relevant="additions"
          tabIndex={0}
        >
          {messages.map((message) => (
            <article
              key={message.id}
              className={`chat-message chat-message-${message.role}`}
              lang={message.locale}
              data-testid={
                message.role === "assistant" ? "chat-answer" : undefined
              }
            >
              <p className="chat-author">
                {
                  copy[message.locale][
                    message.role === "assistant" ? "assistant" : "user"
                  ]
                }
              </p>
              <p className="chat-text">{message.text}</p>
              {message.links.length > 0 && (
                <ul className="chat-links">
                  {message.links.map((link) => (
                    <li key={link.href}>
                      {link.href.startsWith("/") &&
                      !link.href.startsWith("//") ? (
                        <Link
                          href={link.href}
                          prefetch={false}
                          onClick={closePanel}
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a href={link.href}>{link.label}</a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
        <div
          className="chat-suggestions"
          role="group"
          aria-label={t.suggestions}
        >
          {t.prompts.map((prompt) => (
            <button
              key={prompt.label}
              type="button"
              onClick={() => sendMessage(prompt.question)}
            >
              {prompt.label}
            </button>
          ))}
        </div>
        <form
          className="chat-form"
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage(draft);
          }}
        >
          <div className="chat-form-label">
            <label htmlFor="chat-question">{t.question}</label>
            <span aria-hidden="true">{draft.length}/1000</span>
          </div>
          <div className="chat-compose">
            <textarea
              ref={input}
              id="chat-question"
              data-testid="chat-input"
              value={draft}
              rows={2}
              maxLength={1000}
              placeholder={t.placeholder}
              aria-describedby="chat-input-help"
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !event.shiftKey &&
                  !event.nativeEvent.isComposing &&
                  event.keyCode !== 229
                ) {
                  event.preventDefault();
                  sendMessage(draft);
                }
              }}
            />
            <button
              type="submit"
              data-testid="chat-send"
              disabled={!draft.trim()}
            >
              <Send size={18} aria-hidden="true" />
              <span>{t.send}</span>
            </button>
          </div>
          <span id="chat-input-help" className="sr-only">
            {t.keyboard}
          </span>
        </form>
        <div className="chat-bottom">
          <p>{t.privacy}</p>
          <button
            type="button"
            className="chat-icon-button"
            data-testid="chat-clear"
            aria-label={t.clear}
            title={t.clear}
            onClick={clearConversation}
          >
            <Trash2 size={19} aria-hidden="true" />
          </button>
        </div>
      </div>
    </dialog>
  );
}
