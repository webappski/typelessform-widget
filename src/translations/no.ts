// NO translations
export const translations = {
"modal.title": "Fortell oss om disse emnene",
"modal.subtitle":
  "Vi forstår alle språk, fyller ut alt og oversetter om nødvendig",

"loader.initial": "Forbereder skjema...",

// Dynamic progress stages for initAnalyze loading
"loader.stage1": "Analyserer skjemafelt...",
"loader.stage2": "Oppdager språk...",
"loader.stage3": "Identifiserer sensitive felt...",
"loader.stage4": "Forbereder forslag...",
"loader.stage5": "Nesten klar!",

"button.startSpeaking": "Begynn å snakke",
"button.stopSpeaking": "Stopp opptak",
"button.tryAgain": "Prøv igjen",

"listening.title": "Lytter...",
"listening.subtitle": "Snakk naturlig om det du vil fylle ut",
"processing.title": "Behandler...",

// Dynamic progress stages for processing (voice->text->LLM)
"processing.stage1": "Konverterer tale til tekst...",
"processing.stage2": "Oppdager språk...",
"processing.stage3": "Forstår din forespørsel...",
"processing.stage4": "Trekker ut data...",
"processing.stage5": "Matcher med skjemafelt...",
"processing.stage6": "Validerer data...",
"processing.stage7": "Forbereder resultater...",
"processing.stage8": "Nesten klar!",

"success.title": "Skjema fylt ut!",
"success.subtitle":
  "Gå gjennom de utfylte feltene og send inn når du er klar",
"success.apply_changes": "Fyll ut og gjennomgå",
"success.empty_fields": "Ikke utfylt",
"success.check_fields": "Sjekk",
"success.filled_fields": "Fullført",
"success.field_single": "felt",
"success.fields_multiple": "felt",
"success.require_attention": "krever oppmerksomhet",
"success.successfully_filled": "vellykket utfylt",

"empty.title": "Ingen utfyllbare felt funnet",
"empty.subtitle": "Dette skjemaet har ingen felt som kan fylles ut med stemme",

"error.title": "Feil",
"error.microphone": "Mikrofontilgang kreves",
"error.noFields": "Ingen skjemaer funnet på denne siden",
"error.noActiveForm": "Ingen aktive skjemaer funnet for utfylling",
"error.lowConfidence":
  "Kunne ikke forstå lyden tydelig. Vennligst snakk tydeligere.",
"error.general": "Noe gikk galt. Vennligst prøv igjen.",
"error.domainNotAllowed":
  "Dette domenet er ikke autorisert til å bruke tjenesten. Vennligst kontakt nettstedets administrator.",
"error.invalidApiKey": "Tjenesten er ikke riktig konfigurert. Kontakt nettstedets administrator.",
"error.rateLimited": "Tjenesten er opptatt akkurat nå. Prøv igjen om et øyeblikk.",
"error.quotaExhausted": "Bruksgrensen for denne tjenesten er nådd. Kontakt nettstedets administrator.",
"error.no_fields_detected":
  "Kunne ikke gjenkjenne informasjon for å fylle ut skjemaet. Vennligst prøv å spesifisere tydeligere hvilke data som skal skrives inn i feltene.",
"error.no_data_title": "Data ikke gjenkjent",
"error.mic_title": "Mikrofon kreves",
"error.network_title": "Tilkoblingsproblem",
"error.showDetails": "Vis tekniske detaljer",

"floatingButton.fillByVoice": "Fyll ut med stemme",

"form.progress.filled": "{count} utfylt",
"form.progress.scrollToSelect": "Rull for å velge",
"form.formNumber": "{current} av {total}",
"form.allForms": "Alle {count} skjemaer",
"form.label": "Skjema",
"form.fields": "Felt",
"button.close": "Lukk",
// Consent modal
"consent.title": "Din Datapersonvern",
"consent.subtitle":
  "Vennligst les informasjonen om databeskyttelsen din nøye",
"consent.warning_title": "Viktig: Ikke Del Sensitive Data",
"consent.warning":
  "Vennligst ikke nevn passord, betalingsdetaljer, myndighetidentifikatorer eller medisinsk informasjon. Disse dataene er ikke ment for behandling av stemmefunksjonen.",
"consent.summary_card1_title": "Hva Vi Samler Inn",
"consent.summary_data1": "Stemmeoppptak → konvertert til tekst",
"consent.summary_data2":
  "Feltnavn/typer/plassholdere (uten verdier; sensitive felt ekskludert)",
"consent.summary_data3": "Tekniske logger (IP, nettleserinfo)",
"consent.summary_card2_title": "Hvor Det Går",
"consent.summary_transfer":
  "OpenAI (USA) for AI-behandling • Google Cloud/Firebase (EU, Polen) for hosting og sikkerhet",
"consent.summary_card3_title": "Dine Rettigheter",
"consent.summary_rights":
  "Trekk tilbake samtykke når som helst • Be om tilgang eller sletting av dataene dine • Fullstendige detaljer i <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Personvernregler</a>",
"consent.full_details_title": "Les Fullstendige Detaljer",
"consent.section1_title": "Hvilke data behandler vi?",
"consent.data1":
  "Stemmeoppptak. Lydfil sendt til OpenAI Whisper via vår server for transkripsjon. Filen lagres ikke på serveren etter behandling.",
"consent.data2":
  "Stemmetranskripsjon (tekst). Sendt til OpenAI GPT for utfylling av skjema. Som standard lagrer vi ikke transkripsjonen i våre systemer; i tekniske logger lagrer vi kun metadata (tekstlengde, språk, varighet). Viktig: OpenAI kan lagre forespørselsdata i opptil 30 dager for å forhindre misbruk; tidlig sletting hos OpenAI er ikke tilgjengelig; data brukes ikke til modelltrening.",
"consent.data3":
  "Skjemafeltmetadata. Navn/typer/plassholdere (sensitive felt ekskludert).",
"consent.data4":
  "Side-URL. Behandlet av vår infrastruktur (for kompatibilitet/diagnostikk), IKKE sendt til OpenAI. Vennligst unngå personlige data i URL-spørringsparametere.",
"consent.data5":
  "Nettleser User-Agent. Brukt lokalt og av vår infrastruktur (kompatibilitet/sikkerhet), IKKE sendt til OpenAI.",
"consent.data6":
  "IP-adresse. Logget av Google Cloud/Firebase-infrastruktur for sikkerhet (opptil 30 dager), IKKE sendt til OpenAI.",
"consent.section2_title":
  "Hvor og på hvilket rettslig grunnlag overføres data?",
"consent.recipients":
  "Mottakere. OpenAI (USA) — lyd-/tekstbehandling; Google Cloud/Firebase (EU/Polen) — hosting og sikkerhetlogger. Data brukes ikke til modelltrening.",
"consent.transfer1":
  "OpenAI (USA). Forespørsler til OpenAI (inkludert lyd/tekst) kan lagres av OpenAI i opptil 30 dager for å forhindre misbruk; data brukes ikke til modelltrening. Overføring til USA — basert på SCC godkjent av EU-kommisjonen.",
"consent.basis_title": "Rettslig grunnlag:",
"consent.basis1": "Stemmefunksjon — ditt samtykke (Art. 6(1)(a) GDPR).",
"consent.basis2":
  "Tekniske logger (IP/UA/URL) — legitime interesser (Art. 6(1)(f)) — sikkerhet og feilsøking.",
"consent.section3_title": "Dine rettigheter",
"consent.rights1":
  "Du kan trekke tilbake samtykke i widgetinnstillinger når som helst; dette påvirker ikke lovligheten av behandling før tilbaketrekning.",
"consent.rights2":
  "I tillegg til å trekke tilbake samtykke har du rett til å be om tilgang eller sletting av dataene dine lagret i våre systemer (tekniske logger, kostnadsmålinger) via nettstedeieren. Fullstendige detaljer i <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Personvernregler</a>.",
"consent.rights3":
  "Denne funksjonen er ment for brukere 16+; for yngre brukere kreves foreldres/verges samtykke.",
"consent.footer_legal_title": "Juridisk Informasjon",
"consent.footer_controller": "Dataansvarlig: eieren av denne nettsiden.",
"consent.footer_processor": "TypelessForm: fungerer som databehandler.",
"consent.footer_contact": "Personvernkontakt: info@webappski.com.",
"consent.footer_sccs":
  "Overføring til USA utføres under SCC. Detaljer er tilgjengelige i våre <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Personvernregler</a>.",
"consent.accept": "Jeg Godtar",

// Consent checkboxes
"consent.checkbox_main": "Jeg samtykker til behandling av mine stemme- og skjemametadata av TypelessForm og til internasjonal overføring til USA (OpenAI) i henhold til SCC-er, som beskrevet i <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>personvernreglene</a>.",
"consent.checkbox_age": "Jeg bekrefter at jeg er 16+ år eller har samtykke fra foreldre/verge.",

// Privacy settings / data deletion
"privacy.title": "Personvern & Data",
"privacy.subtitle": "Administrer samtykke og data",
"privacy.info_title": "Din samtykkeregistrering",
"privacy.user_id": "Identifikator",
"privacy.consent_date": "Samtykke gitt",
"privacy.policy_version": "Policyversjon",
"privacy.usage_count": "Antall bruk",
"privacy.no_data": "Ingen samtykkeopplysninger funnet på denne enheten.",
"privacy.delete_title": "Slett mine data",
"privacy.delete_description": "Dette vil permanent slette alle dine samtykkeregistreringer fra våre servere og tømme lokale data. Denne handlingen kan ikke angres.",
"privacy.delete_confirm": "Jeg forstår at dette er permanent",
"privacy.delete_button": "Slett mine data",
"privacy.deleting": "Sletter...",
"privacy.delete_success": "Alle dine data er slettet.",
"privacy.delete_error": "Kunne ikke slette data. Prøv igjen eller kontakt info@webappski.com.",
"privacy.done": "Ferdig",
"privacy.link": "Personvern"
};
