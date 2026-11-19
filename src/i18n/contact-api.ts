import type { Locale } from "./routing";

// API responses also stay translated when called outside the React form.
export const apiCopy = {
  de: {
    json: "Bitte übermitteln Sie die Anfrage als JSON.",
    invalid: "Bitte prüfen Sie die markierten Eingaben.",
    blocked: "Die Anfrage konnte nicht verarbeitet werden.",
    unavailable:
      "Der Versand ist derzeit nicht verfügbar. Ihre Nachricht wurde nicht gesendet.",
    limited: "Zu viele Anfragen. Bitte versuchen Sie es später erneut.",
    accepted:
      "Vielen Dank. Ihre Nachricht wurde vom E-Mail-Dienst zur Übermittlung angenommen.",
    stored: "Vielen Dank. Ihre Anfrage wurde gespeichert und wird bearbeitet.",
    tooLarge: "Die Anfrage ist zu groß. Bitte kürzen Sie Ihre Eingaben.",
    unreadable:
      "Die Anfrage konnte nicht gelesen werden. Bitte prüfen Sie Ihre Eingaben.",
    failed:
      "Die Übermittlung konnte nicht bestätigt werden. Bitte versuchen Sie es später erneut.",
    unexpected:
      "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
  },
  en: {
    json: "Please submit the enquiry as JSON.",
    invalid: "Please check the highlighted fields.",
    blocked: "The enquiry could not be processed.",
    unavailable: "Sending is currently unavailable. Your message was not sent.",
    limited: "Too many requests. Please try again later.",
    accepted:
      "Thank you. Your message was accepted by the email server for delivery.",
    stored: "Thank you. Your enquiry has been recorded for processing.",
    tooLarge: "The enquiry is too large. Please shorten your entries.",
    unreadable: "The enquiry could not be read. Please check your entries.",
    failed: "Submission could not be confirmed. Please try again later.",
    unexpected: "An unexpected error occurred. Please try again later.",
  },
  fr: {
    json: "Transmettez la demande au format JSON.",
    invalid: "Vérifiez les champs signalés.",
    blocked: "La demande n’a pas pu être traitée.",
    unavailable:
      "L’envoi est actuellement indisponible. Votre message n’a pas été envoyé.",
    limited: "Trop de demandes. Réessayez ultérieurement.",
    accepted:
      "Merci. Votre message a été accepté par le serveur e-mail pour transmission.",
    stored: "Merci. Votre demande a été enregistrée pour traitement.",
    tooLarge: "La demande est trop volumineuse. Raccourcissez vos saisies.",
    unreadable: "La demande n’a pas pu être lue. Vérifiez vos saisies.",
    failed: "L’envoi n’a pas pu être confirmé. Réessayez ultérieurement.",
    unexpected:
      "Une erreur inattendue s’est produite. Réessayez ultérieurement.",
  },
} satisfies Record<Locale, Record<string, string>>;
