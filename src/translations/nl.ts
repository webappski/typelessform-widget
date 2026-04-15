// NL translations
export const translations = {
"modal.title": "Vertel ons over deze onderwerpen",
"modal.subtitle":
  "We begrijpen elke taal, vullen alles in en vertalen indien nodig",

"loader.initial": "Formulier voorbereiden...",

// Dynamic progress stages for initAnalyze loading
"loader.stage1": "Formuliervelden analyseren...",
"loader.stage2": "Taal detecteren...",
"loader.stage3": "Gevoelige velden identificeren...",
"loader.stage4": "Suggesties voorbereiden...",
"loader.stage5": "Bijna klaar!",

"button.startSpeaking": "Begin te spreken",
"button.stopSpeaking": "Opname stoppen",
"button.tryAgain": "Opnieuw proberen",

"listening.title": "Luisteren...",
"listening.subtitle": "Spreek natuurlijk over wat je wilt invullen",
"processing.title": "Bezig met verwerken...",

// Dynamic progress stages for processing (voice->text->LLM)
"processing.stage1": "Spraak naar tekst converteren...",
"processing.stage2": "Taal detecteren...",
"processing.stage3": "Uw verzoek begrijpen...",
"processing.stage4": "Gegevens extraheren...",
"processing.stage5": "Koppelen met formuliervelden...",
"processing.stage6": "Gegevens valideren...",
"processing.stage7": "Resultaten voorbereiden...",
"processing.stage8": "Bijna klaar!",

"success.title": "Formulier ingevuld!",
"success.subtitle":
  "Controleer de ingevulde velden en verzend wanneer je klaar bent",
"success.apply_changes": "Invullen en controleren",
"success.empty_fields": "Niet ingevuld",
"success.check_fields": "Controleren",
"success.filled_fields": "Voltooid",
"success.field_single": "veld",
"success.fields_multiple": "velden",
"success.require_attention": "vereisen aandacht",
"success.successfully_filled": "succesvol ingevuld",

"empty.title": "Geen invulbare velden gevonden",
"empty.subtitle": "Dit formulier heeft geen velden die met spraak ingevuld kunnen worden",

"error.title": "Fout",
"error.microphone": "Microfoontoegang vereist",
"error.noFields": "Geen formulieren gedetecteerd op deze pagina",
"error.noActiveForm": "Geen actief formulier gevonden om in te vullen",
"error.lowConfidence":
  "Kon de audio niet duidelijk begrijpen. Spreek alstublieft duidelijker.",
"error.general": "Er is iets misgegaan. Probeer het opnieuw.",
"error.domainNotAllowed":
  "Dit domein is niet geautoriseerd om de service te gebruiken. Neem contact op met de website beheerder.",
"error.invalidApiKey": "De service is niet correct geconfigureerd. Neem contact op met de websitebeheerder.",
"error.rateLimited": "De service is momenteel druk. Probeer het over een ogenblik opnieuw.",
"error.quotaExhausted": "De gebruikslimiet voor deze service is bereikt. Neem contact op met de websitebeheerder.",
"error.no_fields_detected":
  "Kon de informatie voor het invullen van het formulier niet herkennen. Probeer duidelijker aan te geven welke gegevens in de velden moeten worden ingevoerd.",
"error.no_data_title": "Gegevens niet herkend",
"error.mic_title": "Microfoon vereist",
"error.network_title": "Verbindingsprobleem",
"error.showDetails": "Technische details weergeven",

"floatingButton.fillByVoice": "Vul in met spraak",

"form.progress.filled": "{count} ingevuld",
"form.progress.scrollToSelect": "Scroll om te selecteren",
"form.formNumber": "{current} van {total}",
"form.allForms": "Alle {count} formulieren",
"form.label": "Formulier",
"form.fields": "Velden",
"button.close": "Sluiten",
// Consent modal
"consent.title": "Uw Gegevensprivacy",
"consent.subtitle":
  "Lees de informatie over uw gegevensbescherming zorgvuldig door",
"consent.warning_title": "Belangrijk: Deel Geen Gevoelige Gegevens",
"consent.warning":
  "Vermeld geen wachtwoorden, betalingsgegevens, overheidsidentificatienummers of medische informatie. Deze gegevens zijn niet bedoeld voor verwerking door de spraakfunctie.",
"consent.summary_card1_title": "Wat We Verzamelen",
"consent.summary_data1": "Spraakopname → geconverteerd naar tekst",
"consent.summary_data2":
  "Veldnamen/types/placeholders (zonder waarden; gevoelige velden uitgesloten)",
"consent.summary_data3": "Technische logboeken (IP, browserinfo)",
"consent.summary_card2_title": "Waar Het Naartoe Gaat",
"consent.summary_transfer":
  "OpenAI (VS) voor AI-verwerking • Google Cloud/Firebase (EU, Polen) voor hosting en beveiliging",
"consent.summary_card3_title": "Uw Rechten",
"consent.summary_rights":
  "Toestemming op elk moment intrekken • Toegang of verwijdering van uw gegevens aanvragen • Volledige details in <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Privacybeleid</a>",
"consent.full_details_title": "Volledige Details Lezen",
"consent.section1_title": "Welke gegevens verwerken we?",
"consent.data1":
  "Spraakopname. Audiobestand verzonden naar OpenAI Whisper via onze server voor transcriptie. Het bestand wordt niet op de server opgeslagen na verwerking.",
"consent.data2":
  "Spraaktranscriptie (tekst). Verzonden naar OpenAI GPT voor het invullen van formulieren. Standaard slaan we de transcriptie niet op in onze systemen; in technische logboeken slaan we alleen metadata op (tekstlengte, taal, duur). Belangrijk: OpenAI kan verzoekgegevens tot 30 dagen bewaren om misbruik te voorkomen; vervroegde verwijdering bij OpenAI is niet beschikbaar; gegevens worden niet gebruikt voor modeltraining.",
"consent.data3":
  "Formulierveldmetadata. Namen/types/placeholders (gevoelige velden uitgesloten).",
"consent.data4":
  "Pagina-URL. Verwerkt door onze infrastructuur (voor compatibiliteit/diagnostiek), NIET verzonden naar OpenAI. Vermijd persoonlijke gegevens in URL-queryparameters.",
"consent.data5":
  "Browser User-Agent. Lokaal gebruikt en door onze infrastructuur (compatibiliteit/beveiliging), NIET verzonden naar OpenAI.",
"consent.data6":
  "IP-adres. Gelogd door Google Cloud/Firebase-infrastructuur voor beveiliging (tot 30 dagen), NIET verzonden naar OpenAI.",
"consent.section2_title":
  "Waarheen en op welke rechtsgrondslag worden gegevens overgedragen?",
"consent.recipients":
  "Ontvangers. OpenAI (VS) — audio-/tekstverwerking; Google Cloud/Firebase (EU/Polen) — hosting en beveiligingslogboeken. Gegevens worden niet gebruikt voor modeltraining.",
"consent.transfer1":
  "OpenAI (VS). Verzoeken aan OpenAI (inclusief audio/tekst) kunnen door OpenAI tot 30 dagen worden bewaard om misbruik te voorkomen; gegevens worden niet gebruikt voor modeltraining. Overdracht naar VS — gebaseerd op door de Europese Commissie goedgekeurde SCC.",
"consent.basis_title": "Rechtsgronden:",
"consent.basis1": "Spraakfunctie — uw toestemming (Art. 6(1)(a) AVG).",
"consent.basis2":
  "Technische logboeken (IP/UA/URL) — gerechtvaardigde belangen (Art. 6(1)(f)) — beveiliging en debugging.",
"consent.section3_title": "Uw rechten",
"consent.rights1":
  "U kunt uw toestemming op elk moment intrekken in de widget-instellingen; dit heeft geen invloed op de rechtmatigheid van de verwerking vóór intrekking.",
"consent.rights2":
  "Naast het intrekken van toestemming heeft u het recht om toegang of verwijdering van uw gegevens opgeslagen in onze systemen (technische logboeken, kostenstatistieken) aan te vragen via de website-eigenaar. Volledige details in het <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Privacybeleid</a>.",
"consent.rights3":
  "Deze functie is bedoeld voor gebruikers van 16+; voor jongere gebruikers is toestemming van ouders/voogd vereist.",
"consent.footer_legal_title": "Juridische Informatie",
"consent.footer_controller":
  "Verwerkingsverantwoordelijke: de eigenaar van deze website.",
"consent.footer_processor": "TypelessForm: fungeert als verwerker.",
"consent.footer_contact": "Privacycontact: info@webappski.com.",
"consent.footer_sccs":
  "Overdracht naar VS wordt uitgevoerd onder SCC. Details zijn beschikbaar in ons <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Privacybeleid</a>.",
"consent.accept": "Ik accepteer",

// Consent checkboxes
"consent.checkbox_main": "Ik stem in met de verwerking van mijn spraak- en formuliermetadata door TypelessForm en de internationale overdracht naar de VS (OpenAI) onder SCC's, zoals beschreven in het <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Privacybeleid</a>.",
"consent.checkbox_age": "Ik bevestig dat ik 16+ jaar ben of toestemming van een ouder/voogd heb.",

// Privacy settings / data deletion
"privacy.title": "Privacy & Gegevens",
"privacy.subtitle": "Beheer uw toestemming en gegevens",
"privacy.info_title": "Uw toestemmingsrecord",
"privacy.user_id": "Identificatie",
"privacy.consent_date": "Toestemming gegeven",
"privacy.policy_version": "Beleidsversie",
"privacy.usage_count": "Aantal keer gebruikt",
"privacy.no_data": "Geen toestemmingsgegevens gevonden op dit apparaat.",
"privacy.delete_title": "Mijn gegevens verwijderen",
"privacy.delete_description": "Dit verwijdert permanent al uw toestemmingsrecords van onze servers en wist lokale gegevens. Deze actie kan niet ongedaan worden gemaakt.",
"privacy.delete_confirm": "Ik begrijp dat dit permanent is",
"privacy.delete_button": "Mijn gegevens verwijderen",
"privacy.deleting": "Verwijderen...",
"privacy.delete_success": "Al uw gegevens zijn succesvol verwijderd.",
"privacy.delete_error": "Gegevens konden niet worden verwijderd. Probeer opnieuw of neem contact op via info@webappski.com.",
"privacy.done": "Klaar",
"privacy.link": "Privacy"
};
