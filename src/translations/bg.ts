// BG translations
export const translations = {
"modal.title": "Разкажете ни за тези теми",
"modal.subtitle":
  "Разбираме всеки език, попълваме всичко и превеждаме при нужда",

"button.startSpeaking": "Започнете да говорите",
"button.stopSpeaking": "Спрете записа",
"button.tryAgain": "Опитайте отново",

"listening.title": "Слушам...",
"listening.subtitle":
  "Говорете естествено за това, което искате да попълните",
"processing.title": "Обработва се...",

"success.title": "Формата е попълнена!",
"success.subtitle":
  "Прегледайте попълнените полета и изпратете, когато сте готови",
"empty.title": "Не са намерени полета за попълване",
"empty.subtitle": "Този формуляр няма полета, които могат да бъдат попълнени с глас",

"error.title": "Грешка",
"error.microphone": "Изисква се достъп до микрофон",
"error.noFields": "Не са открити форми на тази страница",
"error.general": "Нещо се обърка. Моля, опитайте отново.",
"error.domainNotAllowed":
  "Този домейн не е упълномощен да използва услугата. Моля, свържете се с администратора на уебсайта.",
"error.invalidApiKey": "Услугата не е конфигурирана правилно. Свържете се с администратора на сайта.",
"error.rateLimited": "Услугата е натоварена в момента. Опитайте отново след минута.",
"error.quotaExhausted": "Лимитът за използване на тази услуга е достигнат. Свържете се с администратора на сайта.",
"error.no_fields_detected":
  "Не можа да се разпознае информацията за попълване на формата. Моля, опитайте да посочите по-ясно какви данни трябва да бъдат въведени в полетата.",
"error.no_data_title": "Данните не са разпознати",
"error.mic_title": "Необходим микрофон",
"error.network_title": "Проблем с връзката",
"error.showDetails": "Покажи технически подробности",

"floatingButton.fillByVoice": "Попълнете с глас",

"form.progress.filled": "{count} попълнени",
"form.progress.scrollToSelect": "Превъртете за избор",
"form.formNumber": "{current} от {total}",
"form.allForms": "Всички {count} формуляра",
"form.label": "Формуляр",
"form.fields": "Полета",

"loader.initial": "Подготовка на формата...",

// Dynamic progress stages for initAnalyze loading
"loader.stage1": "Анализ на полета на формата...",
"loader.stage2": "Разпознаване на език...",
"loader.stage3": "Идентифициране на чувствителни полета...",
"loader.stage4": "Подготовка на предложения...",
"loader.stage5": "Почти готово!",

// Dynamic progress stages for processing (voice->text->LLM)
"processing.stage1": "Преобразуване на реч в текст...",
"processing.stage2": "Разпознаване на език...",
"processing.stage3": "Разбиране на заявката ви...",
"processing.stage4": "Извличане на данни...",
"processing.stage5": "Съпоставяне с полета на формуляр...",
"processing.stage6": "Валидиране на данни...",
"processing.stage7": "Подготовка на резултати...",
"processing.stage8": "Почти готово!",

"success.apply_changes": "Попълни и провери",
"success.empty_fields": "Непопълнено",
"success.check_fields": "Проверете",
"success.filled_fields": "Завършено",
"success.field_single": "поле",
"success.fields_multiple": "полета",
"success.require_attention": "изискват внимание",
"success.successfully_filled": "успешно попълнено",

"error.noActiveForm": "Не е намерена активна форма за попълване",
"error.lowConfidence":
  "Не можах да разбера ясно аудиото. Моля, говорете по-ясно.",
"button.close": "Затвори",
// Consent modal
"consent.title": "Вашата Поверителност на Данните",
"consent.subtitle":
  "Моля, прочетете внимателно информацията за защитата на вашите данни",
"consent.warning_title": "Важно: Не Споделяйте Чувствителни Данни",
"consent.warning":
  "Моля, не споменавайте пароли, платежни данни, правителствени идентификатори или медицинска информация. Тези данни не са предназначени за обработка от гласовата функция.",
"consent.summary_card1_title": "Какво Събираме",
"consent.summary_data1": "Гласов запис → преобразуван в текст",
"consent.summary_data2":
  "Имена/типове/заместители на полета (без стойности; чувствителни полета изключени)",
"consent.summary_data3":
  "Технически регистрационни файлове (IP, информация за браузъра)",
"consent.summary_card2_title": "Къде Отива",
"consent.summary_transfer":
  "OpenAI (САЩ) за AI обработка • Google Cloud/Firebase (ЕС, Полша) за хостинг и сигурност",
"consent.summary_card3_title": "Вашите Права",
"consent.summary_rights":
  "Оттегляне на съгласието по всяко време • Заявка за достъп или изтриване на вашите данни • Пълни подробности в <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Политиката за поверителност</a>",
"consent.full_details_title": "Прочетете Пълните Подробности",
"consent.section1_title": "Какви данни обработваме?",
"consent.data1":
  "Гласов запис. Аудио файл, изпратен до OpenAI Whisper чрез нашия сървър за транскрипция. Файлът не се съхранява на сървъра след обработката.",
"consent.data2":
  "Гласова транскрипция (текст). Изпратена до OpenAI GPT за попълване на формуляри. По подразбиране не запазваме транскрипцията в нашите системи; в технически регистрационни файлове съхраняваме само метаданни (дължина на текста, език, продължителност). Важно: OpenAI може да съхранява данни от заявки до 30 дни за предотвратяване на злоупотреби; ранното изтриване в OpenAI не е налично; данните не се използват за обучение на модели.",
"consent.data3":
  "Метаданни на полета от формуляри. Имена/типове/заместители (чувствителни полета изключени).",
"consent.data4":
  "URL на страницата. Обработен от нашата инфраструктура (за съвместимост/диагностика), НЕ се изпраща до OpenAI. Моля, избягвайте лични данни в URL параметри на заявката.",
"consent.data5":
  "User-Agent на браузъра. Използван локално и от нашата инфраструктура (съвместимост/сигурност), НЕ се изпраща до OpenAI.",
"consent.data6":
  "IP адрес. Регистриран от инфраструктурата на Google Cloud/Firebase за сигурност (до 30 дни), НЕ се изпраща до OpenAI.",
"consent.section2_title":
  "Къде и на каква правна основа се прехвърлят данните?",
"consent.recipients":
  "Получатели. OpenAI (САЩ) — обработка на аудио/текст; Google Cloud/Firebase (ЕС/Полша) — хостинг и регистрационни файлове за сигурност. Данните не се използват за обучение на модели.",
"consent.transfer1":
  "OpenAI (САЩ). Заявките към OpenAI (включително аудио/текст) могат да бъдат съхранявани от OpenAI до 30 дни за предотвратяване на злоупотреби; данните не се използват за обучение на модели. Прехвърляне към САЩ — на основата на SCC, одобрени от Европейската комисия.",
"consent.basis_title": "Правни основания:",
"consent.basis1":
  "Гласова функция — вашето съгласие (чл. 6, пар. 1, буква а) от GDPR).",
"consent.basis2":
  "Технически регистрационни файлове (IP/UA/URL) — законни интереси (чл. 6, пар. 1, буква е)) — сигурност и отстраняване на грешки.",
"consent.section3_title": "Вашите права",
"consent.rights1":
  "Можете да оттеглите съгласието в настройките на джаджата по всяко време; това не засяга законността на обработката преди оттеглянето.",
"consent.rights2":
  "В допълнение към оттеглянето на съгласието имате право да поискате достъп или изтриване на вашите данни, съхранявани в нашите системи (технически регистрационни файлове, показатели за разходи) чрез собственика на уебсайта. Пълни подробности в <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Политиката за поверителност</a>.",
"consent.rights3":
  "Тази функция е предназначена за потребители на 16+; за по-млади потребители се изисква съгласие от родител/настойник.",
"consent.footer_legal_title": "Правна Информация",
"consent.footer_controller":
  "Администратор на данни: собственикът на този уебсайт.",
"consent.footer_processor":
  "TypelessForm: действа като обработващ данни.",
"consent.footer_contact": "Контакт за поверителност: info@webappski.com.",
"consent.footer_sccs":
  "Прехвърлянето към САЩ се извършва съгласно SCC. Подробности са налични в нашата <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Политика за поверителност</a>.",
"consent.accept": "Приемам",

// Consent checkboxes
"consent.checkbox_main": "Съгласявам се с обработката на моите гласови данни и метаданни на формуляра от TypelessForm и с международния трансфер към САЩ (OpenAI) съгласно SCC, както е описано в <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Политиката за поверителност</a>.",
"consent.checkbox_age": "Потвърждавам, че съм на 16+ години или имам съгласие от родител/настойник.",

// Privacy settings / data deletion
"privacy.title": "Поверителност и данни",
"privacy.subtitle": "Управлявайте съгласието и данните си",
"privacy.info_title": "Вашият запис за съгласие",
"privacy.user_id": "Идентификатор",
"privacy.consent_date": "Съгласие дадено",
"privacy.policy_version": "Версия на политиката",
"privacy.usage_count": "Брой използвания",
"privacy.no_data": "Не са намерени данни за съгласие на това устройство.",
"privacy.delete_title": "Изтриване на данните ми",
"privacy.delete_description": "Това ще изтрие завинаги всички ваши записи за съгласие от нашите сървъри и ще изчисти локалните данни. Това действие не може да бъде отменено.",
"privacy.delete_confirm": "Разбирам, че е необратимо",
"privacy.delete_button": "Изтрий данните ми",
"privacy.deleting": "Изтриване...",
"privacy.delete_success": "Всички ваши данни бяха успешно изтрити.",
"privacy.delete_error": "Неуспешно изтриване на данните. Опитайте отново или пишете на info@webappski.com.",
"privacy.done": "Готово",
"privacy.link": "Поверителност"
};
