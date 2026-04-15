// CS translations
export const translations = {
"modal.title": "Řekněte nám o těchto tématech",
"modal.subtitle":
  "Rozumíme jakémukoli jazyku, vyplníme vše a přeložíme, pokud je to potřeba",

"loader.initial": "Příprava formuláře...",

// Dynamic progress stages for initAnalyze loading
"loader.stage1": "Analýza polí formuláře...",
"loader.stage2": "Detekce jazyka...",
"loader.stage3": "Identifikace citlivých polí...",
"loader.stage4": "Příprava návrhů...",
"loader.stage5": "Skoro hotovo!",

"button.startSpeaking": "Začněte mluvit",
"button.stopSpeaking": "Zastavit nahrávání",
"button.tryAgain": "Zkusit znovu",

"listening.title": "Poslouchám...",
"listening.subtitle": "Mluvte přirozeně o tom, co chcete vyplnit",
"processing.title": "Zpracovávám...",

// Dynamic progress stages for processing (voice->text->LLM)
"processing.stage1": "Převod řeči na text...",
"processing.stage2": "Detekce jazyka...",
"processing.stage3": "Pochopení vašeho požadavku...",
"processing.stage4": "Extrakce dat...",
"processing.stage5": "Párování s poli formuláře...",
"processing.stage6": "Validace dat...",
"processing.stage7": "Příprava výsledků...",
"processing.stage8": "Skoro hotovo!",

"success.title": "Formulář vyplněn!",
"success.subtitle":
  "Zkontrolujte vyplněná pole a odešlete, až budete připraveni",
"success.apply_changes": "Vyplnit a zkontrolovat",
"success.empty_fields": "Nevyplněno",
"success.check_fields": "Zkontrolovat",
"success.filled_fields": "Dokončeno",
"success.field_single": "pole",
"success.fields_multiple": "pole",
"success.require_attention": "vyžadují pozornost",
"success.successfully_filled": "úspěšně vyplněno",

"empty.title": "Nebyly nalezeny žádná vyplnitelná pole",
"empty.subtitle": "Tento formulář nemá pole, která lze vyplnit hlasem",

"error.title": "Chyba",
"error.microphone": "Vyžadován přístup k mikrofonu",
"error.noFields": "Na této stránce nebyly nalezeny žádné formuláře",
"error.noActiveForm": "Nebyl nalezen žádný aktivní formulář k vyplnění",
"error.lowConfidence":
  "Nepodařilo se jasně rozpoznat zvuk. Prosím, mluvte zřetelněji.",
"error.general": "Něco se pokazilo. Zkuste to prosím znovu.",
"error.domainNotAllowed":
  "Tato doména není oprávněna používat službu. Kontaktujte prosím správce webu.",
"error.invalidApiKey": "Služba není správně nakonfigurována. Kontaktujte prosím správce webu.",
"error.rateLimited": "Služba je právě vytížená. Zkuste to prosím za chvíli znovu.",
"error.quotaExhausted": "Limit využití této služby byl dosažen. Kontaktujte prosím správce webu.",
"error.no_fields_detected":
  "Nepodařilo se rozpoznat informace pro vyplnění formuláře. Zkuste prosím jasněji určit, jaká data mají být zadána do polí.",
"error.no_data_title": "Data nebyla rozpoznána",
"error.mic_title": "Vyžadován mikrofon",
"error.network_title": "Problém s připojením",
"error.showDetails": "Zobrazit technické podrobnosti",

"floatingButton.fillByVoice": "Vyplnit hlasem",

"form.progress.filled": "{count} vyplněno",
"form.progress.scrollToSelect": "Rolujte pro výběr",
"form.formNumber": "{current} z {total}",
"form.allForms": "Všechny {count} formuláře",
"form.label": "Formulář",
"form.fields": "Pole",
"button.close": "Zavřít",
// Consent modal
"consent.title": "Vaše Soukromí Dat",
"consent.subtitle":
  "Pečlivě si prosím přečtěte informace o ochraně vašich údajů",
"consent.warning_title": "Důležité: Nesdílejte Citlivé Údaje",
"consent.warning":
  "Prosím neuvádějte hesla, platební údaje, státní identifikátory nebo zdravotní informace. Tato data nejsou určena ke zpracování hlasovou funkcí.",
"consent.summary_card1_title": "Co Sbíráme",
"consent.summary_data1": "Hlasový záznam → převedený na text",
"consent.summary_data2":
  "Názvy/typy/zástupné znaky polí (bez hodnot; citlivá pole vyloučena)",
"consent.summary_data3": "Technické protokoly (IP, informace o prohlížeči)",
"consent.summary_card2_title": "Kam To Směřuje",
"consent.summary_transfer":
  "OpenAI (USA) pro zpracování AI • Google Cloud/Firebase (EU, Polsko) pro hosting a zabezpečení",
"consent.summary_card3_title": "Vaše Práva",
"consent.summary_rights":
  "Kdykoli odvolat souhlas • Požádat o přístup nebo vymazání vašich údajů • Úplné podrobnosti v <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Zásadách ochrany osobních údajů</a>",
"consent.full_details_title": "Přečíst Úplné Podrobnosti",
"consent.section1_title": "Jaká data zpracováváme?",
"consent.data1":
  "Hlasový záznam. Zvukový soubor odeslaný do OpenAI Whisper prostřednictvím našeho serveru k přepisu. Soubor není po zpracování uložen na serveru.",
"consent.data2":
  "Přepis hlasu (text). Odesláno do OpenAI GPT k vyplnění formuláře. Ve výchozím nastavení přepis neukládáme v našich systémech; v technických protokolech ukládáme pouze metadata (délka textu, jazyk, trvání). Důležité: OpenAI může ukládat data požadavků až 30 dní pro prevenci zneužití; předčasné vymazání v OpenAI není k dispozici; data nejsou používána k trénování modelů.",
"consent.data3":
  "Metadata polí formuláře. Názvy/typy/zástupné znaky (citlivá pole vyloučena).",
"consent.data4":
  "URL stránky. Zpracováno naší infrastrukturou (pro kompatibilitu/diagnostiku), NENÍ odesláno do OpenAI. Vyhněte se prosím osobním údajům v parametrech dotazu URL.",
"consent.data5":
  "User-Agent prohlížeče. Používán lokálně a naší infrastrukturou (kompatibilita/zabezpečení), NENÍ odeslán do OpenAI.",
"consent.data6":
  "IP adresa. Zaznamenána infrastrukturou Google Cloud/Firebase pro zabezpečení (až 30 dní), NENÍ odeslána do OpenAI.",
"consent.section2_title":
  "Kam a na jakém právním základě jsou data přenášena?",
"consent.recipients":
  "Příjemci. OpenAI (USA) — zpracování zvuku/textu; Google Cloud/Firebase (EU/Polsko) — hosting a protokoly zabezpečení. Data nejsou používána k trénování modelů.",
"consent.transfer1":
  "OpenAI (USA). Požadavky na OpenAI (včetně zvuku/textu) mohou být OpenAI uloženy až 30 dní pro prevenci zneužití; data nejsou používána k trénování modelů. Přenos do USA — na základě SCC schválených Evropskou komisí.",
"consent.basis_title": "Právní základy:",
"consent.basis1":
  "Hlasová funkce — váš souhlas (čl. 6 odst. 1 písm. a) GDPR).",
"consent.basis2":
  "Technické protokoly (IP/UA/URL) — oprávněné zájmy (čl. 6 odst. 1 písm. f)) — zabezpečení a ladění.",
"consent.section3_title": "Vaše práva",
"consent.rights1":
  "Souhlas můžete kdykoli odvolat v nastavení widgetu; to neovlivňuje zákonnost zpracování před odvoláním.",
"consent.rights2":
  "Kromě odvolání souhlasu máte právo požádat o přístup nebo vymazání vašich údajů uložených v našich systémech (technické protokoly, nákladové metriky) prostřednictvím vlastníka webu. Úplné podrobnosti v <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Zásadách ochrany osobních údajů</a>.",
"consent.rights3":
  "Tato funkce je určena pro uživatele 16+; pro mladší uživatele je vyžadován souhlas rodiče/opatrovníka.",
"consent.footer_legal_title": "Právní Informace",
"consent.footer_controller": "Správce údajů: vlastník této webové stránky.",
"consent.footer_processor": "TypelessForm: jedná jako zpracovatel.",
"consent.footer_contact":
  "Kontakt pro ochranu osobních údajů: info@webappski.com.",
"consent.footer_sccs":
  "Přenos do USA se provádí na základě SCC. Podrobnosti jsou k dispozici v našich <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Zásadách ochrany osobních údajů</a>.",
"consent.accept": "Souhlasím",

// Consent checkboxes
"consent.checkbox_main": "Souhlasím se zpracováním mých hlasových a formulářových metadat společností TypelessForm a s mezinárodním přenosem do USA (OpenAI) na základě SCC, jak je popsáno v <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Zásadách ochrany osobních údajů</a>.",
"consent.checkbox_age": "Potvrzuji, že je mi 16+ let nebo mám souhlas rodiče/opatrovníka.",

// Privacy settings / data deletion
"privacy.title": "Soukromí a data",
"privacy.subtitle": "Spravujte svůj souhlas a data",
"privacy.info_title": "Váš záznam souhlasu",
"privacy.user_id": "Identifikátor",
"privacy.consent_date": "Souhlas udělen",
"privacy.policy_version": "Verze zásad",
"privacy.usage_count": "Počet použití",
"privacy.no_data": "Na tomto zařízení nebyla nalezena žádná data o souhlasu.",
"privacy.delete_title": "Smazat moje data",
"privacy.delete_description": "Toto trvale smaže všechny vaše záznamy o souhlasu z našich serverů a vymaže lokální data. Tuto akci nelze vrátit zpět.",
"privacy.delete_confirm": "Chápu, že je to trvalé",
"privacy.delete_button": "Smazat moje data",
"privacy.deleting": "Mazání...",
"privacy.delete_success": "Všechna vaše data byla úspěšně smazána.",
"privacy.delete_error": "Nepodařilo se smazat data. Zkuste to znovu nebo kontaktujte info@webappski.com.",
"privacy.done": "Hotovo",
"privacy.link": "Soukromí"
};
