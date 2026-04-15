// SK translations
export const translations = {
"modal.title": "Povedzte nám o týchto témach",
"modal.subtitle":
  "Rozumieme akémukoľvek jazyku, vyplníme všetko a preložíme, ak je to potrebné",

"button.startSpeaking": "Začnite hovoriť",
"button.stopSpeaking": "Zastaviť nahrávanie",
"button.tryAgain": "Skúsiť znova",

"listening.title": "Počúvam...",
"listening.subtitle": "Hovorte prirodzene o tom, čo chcete vyplniť",
"processing.title": "Spracováva sa...",

"success.title": "Formulár vyplnený!",
"success.subtitle":
  "Skontrolujte vyplnené polia a odošlite, keď ste pripravení",
"empty.title": "Nenašli sa žiadne vyplniteľné polia",
"empty.subtitle": "Tento formulár nemá polia, ktoré je možné vyplniť hlasom",

"error.title": "Chyba",
"error.microphone": "Vyžaduje sa prístup k mikrofónu",
"error.noFields": "Na tejto stránke neboli nájdené žiadne formuláre",
"error.general": "Niečo sa pokazilo. Skúste to prosím znova.",
"error.domainNotAllowed":
  "Táto doména nie je oprávnená používať službu. Kontaktujte prosím správcu webovej stránky.",
"error.invalidApiKey": "Služba nie je správne nakonfigurovaná. Kontaktujte prosím správcu webu.",
"error.rateLimited": "Služba je práve vyťažená. Skúste to prosím o chvíľu znova.",
"error.quotaExhausted": "Limit využitia tejto služby bol dosiahnutý. Kontaktujte prosím správcu webu.",
"error.no_fields_detected":
  "Nepodarilo sa rozpoznať informácie na vyplnenie formulára. Skúste prosím jasnejšie určiť, aké údaje majú byť zadané do polí.",
"error.no_data_title": "Údaje neboli rozpoznané",
"error.mic_title": "Vyžaduje sa mikrofón",
"error.network_title": "Problém s pripojením",
"error.showDetails": "Zobraziť technické podrobnosti",

"floatingButton.fillByVoice": "Vyplniť hlasom",

"form.progress.filled": "{count} vyplnené",
"form.progress.scrollToSelect": "Posúvajte pre výber",
"form.formNumber": "{current} z {total}",
"form.allForms": "Všetky {count} formuláre",
"form.label": "Formulár",
"form.fields": "Polia",

"loader.initial": "Príprava formulára...",

// Dynamic progress stages for initAnalyze loading
"loader.stage1": "Analýza polí formulára...",
"loader.stage2": "Detekcia jazyka...",
"loader.stage3": "Identifikácia citlivých polí...",
"loader.stage4": "Príprava návrhov...",
"loader.stage5": "Skoro hotové!",

// Dynamic progress stages for processing (voice->text->LLM)
"processing.stage1": "Prevod reči na text...",
"processing.stage2": "Detekcia jazyka...",
"processing.stage3": "Pochopenie vašej požiadavky...",
"processing.stage4": "Extrakcia údajov...",
"processing.stage5": "Párovanie s poliami formulára...",
"processing.stage6": "Validácia údajov...",
"processing.stage7": "Príprava výsledkov...",
"processing.stage8": "Skoro hotové!",

"success.apply_changes": "Vyplniť a skontrolovať",
"success.empty_fields": "Nevyplnené",
"success.check_fields": "Skontrolovať",
"success.filled_fields": "Dokončené",
"success.field_single": "pole",
"success.fields_multiple": "polia",
"success.require_attention": "vyžadujú pozornosť",
"success.successfully_filled": "úspešne vyplnené",

"error.noActiveForm": "Nenašiel sa žiadny aktívny formulár na vyplnenie",
"error.lowConfidence":
  "Nepodarilo sa jasne rozpoznať zvuk. Prosím, hovorte zreteľnejšie.",
"button.close": "Zatvoriť",
// Consent modal
"consent.title": "Vaše Súkromie Údajov",
"consent.subtitle":
  "Prosím, pozorne si prečítajte informácie o ochrane vašich údajov",
"consent.warning_title": "Dôležité: Nezdieľajte Citlivé Údaje",
"consent.warning":
  "Prosím neuvádzajte heslá, platobné údaje, vládne identifikátory alebo zdravotné informácie. Tieto údaje nie sú určené na spracovanie hlasovou funkciou.",
"consent.summary_card1_title": "Čo Zbierame",
"consent.summary_data1": "Hlasový záznam → prevedený na text",
"consent.summary_data2":
  "Názvy/typy/zástupné znaky polí (bez hodnôt; citlivé polia vylúčené)",
"consent.summary_data3":
  "Technické protokoly (IP, informácie o prehliadači)",
"consent.summary_card2_title": "Kam To Smeruje",
"consent.summary_transfer":
  "OpenAI (USA) na spracovanie AI • Google Cloud/Firebase (EÚ, Poľsko) na hosting a zabezpečenie",
"consent.summary_card3_title": "Vaše Práva",
"consent.summary_rights":
  "Kedykoľvek odvolať súhlas • Požiadať o prístup alebo vymazanie vašich údajov • Úplné podrobnosti v <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Zásadách ochrany osobných údajov</a>",
"consent.full_details_title": "Prečítať Úplné Podrobnosti",
"consent.section1_title": "Aké údaje spracovávame?",
"consent.data1":
  "Hlasový záznam. Zvukový súbor odoslaný do OpenAI Whisper prostredníctvom nášho servera na prepis. Súbor nie je po spracovaní uložený na serveri.",
"consent.data2":
  "Prepis hlasu (text). Odoslané do OpenAI GPT na vyplnenie formulára. V predvolenom nastavení prepis neukladáme v našich systémoch; v technických protokoloch ukladáme len metaúdaje (dĺžka textu, jazyk, trvanie). Dôležité: OpenAI môže ukladať údaje požiadaviek až 30 dní na prevenciu zneužitia; skoré vymazanie v OpenAI nie je k dispozícii; údaje sa nepoužívajú na trénovanie modelov.",
"consent.data3":
  "Metaúdaje polí formulára. Názvy/typy/zástupné znaky (citlivé polia vylúčené).",
"consent.data4":
  "URL stránky. Spracované našou infraštruktúrou (na kompatibilitu/diagnostiku), NIE je odoslané do OpenAI. Prosím vyhýbajte sa osobným údajom v parametroch dotazu URL.",
"consent.data5":
  "User-Agent prehliadača. Používaný lokálne a našou infraštruktúrou (kompatibilita/zabezpečenie), NIE je odoslaný do OpenAI.",
"consent.data6":
  "IP adresa. Zaznamenaná infraštruktúrou Google Cloud/Firebase na zabezpečenie (až 30 dní), NIE je odoslaná do OpenAI.",
"consent.section2_title":
  "Kam a na akom právnom základe sa údaje prenášajú?",
"consent.recipients":
  "Príjemcovia. OpenAI (USA) — spracovanie zvuku/textu; Google Cloud/Firebase (EÚ/Poľsko) — hosting a protokoly zabezpečenia. Údaje sa nepoužívajú na trénovanie modelov.",
"consent.transfer1":
  "OpenAI (USA). Požiadavky na OpenAI (vrátane zvuku/textu) môžu byť OpenAI uložené až 30 dní na prevenciu zneužitia; údaje sa nepoužívajú na trénovanie modelov. Prenos do USA — na základe SCC schválených Európskou komisiou.",
"consent.basis_title": "Právne základy:",
"consent.basis1":
  "Hlasová funkcia — váš súhlas (čl. 6 ods. 1 písm. a) GDPR).",
"consent.basis2":
  "Technické protokoly (IP/UA/URL) — oprávnené záujmy (čl. 6 ods. 1 písm. f)) — zabezpečenie a ladenie.",
"consent.section3_title": "Vaše práva",
"consent.rights1":
  "Súhlas môžete kedykoľvek odvolať v nastaveniach widgetu; to neovplyvňuje zákonnosť spracovania pred odvolaním.",
"consent.rights2":
  "Okrem odvolania súhlasu máte právo požiadať o prístup alebo vymazanie vašich údajov uložených v našich systémoch (technické protokoly, nákladové metriky) prostredníctvom majiteľa webu. Úplné podrobnosti v <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Zásadách ochrany osobných údajov</a>.",
"consent.rights3":
  "Táto funkcia je určená pre používateľov 16+; pre mladších používateľov sa vyžaduje súhlas rodiča/opatrovníka.",
"consent.footer_legal_title": "Právne Informácie",
"consent.footer_controller":
  "Správca údajov: majiteľ tejto webovej stránky.",
"consent.footer_processor": "TypelessForm: koná ako spracovateľ.",
"consent.footer_contact":
  "Kontakt pre ochranu osobných údajov: info@webappski.com.",
"consent.footer_sccs":
  "Prenos do USA sa vykonáva na základe SCC. Podrobnosti sú k dispozícii v našich <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Zásadách ochrany osobných údajov</a>.",
"consent.accept": "Súhlasím",

// Consent checkboxes
"consent.checkbox_main": "Súhlasím so spracovaním mojich hlasových a formulárových metaúdajov spoločnosťou TypelessForm a s medzinárodným prenosom do USA (OpenAI) na základe SCC, ako je opísané v <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Zásadách ochrany osobných údajov</a>.",
"consent.checkbox_age": "Potvrdzujem, že mám 16+ rokov alebo mám súhlas rodiča/opatrovníka.",

// Privacy settings / data deletion
"privacy.title": "Súkromie a údaje",
"privacy.subtitle": "Spravujte svoj súhlas a údaje",
"privacy.info_title": "Váš záznam súhlasu",
"privacy.user_id": "Identifikátor",
"privacy.consent_date": "Súhlas udelený",
"privacy.policy_version": "Verzia zásad",
"privacy.usage_count": "Počet použití",
"privacy.no_data": "Na tomto zariadení neboli nájdené žiadne údaje o súhlase.",
"privacy.delete_title": "Vymazať moje údaje",
"privacy.delete_description": "Toto natrvalo vymaže všetky vaše záznamy o súhlase z našich serverov a vyčistí lokálne údaje. Túto akciu nie je možné vrátiť.",
"privacy.delete_confirm": "Chápem, že je to trvalé",
"privacy.delete_button": "Vymazať moje údaje",
"privacy.deleting": "Mazanie...",
"privacy.delete_success": "Všetky vaše údaje boli úspešne vymazané.",
"privacy.delete_error": "Nepodarilo sa vymazať údaje. Skúste znova alebo kontaktujte info@webappski.com.",
"privacy.done": "Hotovo",
"privacy.link": "Súkromie"
};
