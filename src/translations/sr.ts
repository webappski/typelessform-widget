// SR translations
export const translations = {
"modal.title": "Reci nam o ovim temama",
"modal.subtitle":
  "Razumemo sve jezike, popunimo sve i prevedemo po potrebi",

"button.startSpeaking": "Počni da govoriš",
"button.stopSpeaking": "Zaustavi snimanje",
"button.tryAgain": "Pokušaj ponovo",

"listening.title": "Slušam...",
"listening.subtitle": "Prirodno govori o tome šta želiš da popuniš",
"processing.title": "Obrađujem...",

"success.title": "Obrazac popunjen!",
"success.subtitle": "Pregledaj popunjena polja i pošalji kada si spreman",
"empty.title": "Нису пронађена поља за попуњавање",
"empty.subtitle": "Овај формулар нема поља која се могу попунити гласом",

"error.title": "Грешка",
"error.microphone": "Potreban pristup mikrofonu",
"error.noFields": "Na ovoj stranici nisu pronađeni obrasci",
"error.general": "Nešto je pošlo po zlu. Molim pokušaj ponovo.",
"error.domainNotAllowed":
  "Ovaj domen nije ovlašćen da koristi uslugu. Molimo kontaktiraj administratora web sajta.",
"error.invalidApiKey": "Услуга није правилно конфигурисана. Контактирајте администратора веб-сајта.",
"error.rateLimited": "Услуга је тренутно заузета. Покушајте поново за тренутак.",
"error.quotaExhausted": "Ограничење коришћења ове услуге је достигнуто. Контактирајте администратора веб-сајта.",
"error.no_fields_detected":
  "Nije moguće prepoznati informacije za popunjavanje obrasca. Molimo pokušajte jasnije navesti koje podatke treba uneti u polja.",
"error.no_data_title": "Podaci nisu prepoznati",
"error.mic_title": "Потребан микрофон",
"error.network_title": "Проблем са повезивањем",
"error.showDetails": "Prikaži tehničke detalje",

"floatingButton.fillByVoice": "Popuni glasom",

"form.progress.filled": "{count} popunjeno",
"form.progress.scrollToSelect": "Skroluj za odabir",
"form.formNumber": "{current} od {total}",
"form.allForms": "Svi {count} obrasci",
"form.label": "Obrazac",
"form.fields": "Polja",

"loader.initial": "Priprema obrasca...",

// Dynamic progress stages for initAnalyze loading
"loader.stage1": "Анализа поља обрасца...",
"loader.stage2": "Откривање језика...",
"loader.stage3": "Идентификација осетљивих поља...",
"loader.stage4": "Припрема предлога...",
"loader.stage5": "Скоро готово!",

// Dynamic progress stages for processing (voice->text->LLM)
"processing.stage1": "Претварање говора у текст...",
"processing.stage2": "Откривање језика...",
"processing.stage3": "Разумевање вашег захтева...",
"processing.stage4": "Издвајање података...",
"processing.stage5": "Усклађивање са пољима обрасца...",
"processing.stage6": "Провера података...",
"processing.stage7": "Припрема резултата...",
"processing.stage8": "Скоро готово!",

"success.apply_changes": "Popuni i proveri",
"success.empty_fields": "Није попуњено",
"success.check_fields": "Провери",
"success.filled_fields": "Завршено",
"success.field_single": "поље",
"success.fields_multiple": "поља",
"success.require_attention": "захтевају пажњу",
"success.successfully_filled": "успешно попуњено",

"error.noActiveForm": "Nije pronađen aktivan obrazac za popunjavanje",
"error.lowConfidence":
  "Nisam mogao jasno da razumem zvuk. Molimo govorite jasnije.",
"button.close": "Zatvori",
// Consent modal
"consent.title": "Ваша Приватност Података",
"consent.subtitle":
  "Молимо пажљиво прочитајте информације о заштити ваших података",
"consent.warning_title": "Важно: Не Делите Осетљиве Податке",
"consent.warning":
  "Молимо не помињите лозинке, детаље плаћања, државне идентификаторе или медицинске информације. Ти подаци нису намењени обради гласовном функцијом.",
"consent.summary_card1_title": "Шта Прикупљамо",
"consent.summary_data1": "Гласовни снимак → претворено у текст",
"consent.summary_data2":
  "Називи/типови/заменски знакови поља (без вредности; осетљива поља искључена)",
"consent.summary_data3": "Технички записи (IP, информације прегледача)",
"consent.summary_card2_title": "Где Иде",
"consent.summary_transfer":
  "OpenAI (САД) за AI обраду • Google Cloud/Firebase (ЕУ, Пољска) за хостинг и безбедност",
"consent.summary_card3_title": "Ваша Права",
"consent.summary_rights":
  "Повуците пристанак било када • Затражите приступ или брисање ваших података • Потпуни детаљи у <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Политици приватности</a>",
"consent.full_details_title": "Прочитајте Потпуне Детаље",
"consent.section1_title": "Које податке обрађујемо?",
"consent.data1":
  "Гласовни снимак. Аудио датотека послата OpenAI Whisper-у преко нашег сервера за транскрипцију. Датотека се не чува на серверу након обраде.",
"consent.data2":
  "Гласовна транскрипција (текст). Послато OpenAI GPT-у за попуњавање образаца. Према подразумеваним подешавањима не чувамо транскрипцију у нашим системима; у техничким записима чувамо само метаподатке (дужина текста, језик, трајање). Важно: OpenAI може похранити податке захтева до 30 дана како би спречио злоупотребу; рано брисање у OpenAI-у није доступно; подаци се не користе за обуку модела.",
"consent.data3":
  "Метаподаци поља обрасца. Називи/типови/заменски знакови (осетљива поља искључена).",
"consent.data4":
  "URL странице. Обрађен нашом инфраструктуром (за компатибилност/дијагностику), НИЈЕ послат OpenAI-у. Молимо избегавајте личне податке у параметрима упита URL-а.",
"consent.data5":
  "User-Agent прегледача. Користи се локално и нашом инфраструктуром (компатибилност/безбедност), НИЈЕ послат OpenAI-у.",
"consent.data6":
  "IP адреса. Забележена инфраструктуром Google Cloud/Firebase ради безбедности (до 30 дана), НИЈЕ послата OpenAI-у.",
"consent.section2_title":
  "Где и на којој правној основи се преносе подаци?",
"consent.recipients":
  "Примаоци. OpenAI (САД) — обрада звука/текста; Google Cloud/Firebase (ЕУ/Пољска) — хостинг и записи безбедности. Подаци се не користе за обуку модела.",
"consent.transfer1":
  "OpenAI (САД). Захтеви OpenAI-у (укључујући звук/текст) могу бити похрањени од стране OpenAI-а до 30 дана како би се спречила злоупотреба; подаци се не користе за обуку модела. Пренос у САД — на основу SCC-а одобрених од стране Европске комисије.",
"consent.basis_title": "Правне основе:",
"consent.basis1":
  "Гласовна функција — ваш пристанак (чл. 6 ст. 1 тач. а) GDPR-а).",
"consent.basis2":
  "Технички записи (IP/UA/URL) — легитимни интереси (чл. 6 ст. 1 тач. ф)) — безбедност и отклањање грешака.",
"consent.section3_title": "Ваша права",
"consent.rights1":
  "Пристанак можете повући у подешавањима виџета било када; то не утиче на законитост обраде пре повлачења.",
"consent.rights2":
  "Осим повлачења пристанка, имате право затражити приступ или брисање ваших података похрањених у нашим системима (технички записи, метрику трошкова) преко власника веб странице. Потпуни детаљи у <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Политици приватности</a>.",
"consent.rights3":
  "Ова функција је намењена корисницима од 16+; за млађе кориснике потребан је пристанак родитеља/старатеља.",
"consent.footer_legal_title": "Правне Информације",
"consent.footer_controller": "Руковалац обраде: власник ове веб странице.",
"consent.footer_processor": "TypelessForm: делује као извршилац обраде.",
"consent.footer_contact": "Контакт за приватност: info@webappski.com.",
"consent.footer_sccs":
  "Пренос у САД спроводи се према SCC-у. Детаљи су доступни у нашој <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Политици приватности</a>.",
"consent.accept": "Прихватам",

// Consent checkboxes
"consent.checkbox_main": "Пристајем на обраду мојих гласовних података и метаподатака обрасца од стране TypelessForm и на међународни пренос у САД (OpenAI) у складу са SCC-има, како је описано у <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Политици приватности</a>.",
"consent.checkbox_age": "Потврђујем да имам 16+ година или имам пристанак родитеља/старатеља.",

// Privacy settings / data deletion
"privacy.title": "Приватност и подаци",
"privacy.subtitle": "Управљајте сагласношћу и подацима",
"privacy.info_title": "Ваш запис сагласности",
"privacy.user_id": "Идентификатор",
"privacy.consent_date": "Сагласност дата",
"privacy.policy_version": "Верзија политике",
"privacy.usage_count": "Број коришћења",
"privacy.no_data": "Подаци о сагласности нису пронађени на овом уређају.",
"privacy.delete_title": "Обриши моје податке",
"privacy.delete_description": "Ово ће трајно обрисати све ваше записе о сагласности са наших сервера и очистити локалне податке. Ова радња се не може поништити.",
"privacy.delete_confirm": "Разумем да је ово трајно",
"privacy.delete_button": "Обриши моје податке",
"privacy.deleting": "Брисање...",
"privacy.delete_success": "Сви ваши подаци су успешно обрисани.",
"privacy.delete_error": "Није могуће обрисати податке. Покушајте поново или контактирајте info@webappski.com.",
"privacy.done": "Готово",
"privacy.link": "Приватност"
};
