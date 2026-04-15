// SV translations
export const translations = {
"modal.title": "Berätta om dessa ämnen",
"modal.subtitle":
  "Vi förstår alla språk, fyller i allt och översätter vid behov",

"loader.initial": "Förbereder formulär...",

// Dynamic progress stages for initAnalyze loading
"loader.stage1": "Analyserar formulärfält...",
"loader.stage2": "Upptäcker språk...",
"loader.stage3": "Identifierar känsliga fält...",
"loader.stage4": "Förbereder förslag...",
"loader.stage5": "Nästan klar!",

"button.startSpeaking": "Börja tala",
"button.stopSpeaking": "Stoppa inspelning",
"button.tryAgain": "Försök igen",

"listening.title": "Lyssnar...",
"listening.subtitle": "Tala naturligt om vad du vill fylla i",
"processing.title": "Bearbetar...",

// Dynamic progress stages for processing (voice->text->LLM)
"processing.stage1": "Konverterar tal till text...",
"processing.stage2": "Upptäcker språk...",
"processing.stage3": "Förstår din förfrågan...",
"processing.stage4": "Extraherar data...",
"processing.stage5": "Matchar med formulärfält...",
"processing.stage6": "Validerar data...",
"processing.stage7": "Förbereder resultat...",
"processing.stage8": "Nästan klar!",

"success.title": "Formulär ifyllt!",
"success.subtitle": "Granska de ifyllda fälten och skicka när du är redo",
"success.apply_changes": "Fyll i och granska",
"success.empty_fields": "Ej ifyllt",
"success.check_fields": "Kontrollera",
"success.filled_fields": "Slutfört",
"success.field_single": "fält",
"success.fields_multiple": "fält",
"success.require_attention": "kräver uppmärksamhet",
"success.successfully_filled": "framgångsrikt ifyllt",

"empty.title": "Inga ifyllbara fält hittades",
"empty.subtitle": "Det här formuläret har inga fält som kan fyllas i med röst",

"error.title": "Fel",
"error.microphone": "Mikrofontillgång krävs",
"error.noFields": "Inga formulär hittades på den här sidan",
"error.noActiveForm": "Inget aktivt formulär hittades för ifyllning",
"error.lowConfidence":
  "Kunde inte förstå ljudet tydligt. Vänligen tala tydligare.",
"error.general": "Något gick fel. Försök igen.",
"error.domainNotAllowed":
  "Denna domän är inte auktoriserad att använda tjänsten. Kontakta webbplatsens administratör.",
"error.invalidApiKey": "Tjänsten är inte korrekt konfigurerad. Kontakta webbplatsens administratör.",
"error.rateLimited": "Tjänsten är upptagen just nu. Försök igen om en stund.",
"error.quotaExhausted": "Användningsgränsen för denna tjänst har nåtts. Kontakta webbplatsens administratör.",
"error.no_fields_detected":
  "Kunde inte känna igen information för att fylla i formuläret. Försök att tydligare ange vilka data som ska matas in i fälten.",
"error.no_data_title": "Data kändes inte igen",
"error.mic_title": "Mikrofon krävs",
"error.network_title": "Anslutningsproblem",
"error.showDetails": "Visa tekniska detaljer",

"floatingButton.fillByVoice": "Fyll med röst",

"form.progress.filled": "{count} ifylld",
"form.progress.scrollToSelect": "Scrolla för att välja",
"form.formNumber": "{current} av {total}",
"form.allForms": "Alla {count} formulär",
"form.label": "Formulär",
"form.fields": "Fält",
"button.close": "Stäng",
// Consent modal
"consent.title": "Din Datasekretess",
"consent.subtitle":
  "Läs noggrant informationen om skyddet av dina uppgifter",
"consent.warning_title": "Viktigt: Dela Inte Känsliga Uppgifter",
"consent.warning":
  "Vänligen nämn inte lösenord, betalningsuppgifter, myndighetsidentifierare eller medicinsk information. Dessa uppgifter är inte avsedda för behandling av röstfunktionen.",
"consent.summary_card1_title": "Vad Vi Samlar In",
"consent.summary_data1": "Röstinspelning → konverterad till text",
"consent.summary_data2":
  "Fältnamn/typer/platshållare (utan värden; känsliga fält uteslutna)",
"consent.summary_data3": "Tekniska loggar (IP, webbläsarinfo)",
"consent.summary_card2_title": "Vart Det Går",
"consent.summary_transfer":
  "OpenAI (USA) för AI-behandling • Google Cloud/Firebase (EU, Polen) för hosting och säkerhet",
"consent.summary_card3_title": "Dina Rättigheter",
"consent.summary_rights":
  "Återkalla samtycke när som helst • Begär åtkomst eller radering av dina uppgifter • Fullständig information i <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Integritetspolicy</a>",
"consent.full_details_title": "Läs Fullständiga Detaljer",
"consent.section1_title": "Vilka uppgifter behandlar vi?",
"consent.data1":
  "Röstinspelning. Ljudfil skickas till OpenAI Whisper via vår server för transkribering. Filen sparas inte på servern efter behandling.",
"consent.data2":
  "Rösttranskription (text). Skickas till OpenAI GPT för formulärfyllning. Som standard sparar vi inte transkriptionen i våra system; i tekniska loggar lagrar vi endast metadata (textlängd, språk, varaktighet). Viktigt: OpenAI kan lagra förfrågningsdata i upp till 30 dagar för att förhindra missbruk; tidig radering hos OpenAI är inte tillgänglig; data används inte för modellträning.",
"consent.data3":
  "Formulärfältsmetadata. Namn/typer/platshållare (känsliga fält uteslutna).",
"consent.data4":
  "Sidans URL. Behandlas av vår infrastruktur (för kompatibilitet/diagnostik), INTE skickat till OpenAI. Undvik personuppgifter i URL-frågeparametrar.",
"consent.data5":
  "Webbläsarens User-Agent. Används lokalt och av vår infrastruktur (kompatibilitet/säkerhet), INTE skickat till OpenAI.",
"consent.data6":
  "IP-adress. Loggad av Google Cloud/Firebase-infrastruktur för säkerhet (upp till 30 dagar), INTE skickat till OpenAI.",
"consent.section2_title":
  "Vart och på vilken rättslig grund överförs uppgifter?",
"consent.recipients":
  "Mottagare. OpenAI (USA) — ljud-/textbehandling; Google Cloud/Firebase (EU/Polen) — hosting och säkerhetsloggar. Data används inte för modellträning.",
"consent.transfer1":
  "OpenAI (USA). Förfrågningar till OpenAI (inklusive ljud/text) kan lagras av OpenAI i upp till 30 dagar för att förhindra missbruk; data används inte för modellträning. Överföring till USA — baserad på SCC godkända av Europeiska kommissionen.",
"consent.basis_title": "Rättsliga grunder:",
"consent.basis1": "Röstfunktion — ditt samtycke (Art. 6(1)(a) GDPR).",
"consent.basis2":
  "Tekniska loggar (IP/UA/URL) — berättigade intressen (Art. 6(1)(f)) — säkerhet och felsökning.",
"consent.section3_title": "Dina rättigheter",
"consent.rights1":
  "Du kan återkalla samtycke i widgetinställningar när som helst; detta påverkar inte lagligheten av behandling före återkallelse.",
"consent.rights2":
  "Förutom att återkalla samtycke har du rätt att begära åtkomst eller radering av dina uppgifter lagrade i våra system (tekniska loggar, kostnadsmått) via webbplatsägaren. Fullständig information i <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Integritetspolicy</a>.",
"consent.rights3":
  "Denna funktion är avsedd för användare 16+; för yngre användare krävs förälders/vårdnadshavares samtycke.",
"consent.footer_legal_title": "Juridisk Information",
"consent.footer_controller":
  "Personuppgiftsansvarig: ägaren av denna webbplats.",
"consent.footer_processor":
  "TypelessForm: agerar som personuppgiftsbiträde.",
"consent.footer_contact": "Integritetskontakt: info@webappski.com.",
"consent.footer_sccs":
  "Överföring till USA genomförs enligt SCC. Detaljer finns i vår <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Integritetspolicy</a>.",
"consent.accept": "Jag Godkänner",

// Consent checkboxes
"consent.checkbox_main": "Jag samtycker till att TypelessForm behandlar mina röst- och formulärmetadata och till internationell överföring till USA (OpenAI) enligt SCC:er, enligt beskrivning i <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>sekretesspolicyn</a>.",
"consent.checkbox_age": "Jag bekräftar att jag är 16+ år eller har förälders/vårdnadshavares samtycke.",

// Privacy settings / data deletion
"privacy.title": "Integritet & Data",
"privacy.subtitle": "Hantera ditt samtycke och dina uppgifter",
"privacy.info_title": "Din samtyckesregistrering",
"privacy.user_id": "Identifierare",
"privacy.consent_date": "Samtycke givet",
"privacy.policy_version": "Policyversion",
"privacy.usage_count": "Antal användningar",
"privacy.no_data": "Inga samtyckesuppgifter hittades på denna enhet.",
"privacy.delete_title": "Radera mina uppgifter",
"privacy.delete_description": "Detta raderar permanent alla dina samtyckesregistreringar från våra servrar och rensar lokala data. Denna åtgärd kan inte ångras.",
"privacy.delete_confirm": "Jag förstår att detta är permanent",
"privacy.delete_button": "Radera mina uppgifter",
"privacy.deleting": "Raderar...",
"privacy.delete_success": "Alla dina uppgifter har raderats.",
"privacy.delete_error": "Kunde inte radera uppgifter. Försök igen eller kontakta info@webappski.com.",
"privacy.done": "Klar",
"privacy.link": "Integritet"
};
