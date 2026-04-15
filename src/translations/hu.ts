// HU translations
export const translations = {
"modal.title": "Mondd el nekünk ezeket a témákat",
"modal.subtitle":
  "Bármely nyelvet értünk, mindent kitöltünk, és ha kell, fordítunk",

"loader.initial": "Űrlap előkészítése...",

// Dynamic progress stages for initAnalyze loading
"loader.stage1": "Űrlapmezők elemzése...",
"loader.stage2": "Nyelv észlelése...",
"loader.stage3": "Érzékeny mezők azonosítása...",
"loader.stage4": "Javaslatok előkészítése...",
"loader.stage5": "Majdnem kész!",

"button.startSpeaking": "Kezdj el beszélni",
"button.stopSpeaking": "Felvétel leállítása",
"button.tryAgain": "Próbáld újra",

"listening.title": "Hallgatás...",
"listening.subtitle":
  "Beszélj természetesen arról, amit ki szeretnél tölteni",
"processing.title": "Feldolgozás...",

// Dynamic progress stages for processing (voice->text->LLM)
"processing.stage1": "Beszéd szöveggé alakítása...",
"processing.stage2": "Nyelv észlelése...",
"processing.stage3": "Kérés megértése...",
"processing.stage4": "Adatok kinyerése...",
"processing.stage5": "Párosítás űrlapmezőkkel...",
"processing.stage6": "Adatok érvényesítése...",
"processing.stage7": "Eredmények előkészítése...",
"processing.stage8": "Majdnem kész!",

"success.title": "Űrlap kitöltve!",
"success.subtitle":
  "Ellenőrizd a kitöltött mezőket, és küldd el, ha készen állsz",
"success.apply_changes": "Kitöltés és ellenőrzés",
"success.empty_fields": "Nincs kitöltve",
"success.check_fields": "Ellenőrzés",
"success.filled_fields": "Befejezve",
"success.field_single": "mező",
"success.fields_multiple": "mező",
"success.require_attention": "figyelmet igényel",
"success.successfully_filled": "sikeresen kitöltve",

"empty.title": "Nem találhatók kitölthető mezők",
"empty.subtitle": "Ennek az űrlapnak nincsenek hanggal kitölthető mezői",

"error.title": "Hiba",
"error.microphone": "Mikrofonhozzáférés szükséges",
"error.noFields": "Nem található űrlap ezen az oldalon",
"error.noActiveForm": "Nem található aktív űrlap a kitöltéshez",
"error.lowConfidence":
  "Nem sikerült tisztán érteni a hangot. Kérlek, beszélj érthetőbben.",
"error.general": "Valami elromlott. Kérlek, próbáld újra.",
"error.domainNotAllowed":
  "Ez a domain nem jogosult a szolgáltatás használatára. Kérjük, vegye fel a kapcsolatot a weboldal adminisztrátorával.",
"error.invalidApiKey": "A szolgáltatás nincs megfelelően beállítva. Kérjük, lépjen kapcsolatba a webhely rendszergazdájával.",
"error.rateLimited": "A szolgáltatás jelenleg foglalt. Kérjük, próbálja újra egy pillanat múlva.",
"error.quotaExhausted": "A szolgáltatás használati korlátja elérve. Kérjük, lépjen kapcsolatba a webhely rendszergazdájával.",
"error.no_fields_detected":
  "Nem sikerült felismerni az űrlap kitöltéséhez szükséges információkat. Kérjük, próbálja meg világosabban megadni, hogy milyen adatokat kell beírni a mezőkbe.",
"error.no_data_title": "Az adatok nem voltak felismerhetők",
"error.mic_title": "Mikrofon szükséges",
"error.network_title": "Kapcsolati probléma",
"error.showDetails": "Technikai részletek megjelenítése",

"floatingButton.fillByVoice": "Kitöltés hanggal",

"form.progress.filled": "{count} kitöltött",
"form.progress.scrollToSelect": "Görgess a kiválasztáshoz",
"form.formNumber": "{current} / {total}",
"form.allForms": "Összes {count} űrlap",
"form.label": "Űrlap",
"form.fields": "Mezők",
"button.close": "Bezárás",
// Consent modal
"consent.title": "Az Ön Adatvédelme",
"consent.subtitle":
  "Kérjük, figyelmesen olvassa el az adatvédelmével kapcsolatos információkat",
"consent.warning_title": "Fontos: Ne Osszon Meg Érzékeny Adatokat",
"consent.warning":
  "Kérjük, ne említsen jelszavakat, fizetési adatokat, kormányzati azonosítókat vagy egészségügyi információkat. Ezeket az adatokat nem szabad a hangfunkció feldolgozására használni.",
"consent.summary_card1_title": "Mit Gyűjtünk",
"consent.summary_data1": "Hangfelvétel → szöveggé alakítva",
"consent.summary_data2":
  "Mezőnevek/típusok/helyőrzők (értékek nélkül; érzékeny mezők kizárva)",
"consent.summary_data3": "Technikai naplók (IP, böngésző információ)",
"consent.summary_card2_title": "Hová Kerül",
"consent.summary_transfer":
  "OpenAI (USA) AI feldolgozáshoz • Google Cloud/Firebase (EU, Lengyelország) tárhely és biztonság",
"consent.summary_card3_title": "Az Ön Jogai",
"consent.summary_rights":
  "Bármikor visszavonhatja hozzájárulását • Kérheti adataihoz való hozzáférést vagy azok törlését • Teljes részletek az <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Adatvédelmi Szabályzatban</a>",
"consent.full_details_title": "Teljes Részletek Olvasása",
"consent.section1_title": "Milyen adatokat dolgozunk fel?",
"consent.data1":
  "Hangfelvétel. Hangfájl elküldve az OpenAI Whispernek szerverünkön keresztül átíráshoz. A fájl nem kerül mentésre a szerveren feldolgozás után.",
"consent.data2":
  "Hangátirat (szöveg). Elküldve az OpenAI GPT-nek űrlapkitöltéshez. Alapértelmezés szerint nem mentjük az átiratot rendszereinkben; technikai naplókban csak metaadatokat tárolunk (szöveghossz, nyelv, időtartam). Fontos: Az OpenAI akár 30 napig tárolhatja a kérésadatokat visszaélések megelőzésére; korai törlés az OpenAI-nál nem elérhető; az adatokat nem használják modellképzéshez.",
"consent.data3":
  "Űrlapmező metaadatok. Nevek/típusok/helyőrzők (érzékeny mezők kizárva).",
"consent.data4":
  "Oldal URL. Infrastruktúránk dolgozza fel (kompatibilitás/diagnosztika), NEM küldjük el az OpenAI-nak. Kérjük, kerülje a személyes adatokat az URL lekérdezési paramétereiben.",
"consent.data5":
  "Böngésző User-Agent. Helyileg és infrastruktúránk használja (kompatibilitás/biztonság), NEM küldjük el az OpenAI-nak.",
"consent.data6":
  "IP-cím. A Google Cloud/Firebase infrastruktúra naplózza biztonság érdekében (legfeljebb 30 napig), NEM küldjük el az OpenAI-nak.",
"consent.section2_title":
  "Hová és milyen jogalappal kerülnek továbbításra az adatok?",
"consent.recipients":
  "Címzettek. OpenAI (USA) — hang/szöveg feldolgozás; Google Cloud/Firebase (EU/Lengyelország) — tárhely és biztonsági naplók. Az adatokat nem használják modellképzéshez.",
"consent.transfer1":
  "OpenAI (USA). Az OpenAI-hoz küldött kérések (beleértve a hangot/szöveget) az OpenAI akár 30 napig tárolhatja visszaélések megelőzésére; az adatokat nem használják modellképzéshez. USA-ba történő továbbítás — az Európai Bizottság által jóváhagyott SCC alapján.",
"consent.basis_title": "Jogalapok:",
"consent.basis1":
  "Hangfunkció — az Ön hozzájárulása (GDPR 6. cikk (1) bekezdés a) pont).",
"consent.basis2":
  "Technikai naplók (IP/UA/URL) — jogos érdekek (6. cikk (1) bekezdés f) pont) — biztonság és hibakeresés.",
"consent.section3_title": "Az Ön jogai",
"consent.rights1":
  "Bármikor visszavonhatja hozzájárulását a widget beállításaiban; ez nem érinti a visszavonás előtti feldolgozás jogszerűségét.",
"consent.rights2":
  "A hozzájárulás visszavonásán túl jogában áll kérni rendszereinkben tárolt adataihoz (technikai naplók, költségmutatók) való hozzáférést vagy azok törlését a webhely tulajdonosán keresztül. Teljes részletek az <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Adatvédelmi Szabályzatban</a>.",
"consent.rights3":
  "Ez a funkció 16 év feletti felhasználóknak szól; fiatalabb felhasználók esetén szülői/gondviselői hozzájárulás szükséges.",
"consent.footer_legal_title": "Jogi Információk",
"consent.footer_controller":
  "Adatkezelő: ennek a weboldalnak a tulajdonosa.",
"consent.footer_processor": "TypelessForm: adatfeldolgozóként jár el.",
"consent.footer_contact": "Adatvédelmi kapcsolat: info@webappski.com.",
"consent.footer_sccs":
  "Az USA-ba történő továbbítás SCC alapján történik. A részletek <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Adatvédelmi Szabályzatunkban</a> érhetők el.",
"consent.accept": "Elfogadom",

// Consent checkboxes
"consent.checkbox_main": "Hozzájárulok hangalapú és űrlap metaadataim TypelessForm általi feldolgozásához és az USA-ba (OpenAI) történő nemzetközi továbbításához SCC alapján, az <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>adatvédelmi irányelvekben</a> leírtak szerint.",
"consent.checkbox_age": "Megerősítem, hogy 16+ éves vagyok, vagy szülői/gyámi hozzájárulással rendelkezem.",

// Privacy settings / data deletion
"privacy.title": "Adatvédelem és adatok",
"privacy.subtitle": "Hozzájárulás és adatok kezelése",
"privacy.info_title": "Az Ön hozzájárulási rekordja",
"privacy.user_id": "Azonosító",
"privacy.consent_date": "Hozzájárulás megadva",
"privacy.policy_version": "Szabályzat verziója",
"privacy.usage_count": "Használatok száma",
"privacy.no_data": "Nem található hozzájárulási adat ezen az eszközön.",
"privacy.delete_title": "Adataim törlése",
"privacy.delete_description": "Ez véglegesen törli az összes hozzájárulási rekordot szervereinkről és törli a helyi adatokat. Ez a művelet nem vonható vissza.",
"privacy.delete_confirm": "Megértem, hogy ez végleges",
"privacy.delete_button": "Adataim törlése",
"privacy.deleting": "Törlés...",
"privacy.delete_success": "Minden adata sikeresen törölve.",
"privacy.delete_error": "Az adatok törlése sikertelen. Próbálja újra vagy írjon az info@webappski.com címre.",
"privacy.done": "Kész",
"privacy.link": "Adatvédelem"
};
