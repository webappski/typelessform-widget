// DA translations
export const translations = {
"modal.title": "Fortæl os om disse emner",
"modal.subtitle":
  "Vi forstår ethvert sprog, udfylder alt og oversætter om nødvendigt",

"loader.initial": "Forbereder formular...",

// Dynamic progress stages for initAnalyze loading
"loader.stage1": "Analyserer formularfelter...",
"loader.stage2": "Registrerer sprog...",
"loader.stage3": "Identificerer følsomme felter...",
"loader.stage4": "Forbereder forslag...",
"loader.stage5": "Næsten klar!",

"button.startSpeaking": "Begynd at tale",
"button.stopSpeaking": "Stop optagelse",
"button.tryAgain": "Prøv igen",

"listening.title": "Lytter...",
"listening.subtitle": "Tal naturligt om, hvad du vil udfylde",
"processing.title": "Behandler...",

// Dynamic progress stages for processing (voice->text->LLM)
"processing.stage1": "Konverterer tale til tekst...",
"processing.stage2": "Registrerer sprog...",
"processing.stage3": "Forstår din anmodning...",
"processing.stage4": "Udtrækker data...",
"processing.stage5": "Matcher med formularfelter...",
"processing.stage6": "Validerer data...",
"processing.stage7": "Forbereder resultater...",
"processing.stage8": "Næsten klar!",

"success.title": "Formular udfyldt!",
"success.subtitle":
  "Gennemse de udfyldte felter og indsend, når du er klar",
"success.apply_changes": "Udfyld og gennemse",
"success.empty_fields": "Ikke udfyldt",
"success.check_fields": "Kontroller",
"success.filled_fields": "Udfyldt",
"success.field_single": "felt",
"success.fields_multiple": "felter",
"success.require_attention": "kræver opmærksomhed",
"success.successfully_filled": "udfyldt med succes",

"empty.title": "Ingen udfyldbare felter fundet",
"empty.subtitle": "Denne formular har ingen felter, der kan udfyldes med stemme",

"error.title": "Fejl",
"error.microphone": "Mikrofontilladelse påkrævet",
"error.noFields": "Ingen formularer fundet på denne side",
"error.noActiveForm": "Ingen aktiv formular fundet til udfyldning",
"error.lowConfidence":
  "Kunne ikke forstå lyden tydeligt. Tal venligst tydeligere.",
"error.general": "Noget gik galt. Prøv igen.",
"error.domainNotAllowed":
  "Dette domæne er ikke autoriseret til at bruge tjenesten. Kontakt webstedets administrator.",
"error.invalidApiKey": "Tjenesten er ikke konfigureret korrekt. Kontakt venligst webstedets administrator.",
"error.rateLimited": "Tjenesten er travl lige nu. Prøv venligst igen om et øjeblik.",
"error.quotaExhausted": "Brugsgrænsen for denne tjeneste er nået. Kontakt venligst webstedets administrator.",
"error.no_fields_detected":
  "Kunne ikke genkende information til at udfylde formularen. Prøv at angive tydeligere hvilke data der skal indtastes i felterne.",
"error.no_data_title": "Data ikke genkendt",
"error.mic_title": "Mikrofon påkrævet",
"error.network_title": "Forbindelsesproblem",
"error.showDetails": "Vis tekniske detaljer",

"floatingButton.fillByVoice": "Udfyld med stemme",

"form.progress.filled": "{count} udfyldt",
"form.progress.scrollToSelect": "Rul for at vælge",
"form.formNumber": "{current} af {total}",
"form.allForms": "Alle {count} formularer",
"form.label": "Formular",
"form.fields": "Felter",
"button.close": "Luk",
// Consent modal
"consent.title": "Din Databeskyttelse",
"consent.subtitle":
  "Læs venligst informationen om beskyttelse af dine data omhyggeligt",
"consent.warning_title": "Vigtigt: Del Ikke Følsomme Data",
"consent.warning":
  "Nævn venligst ikke adgangskoder, betalingsoplysninger, myndighedsidentifikatorer eller medicinske oplysninger. Disse data er ikke beregnet til behandling af stemmefunktionen.",
"consent.summary_card1_title": "Hvad Vi Indsamler",
"consent.summary_data1": "Stemmeoptagelse → konverteret til tekst",
"consent.summary_data2":
  "Feltnavne/typer/pladsholdere (uden værdier; følsomme felter udelukket)",
"consent.summary_data3": "Tekniske logs (IP, browserinfo)",
"consent.summary_card2_title": "Hvor Det Går Hen",
"consent.summary_transfer":
  "OpenAI (USA) til AI-behandling • Google Cloud/Firebase (EU, Polen) til hosting og sikkerhed",
"consent.summary_card3_title": "Dine Rettigheder",
"consent.summary_rights":
  "Tilbagekald samtykke når som helst • Anmod om adgang eller sletning af dine data • Fuld information i <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Privatlivspolitik</a>",
"consent.full_details_title": "Læs Fulde Detaljer",
"consent.section1_title": "Hvilke data behandler vi?",
"consent.data1":
  "Stemmeoptagelse. Lydfil sendt til OpenAI Whisper via vores server til transskription. Filen gemmes ikke på serveren efter behandling.",
"consent.data2":
  "Stemmetransskription (tekst). Sendt til OpenAI GPT til formularudfyldning. Som standard gemmer vi ikke transskriptionen i vores systemer; i tekniske logs gemmer vi kun metadata (tekstlængde, sprog, varighed). Vigtigt: OpenAI kan gemme anmodningsdata i op til 30 dage for at forhindre misbrug; tidlig sletning hos OpenAI er ikke tilgængelig; data bruges ikke til modeltræning.",
"consent.data3":
  "Formularfeltmetadata. Navne/typer/pladsholdere (følsomme felter udelukket).",
"consent.data4":
  "Side-URL. Behandlet af vores infrastruktur (til kompatibilitet/diagnostik), IKKE sendt til OpenAI. Undgå venligst personlige data i URL-forespørgselsparametre.",
"consent.data5":
  "Browser User-Agent. Brugt lokalt og af vores infrastruktur (kompatibilitet/sikkerhed), IKKE sendt til OpenAI.",
"consent.data6":
  "IP-adresse. Logget af Google Cloud/Firebase-infrastruktur til sikkerhed (op til 30 dage), IKKE sendt til OpenAI.",
"consent.section2_title":
  "Hvortil og på hvilket retsgrundlag overføres data?",
"consent.recipients":
  "Modtagere. OpenAI (USA) — lyd-/tekstbehandling; Google Cloud/Firebase (EU/Polen) — hosting og sikkerhedslogs. Data bruges ikke til modeltræning.",
"consent.transfer1":
  "OpenAI (USA). Anmodninger til OpenAI (inklusive lyd/tekst) kan gemmes af OpenAI i op til 30 dage for at forhindre misbrug; data bruges ikke til modeltræning. Overførsel til USA — baseret på SCC godkendt af Europa-Kommissionen.",
"consent.basis_title": "Retsgrundlag:",
"consent.basis1": "Stemmefunktion — dit samtykke (Art. 6(1)(a) GDPR).",
"consent.basis2":
  "Tekniske logs (IP/UA/URL) — legitime interesser (Art. 6(1)(f)) — sikkerhed og fejlfinding.",
"consent.section3_title": "Dine rettigheder",
"consent.rights1":
  "Du kan tilbagekalde samtykke i widget-indstillinger når som helst; dette påvirker ikke lovligheden af behandling før tilbagekaldelse.",
"consent.rights2":
  "Ud over at tilbagekalde samtykke har du ret til at anmode om adgang eller sletning af dine data gemt i vores systemer (tekniske logs, omkostningsmålinger) via websideejeren. Fuld information i <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Privatlivspolitik</a>.",
"consent.rights3":
  "Denne funktion er beregnet til brugere 16+; for yngre brugere kræves forældres/værges samtykke.",
"consent.footer_legal_title": "Juridisk Information",
"consent.footer_controller": "Dataansvarlig: ejeren af denne webside.",
"consent.footer_processor": "TypelessForm: fungerer som databehandler.",
"consent.footer_contact": "Privatlivskontakt: info@webappski.com.",
"consent.footer_sccs":
  "Overførsel til USA udføres under SCC. Detaljer er tilgængelige i vores <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Privatlivspolitik</a>.",
"consent.accept": "Jeg Accepterer",

// Consent checkboxes
"consent.checkbox_main": "Jeg samtykker til behandling af mine stemme- og formularmetadata af TypelessForm og til international overførsel til USA (OpenAI) i henhold til SCC'er, som beskrevet i <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>privatlivspolitikken</a>.",
"consent.checkbox_age": "Jeg bekræfter, at jeg er 16+ år eller har forældres/værges samtykke.",

// Privacy settings / data deletion
"privacy.title": "Privatliv & Data",
"privacy.subtitle": "Administrer dit samtykke og dine data",
"privacy.info_title": "Din samtykkeregistrering",
"privacy.user_id": "Identifikator",
"privacy.consent_date": "Samtykke givet",
"privacy.policy_version": "Politikversion",
"privacy.usage_count": "Antal brug",
"privacy.no_data": "Ingen samtykkedata fundet på denne enhed.",
"privacy.delete_title": "Slet mine data",
"privacy.delete_description": "Dette vil permanent slette alle dine samtykkeregistreringer fra vores servere og rydde lokale data. Denne handling kan ikke fortrydes.",
"privacy.delete_confirm": "Jeg forstår, at dette er permanent",
"privacy.delete_button": "Slet mine data",
"privacy.deleting": "Sletter...",
"privacy.delete_success": "Alle dine data er blevet slettet.",
"privacy.delete_error": "Kunne ikke slette data. Prøv igen eller kontakt info@webappski.com.",
"privacy.done": "Færdig",
"privacy.link": "Privatliv"
};
