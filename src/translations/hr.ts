// HR translations
export const translations = {
"modal.title": "Recite nam o ovim temama",
"modal.subtitle":
  "Razumijemo bilo koji jezik, ispunjavamo sve i prevodimo ako je potrebno",

"button.startSpeaking": "Počni govoriti",
"button.stopSpeaking": "Zaustavi snimanje",
"button.tryAgain": "Pokušajte ponovo",

"listening.title": "Slušam...",
"listening.subtitle": "Govorite prirodno o onome što želite ispuniti",
"processing.title": "Obrađuje se...",

"success.title": "Obrazac ispunjen!",
"success.subtitle":
  "Pregledajte ispunjena polja i pošaljite kada ste spremni",
"empty.title": "Nisu pronađena polja za popunjavanje",
"empty.subtitle": "Ovaj obrazac nema polja koja se mogu popuniti glasom",

"error.title": "Greška",
"error.microphone": "Potrebno je dopuštenje za mikrofon",
"error.noFields": "Nema obrazaca pronađenih na ovoj stranici",
"error.general": "Nešto je pošlo po krivu. Pokušajte ponovno.",
"error.domainNotAllowed":
  "Ova domena nije ovlaštena za korištenje usluge. Molimo kontaktirajte administratora web stranice.",
"error.invalidApiKey": "Usluga nije ispravno konfigurirana. Kontaktirajte administratora web stranice.",
"error.rateLimited": "Usluga je trenutno zauzeta. Pokušajte ponovo za trenutak.",
"error.quotaExhausted": "Ograničenje korištenja ove usluge je dosegnuto. Kontaktirajte administratora web stranice.",
"error.no_fields_detected":
  "Nije moguće prepoznati informacije za ispunjavanje obrasca. Molimo pokušajte jasnije navesti koje podatke treba unijeti u polja.",
"error.no_data_title": "Podaci nisu prepoznati",
"error.mic_title": "Potreban mikrofon",
"error.network_title": "Problem s povezivanjem",
"error.showDetails": "Prikaži tehničke detalje",

"floatingButton.fillByVoice": "Popuni glasom",

"form.progress.filled": "{count} ispunjeno",
"form.progress.scrollToSelect": "Skroluj za odabir",
"form.formNumber": "{current} od {total}",
"form.allForms": "Svi {count} obrasci",
"form.label": "Obrazac",
"form.fields": "Polja",

"loader.initial": "Priprema obrasca...",

// Dynamic progress stages for initAnalyze loading
"loader.stage1": "Analiza polja obrasca...",
"loader.stage2": "Otkrivanje jezika...",
"loader.stage3": "Identifikacija osjetljivih polja...",
"loader.stage4": "Priprema prijedloga...",
"loader.stage5": "Skoro gotovo!",

// Dynamic progress stages for processing (voice->text->LLM)
"processing.stage1": "Pretvaranje govora u tekst...",
"processing.stage2": "Otkrivanje jezika...",
"processing.stage3": "Razumijevanje vašeg zahtjeva...",
"processing.stage4": "Izdvajanje podataka...",
"processing.stage5": "Usklađivanje s poljima obrasca...",
"processing.stage6": "Provjera podataka...",
"processing.stage7": "Priprema rezultata...",
"processing.stage8": "Skoro gotovo!",

"success.apply_changes": "Ispuni i provjeri",
"success.empty_fields": "Nije ispunjeno",
"success.check_fields": "Provjeri",
"success.filled_fields": "Dovršeno",
"success.field_single": "polje",
"success.fields_multiple": "polja",
"success.require_attention": "zahtijevaju pažnju",
"success.successfully_filled": "uspješno ispunjeno",

"error.noActiveForm": "Nije pronađen aktivni obrazac za ispunjavanje",
"error.lowConfidence":
  "Nisam mogao jasno razumjeti zvuk. Molimo govorite jasnije.",
"button.close": "Zatvori",
// Consent modal
"consent.title": "Vaša Privatnost Podataka",
"consent.subtitle":
  "Molimo pažljivo pročitajte informacije o zaštiti vaših podataka",
"consent.warning_title": "Važno: Ne Dijelite Osjetljive Podatke",
"consent.warning":
  "Molimo ne spominjite lozinke, detalje plaćanja, državne identifikatore ili medicinske informacije. Ti podaci nisu namijenjeni obradi glasovnom funkcijom.",
"consent.summary_card1_title": "Što Prikupljamo",
"consent.summary_data1": "Glasovni snimak → pretvoreno u tekst",
"consent.summary_data2":
  "Nazivi/tipovi/zamjenski znakovi polja (bez vrijednosti; osjetljiva polja isključena)",
"consent.summary_data3": "Tehnički zapisi (IP, informacije preglednika)",
"consent.summary_card2_title": "Gdje Ide",
"consent.summary_transfer":
  "OpenAI (SAD) za AI obradu • Google Cloud/Firebase (EU, Poljska) za hosting i sigurnost",
"consent.summary_card3_title": "Vaša Prava",
"consent.summary_rights":
  "Povucite pristanak bilo kada • Zatražite pristup ili brisanje vaših podataka • Potpuni detalji u <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Politici privatnosti</a>",
"consent.full_details_title": "Pročitajte Potpune Detalje",
"consent.section1_title": "Koje podatke obrađujemo?",
"consent.data1":
  "Glasovni snimak. Audio datoteka poslana OpenAI Whisperu putem našeg servera za transkripciju. Datoteka se ne sprema na server nakon obrade.",
"consent.data2":
  "Glasovna transkripcija (tekst). Poslano OpenAI GPT-u za popunjavanje obrazaca. Prema zadanim postavkama ne spremamo transkripciju u naše sustave; u tehničkim zapisima pohranjujemo samo metapodatke (duljina teksta, jezik, trajanje). Važno: OpenAI može pohraniti podatke zahtjeva do 30 dana kako bi spriječio zlouporabu; rano brisanje u OpenAI-u nije dostupno; podaci se ne koriste za obuku modela.",
"consent.data3":
  "Metapodaci polja obrasca. Nazivi/tipovi/zamjenski znakovi (osjetljiva polja isključena).",
"consent.data4":
  "URL stranice. Obrađen našom infrastrukturom (za kompatibilnost/dijagnostiku), NIJE poslan OpenAI-u. Molimo izbjegavajte osobne podatke u parametrima upita URL-a.",
"consent.data5":
  "User-Agent preglednika. Koristi se lokalno i našom infrastrukturom (kompatibilnost/sigurnost), NIJE poslan OpenAI-u.",
"consent.data6":
  "IP adresa. Zabilježena infrastrukturom Google Cloud/Firebase radi sigurnosti (do 30 dana), NIJE poslana OpenAI-u.",
"consent.section2_title":
  "Gdje i na kojoj pravnoj osnovi se prenose podaci?",
"consent.recipients":
  "Primatelji. OpenAI (SAD) — obrada zvuka/teksta; Google Cloud/Firebase (EU/Poljska) — hosting i zapisi sigurnosti. Podaci se ne koriste za obuku modela.",
"consent.transfer1":
  "OpenAI (SAD). Zahtjevi OpenAI-u (uključujući zvuk/tekst) mogu biti pohranjeni od strane OpenAI-a do 30 dana kako bi se spriječila zlouporaba; podaci se ne koriste za obuku modela. Prijenos u SAD — na temelju SCC-a odobrenih od strane Europske komisije.",
"consent.basis_title": "Pravne osnove:",
"consent.basis1":
  "Glasovna funkcija — vaš pristanak (čl. 6. st. 1. toč. a) GDPR-a).",
"consent.basis2":
  "Tehnički zapisi (IP/UA/URL) — legitimni interesi (čl. 6. st. 1. toč. f)) — sigurnost i otklanjanje grešaka.",
"consent.section3_title": "Vaša prava",
"consent.rights1":
  "Pristanak možete povući u postavkama widgeta bilo kada; to ne utječe na zakonitost obrade prije povlačenja.",
"consent.rights2":
  "Osim povlačenja pristanka, imate pravo zatražiti pristup ili brisanje vaših podataka pohranjenih u našim sustavima (tehnički zapisi, metriku troškova) putem vlasnika web stranice. Potpuni detalji u <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Politici privatnosti</a>.",
"consent.rights3":
  "Ova je funkcija namijenjena korisnicima od 16+; za mlađe korisnike potreban je pristanak roditelja/skrbnika.",
"consent.footer_legal_title": "Pravne Informacije",
"consent.footer_controller": "Voditelj obrade: vlasnik ove web stranice.",
"consent.footer_processor":
  "TypelessForm: djeluje kao izvršitelj obrade.",
"consent.footer_contact": "Kontakt za privatnost: info@webappski.com.",
"consent.footer_sccs":
  "Prijenos u SAD provodi se prema SCC-u. Detalji su dostupni u našoj <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Politici privatnosti</a>.",
"consent.accept": "Prihvaćam",

// Consent checkboxes
"consent.checkbox_main": "Pristajem na obradu mojih glasovnih podataka i metapodataka obrasca od strane TypelessForm te na međunarodni prijenos u SAD (OpenAI) prema SCC-ima, kako je opisano u <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Politici privatnosti</a>.",
"consent.checkbox_age": "Potvrđujem da imam 16+ godina ili imam pristanak roditelja/skrbnika.",

// Privacy settings / data deletion
"privacy.title": "Privatnost i podaci",
"privacy.subtitle": "Upravljajte pristankom i podacima",
"privacy.info_title": "Vaš zapis pristanka",
"privacy.user_id": "Identifikator",
"privacy.consent_date": "Pristanak dan",
"privacy.policy_version": "Verzija politike",
"privacy.usage_count": "Broj korištenja",
"privacy.no_data": "Podaci o pristanku nisu pronađeni na ovom uređaju.",
"privacy.delete_title": "Izbriši moje podatke",
"privacy.delete_description": "Ovo će trajno izbrisati sve vaše zapise pristanka s naših poslužitelja i očistiti lokalne podatke. Ova radnja se ne može poništiti.",
"privacy.delete_confirm": "Razumijem da je ovo trajno",
"privacy.delete_button": "Izbriši moje podatke",
"privacy.deleting": "Brisanje...",
"privacy.delete_success": "Svi vaši podaci uspješno su izbrisani.",
"privacy.delete_error": "Nije moguće izbrisati podatke. Pokušajte ponovo ili kontaktirajte info@webappski.com.",
"privacy.done": "Gotovo",
"privacy.link": "Privatnost"
};
