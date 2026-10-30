"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { MessageSquareText } from "lucide-react";
import type { Locale } from "@/i18n/routing";

// Load the conversation and its local knowledge only on the first opening.
const ChatPanel = dynamic(() => import("./ChatPanel"), { ssr: false });
const labels: Record<Locale, string> = {
  de: "Chat mit dem Thermobau-Assistenten öffnen",
  en: "Open the Thermobau assistant chat",
  fr: "Ouvrir le chat de l’assistant Thermobau",
};

export function ChatWidget({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const launcher = useRef<HTMLButtonElement>(null);

  function close() {
    setOpen(false);
    window.requestAnimationFrame(() =>
      launcher.current?.focus({ preventScroll: true }),
    );
  }

  return (
    <>
      <button
        ref={launcher}
        type="button"
        className="chat-launcher"
        data-testid="chat-launcher"
        aria-label={labels[locale]}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={loaded ? "thermobau-chat" : undefined}
        onClick={() => {
          setLoaded(true);
          setOpen(true);
        }}
      >
        <MessageSquareText size={23} aria-hidden="true" />
        <span aria-hidden="true">Chat</span>
      </button>
      {loaded && <ChatPanel locale={locale} open={open} onClose={close} />}
    </>
  );
}
