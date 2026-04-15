// DE translations
export const translations = {
"modal.title": "Erzählen Sie uns von diesen Themen",
"modal.subtitle":
  "Wir verstehen jede Sprache, füllen alles aus und übersetzen bei Bedarf",

"button.startSpeaking": "Sprechen beginnen",
"button.stopSpeaking": "Aufnahme stoppen",
"button.tryAgain": "Erneut versuchen",

"listening.title": "Zuhören...",
"listening.subtitle":
  "Sprechen Sie natürlich über das, was Sie ausfüllen möchten",
"processing.title": "Verarbeitung...",

// Dynamic progress stages for processing (voice->text->LLM)
"processing.stage1": "Sprache in Text umwandeln...",
"processing.stage2": "Sprache erkennen...",
"processing.stage3": "Ihre Anfrage verstehen...",
"processing.stage4": "Daten extrahieren...",
"processing.stage5": "Mit Formularfeldern abgleichen...",
"processing.stage6": "Daten validieren...",
"processing.stage7": "Ergebnisse vorbereiten...",
"processing.stage8": "Fast fertig!",

// Stepper steps (4 steps mapped from 8 backend stages)
"processing.step1": "Sprache in Text umwandeln",
"processing.step2": "Ihre Anfrage verstehen",
"processing.step3": "Mit Formularfeldern abgleichen",
"processing.step4": "Ergebnisse vorbereiten",

"success.title": "Formular ausgefüllt!",
"success.subtitle":
  "Überprüfen Sie die ausgefüllten Felder und senden Sie, wenn Sie bereit sind",
"success.apply_changes": "Ausfüllen und überprüfen",
"success.empty_fields": "Nicht ausgefüllt",
"success.check_fields": "Überprüfen",
"success.filled_fields": "Ausgefüllt",
"success.field_single": "Feld",
"success.fields_multiple": "Felder",
"success.require_attention": "benötigen Aufmerksamkeit",
"success.successfully_filled": "erfolgreich ausgefüllt",

"empty.title": "Keine ausfüllbaren Felder gefunden",
"empty.subtitle": "Dieses Formular hat keine Felder, die per Sprache ausgefüllt werden können",

"error.title": "Fehler",
"error.microphone": "Mikrofonzugriff erforderlich",
"error.noFields": "Keine Formulare auf dieser Seite gefunden",
"error.noActiveForm": "Kein aktives Formular zum Ausfüllen gefunden",
"error.lowConfidence":
  "Audio konnte nicht klar verstanden werden. Bitte sprechen Sie deutlicher.",
"error.general": "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
"error.domainNotAllowed":
  "Diese Domain ist nicht berechtigt, den Service zu nutzen. Bitte wenden Sie sich an den Website-Administrator.",
"error.serviceUnavailable":
  "Service vorübergehend nicht verfügbar. Bitte versuchen Sie es später erneut oder wenden Sie sich an den Website-Administrator.",
"error.invalidApiKey": "Der Dienst ist nicht korrekt konfiguriert. Bitte wenden Sie sich an den Website-Administrator.",
"error.rateLimited": "Der Dienst ist gerade ausgelastet. Bitte versuchen Sie es in einem Moment erneut.",
"error.quotaExhausted": "Das Nutzungslimit für diesen Dienst wurde erreicht. Bitte wenden Sie sich an den Website-Administrator.",
"error.no_fields_detected":
  "Die Informationen zum Ausfüllen des Formulars konnten nicht erkannt werden. Bitte versuchen Sie, genauer anzugeben, welche Daten in die Felder eingegeben werden sollen.",
"error.no_data_title": "Daten nicht erkannt",
"error.mic_title": "Mikrofon erforderlich",
"error.network_title": "Verbindungsproblem",
"error.showDetails": "Technische Details anzeigen",

"loader.initial": "Formular wird vorbereitet...",

// Dynamic progress stages for initAnalyze loading
"loader.stage1": "Analysiere Formularfelder...",
"loader.stage2": "Sprache erkennen...",
"loader.stage3": "Identifiziere sensible Felder...",
"loader.stage4": "Bereite Vorschläge vor...",
"loader.stage5": "Fast fertig!",

"floatingButton.fillByVoice": "Per Sprache ausfüllen",

"form.progress.filled": "{count} ausgefüllt",
"form.progress.scrollToSelect": "Scrollen zur Auswahl",
"form.formNumber": "{current} von {total}",
"form.allForms": "Alle {count} Formulare",
"form.label": "Formular",
"form.fields": "Felder",
"button.close": "Schließen",
// Consent modal
"consent.title": "Ihr Datenschutz",
"consent.subtitle":
  "Bitte lesen Sie die Informationen zum Schutz Ihrer Daten sorgfältig",
"consent.warning_title": "Wichtig: Keine sensiblen Daten teilen",
"consent.warning":
  "Bitte nennen Sie keine Passwörter, Zahlungsdetails, behördliche Kennungen oder medizinische Informationen. Diese Daten sind nicht zur Verarbeitung durch die Sprachfunktion vorgesehen.",
"consent.summary_card1_title": "Was Wir Sammeln",
"consent.summary_data1": "Sprachaufnahme → in Text umgewandelt",
"consent.summary_data2":
  "Feldnamen/Typen/Platzhalter (ohne Werte; sensible Felder ausgeschlossen)",
"consent.summary_data3": "Technische Protokolle (IP, Browser-Info)",
"consent.summary_card2_title": "Wohin Es Geht",
"consent.summary_transfer":
  "OpenAI (USA) für KI-Verarbeitung • Google Cloud/Firebase (EU, Polen) für Hosting und Sicherheit",
"consent.summary_card3_title": "Ihre Rechte",
"consent.summary_rights":
  "Einwilligung jederzeit widerrufen • Zugang oder Löschung Ihrer Daten anfordern • Vollständige Details in der <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Datenschutzerklärung</a>",
"consent.full_details_title": "Vollständige Details Lesen",
"consent.section1_title": "Welche Daten verarbeiten wir?",
"consent.data1":
  "Sprachaufnahme. Audiodatei wird über unseren Server an OpenAI Whisper zur Transkription gesendet. Die Datei wird nach der Verarbeitung nicht auf dem Server gespeichert.",
"consent.data2":
  "Sprachtranskription (Text). An OpenAI GPT zum Ausfüllen von Formularen gesendet. Standardmäßig speichern wir die Transkription nicht in unseren Systemen; in technischen Protokollen speichern wir nur Metadaten (Textlänge, Sprache, Dauer). Wichtig: OpenAI kann Anfragedaten bis zu 30 Tage speichern, um Missbrauch zu verhindern; vorzeitige Löschung bei OpenAI ist nicht verfügbar; Daten werden nicht zum Modelltraining verwendet.",
"consent.data3":
  "Formularfeld-Metadaten. Namen/Typen/Platzhalter (sensible Felder ausgeschlossen).",
"consent.data4":
  "Seiten-URL. Von unserer Infrastruktur verarbeitet (für Kompatibilität/Diagnose), NICHT an OpenAI gesendet. Bitte vermeiden Sie personenbezogene Daten in URL-Abfrageparametern.",
"consent.data5":
  "Browser-User-Agent. Lokal und von unserer Infrastruktur verwendet (Kompatibilität/Sicherheit), NICHT an OpenAI gesendet.",
"consent.data6":
  "IP-Adresse. Von Google Cloud/Firebase-Infrastruktur für Sicherheit protokolliert (bis zu 30 Tage), NICHT an OpenAI gesendet.",
"consent.section2_title":
  "Wohin und auf welcher Rechtsgrundlage werden Daten übertragen?",
"consent.recipients":
  "Empfänger. OpenAI (USA) — Audio-/Textverarbeitung; Google Cloud/Firebase (EU/Polen) — Hosting und Sicherheitsprotokolle. Daten werden nicht zum Modelltraining verwendet.",
"consent.transfer1":
  "OpenAI (USA). Anfragen an OpenAI (einschließlich Audio/Text) können von OpenAI bis zu 30 Tage gespeichert werden, um Missbrauch zu verhindern; Daten werden nicht zum Modelltraining verwendet. Übermittlung in die USA — basierend auf von der Europäischen Kommission genehmigten SCC.",
"consent.basis_title": "Rechtsgrundlagen:",
"consent.basis1":
  "Sprachfunktion — Ihre Einwilligung (Art. 6(1)(a) DSGVO).",
"consent.basis2":
  "Technische Protokolle (IP/UA/URL) — berechtigte Interessen (Art. 6(1)(f)) — Sicherheit und Debugging.",
"consent.section3_title": "Ihre Rechte",
"consent.rights1":
  "Sie können die Einwilligung in den Widget-Einstellungen jederzeit widerrufen; dies berührt nicht die Rechtmäßigkeit der Verarbeitung vor dem Widerruf.",
"consent.rights2":
  "Zusätzlich zum Widerruf der Einwilligung haben Sie das Recht, Zugang oder Löschung Ihrer in unseren Systemen gespeicherten Daten (technische Protokolle, Kostenmetriken) über den Website-Eigentümer anzufordern. Vollständige Details in der <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Datenschutzerklärung</a>.",
"consent.rights3":
  "Diese Funktion ist für Benutzer ab 16 Jahren vorgesehen; für jüngere Benutzer ist die Zustimmung der Eltern/Erziehungsberechtigten erforderlich.",
"consent.footer_legal_title": "Rechtliche Informationen",
"consent.footer_controller":
  "Verantwortlicher: der Eigentümer dieser Website.",
"consent.footer_processor":
  "TypelessForm: handelt als Auftragsverarbeiter.",
"consent.footer_contact": "Datenschutzkontakt: info@webappski.com.",
"consent.footer_sccs":
  "Die Übermittlung in die USA erfolgt auf Grundlage von SCC. Details finden Sie in unserer <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Datenschutzerklärung</a>.",
"consent.accept": "Ich akzeptiere",

// Consent checkboxes
"consent.checkbox_main": "Ich stimme der Verarbeitung meiner Sprach- und Formularmetadaten durch TypelessForm und der internationalen Übermittlung in die USA (OpenAI) gemäß SCCs zu, wie in der <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Datenschutzerklärung</a> beschrieben.",
"consent.checkbox_age": "Ich bestätige, dass ich 16+ Jahre alt bin oder die Zustimmung meiner Eltern/Erziehungsberechtigten habe.",

// Privacy settings / data deletion
"privacy.title": "Datenschutz & Daten",
"privacy.subtitle": "Einwilligung und Daten verwalten",
"privacy.info_title": "Ihre Einwilligungsaufzeichnung",
"privacy.user_id": "Kennung",
"privacy.consent_date": "Einwilligung erteilt",
"privacy.policy_version": "Richtlinienversion",
"privacy.usage_count": "Nutzungsanzahl",
"privacy.no_data": "Keine Einwilligungsdaten auf diesem Gerät gefunden.",
"privacy.delete_title": "Meine Daten löschen",
"privacy.delete_description": "Dies löscht dauerhaft alle Ihre Einwilligungsaufzeichnungen von unseren Servern und lokale Daten. Diese Aktion kann nicht rückgängig gemacht werden.",
"privacy.delete_confirm": "Ich verstehe, dass dies dauerhaft ist",
"privacy.delete_button": "Meine Daten löschen",
"privacy.deleting": "Wird gelöscht...",
"privacy.delete_success": "Alle Ihre Daten wurden erfolgreich gelöscht.",
"privacy.delete_error": "Daten konnten nicht gelöscht werden. Bitte versuchen Sie es erneut oder kontaktieren Sie info@webappski.com.",
"privacy.done": "Fertig",
"privacy.link": "Datenschutz"
};
