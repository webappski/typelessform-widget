// UK translations
export const translations = {
"modal.title": "Розкажіть нам про ці теми",
"modal.subtitle":
  "Ми розуміємо будь-яку мову, заповнюємо все і, за потреби, перекладаємо",

"button.startSpeaking": "Почніть говорити",
"button.stopSpeaking": "Зупиніть запис",
"button.tryAgain": "Спробуйте ще раз",

"listening.title": "Слухаю...",
"listening.subtitle": "Говоріть природно про те, що хочете заповнити",

"processing.title": "Обробка...",

"success.title": "Форму заповнено!",
"success.subtitle":
  "Перегляньте заповнені поля та надішліть, коли будете готові",

"error.title": "Помилка",
"error.microphone": "Потрібен доступ до мікрофона",
"error.noFields": "Не виявлено форм на цій сторінці",
"error.general": "Щось пішло не так. Будь ласка, спробуйте ще раз.",
"error.domainNotAllowed":
  "Цей домен не авторизований для використання сервісу. Будь ласка, зверніться до адміністратора веб-сайту.",
"error.invalidApiKey": "Сервіс налаштований некоректно. Зверніться до адміністратора сайту.",
"error.rateLimited": "Сервіс зараз перевантажений. Спробуйте через хвилину.",
"error.quotaExhausted": "Ліміт використання цього сервісу вичерпано. Зверніться до адміністратора сайту.",
"error.no_fields_detected":
  "Не вдалося розпізнати інформацію для заповнення форми. Спробуйте чіткіше вказати, які дані потрібно ввести в поля.",
"error.no_data_title": "Дані не розпізнано",
"error.mic_title": "Потрібен мікрофон",
"error.network_title": "Проблема з підключенням",
"error.showDetails": "Показати технічні деталі",

"floatingButton.fillByVoice": "Заповнити голосом",

"form.progress.filled": "{count} заповнено",
"form.progress.scrollToSelect": "Прокрутіть для вибору",
"form.formNumber": "{current} з {total}",
"form.allForms": "Усі {count} форми",
"form.label": "Форма",
"form.fields": "Поля",

"loader.initial": "Підготовка форми...",

// Dynamic progress stages for initAnalyze loading
"loader.stage1": "Аналіз полів форми...",
"loader.stage2": "Визначення мови...",
"loader.stage3": "Ідентифікація чутливих полів...",
"loader.stage4": "Підготовка пропозицій...",
"loader.stage5": "Майже готово!",

// Dynamic progress stages for processing (voice->text->LLM)
"processing.stage1": "Перетворення мовлення на текст...",
"processing.stage2": "Визначення мови...",
"processing.stage3": "Розуміння вашого запиту...",
"processing.stage4": "Витягування даних...",
"processing.stage5": "Зіставлення з полями форми...",
"processing.stage6": "Перевірка даних...",
"processing.stage7": "Підготовка результатів...",
"processing.stage8": "Майже готово!",

// Stepper steps (4 steps mapped from 8 backend stages)
"processing.step1": "Перетворення мовлення в текст",
"processing.step2": "Розуміння вашого запиту",
"processing.step3": "Зіставлення з полями форми",
"processing.step4": "Підготовка результатів",

"success.apply_changes": "Заповнити та перевірити",
"success.empty_fields": "Незаповнено",
"success.check_fields": "Перевірити",
"success.filled_fields": "Завершено",
"success.field_single": "поле",
"success.fields_multiple": "поля",
"success.require_attention": "потребують уваги",
"success.successfully_filled": "успішно заповнено",

"empty.title": "Поля для заповнення не знайдено",
"empty.subtitle": "Ця форма не має полів, які можна заповнити голосом",

"error.noActiveForm": "Не знайдено активної форми для заповнення",
"error.lowConfidence":
  "Не вдалося чітко розпізнати мову. Будь ласка, говоріть виразніше.",
"button.close": "Закрити",
// Consent modal
"consent.title": "Ваша Конфіденційність Даних",
"consent.subtitle":
  "Будь ласка, уважно прочитайте інформацію про захист ваших даних",
"consent.warning_title": "Важливо: Не Діліться Конфіденційними Даними",
"consent.warning":
  "Будь ласка, не називайте паролі, платіжні дані, державні ідентифікатори або медичну інформацію. Ці дані не призначені для обробки голосовою функцією.",
"consent.summary_card1_title": "Що Ми Збираємо",
"consent.summary_data1": "Голосовий запис → перетворено на текст",
"consent.summary_data2":
  "Назви/типи/замінники полів (без значень; конфіденційні поля виключені)",
"consent.summary_data3": "Технічні журнали (IP, інформація браузера)",
"consent.summary_card2_title": "Куди Йде",
"consent.summary_transfer":
  "OpenAI (США) для обробки AI • Google Cloud/Firebase (ЄС, Польща) для хостингу та безпеки",
"consent.summary_card3_title": "Ваші Права",
"consent.summary_rights":
  "Відкликати згоду будь-коли • Запросити доступ або видалення ваших даних • Повні деталі в <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Політиці конфіденційності</a>",
"consent.full_details_title": "Прочитати Повні Деталі",
"consent.section1_title": "Які дані ми обробляємо?",
"consent.data1":
  "Голосовий запис. Аудіофайл надіслано до OpenAI Whisper через наш сервер для транскрипції. Файл не зберігається на сервері після обробки.",
"consent.data2":
  "Голосова транскрипція (текст). Надіслано до OpenAI GPT для заповнення форм. За замовчуванням ми не зберігаємо транскрипцію в наших системах; у технічних журналах ми зберігаємо лише метадані (довжина тексту, мова, тривалість). Важливо: OpenAI може зберігати дані запитів до 30 днів для запобігання зловживанням; раннє видалення в OpenAI недоступне; дані не використовуються для навчання моделей.",
"consent.data3":
  "Метадані полів форми. Назви/типи/замінники (конфіденційні поля виключені).",
"consent.data4":
  "URL сторінки. Оброблено нашою інфраструктурою (для сумісності/діагностики), НЕ надіслано до OpenAI. Будь ласка, уникайте особистих даних у параметрах запиту URL.",
"consent.data5":
  "User-Agent браузера. Використовується локально та нашою інфраструктурою (сумісність/безпека), НЕ надіслано до OpenAI.",
"consent.data6":
  "IP-адреса. Записано інфраструктурою Google Cloud/Firebase для безпеки (до 30 днів), НЕ надіслано до OpenAI.",
"consent.section2_title":
  "Куди і на якій правовій підставі передаються дані?",
"consent.recipients":
  "Одержувачі. OpenAI (США) — обробка аудіо/тексту; Google Cloud/Firebase (ЄС/Польща) — хостинг та журнали безпеки. Дані не використовуються для навчання моделей.",
"consent.transfer1":
  "OpenAI (США). Запити до OpenAI (включаючи аудіо/текст) можуть зберігатися OpenAI до 30 днів для запобігання зловживанням; дані не використовуються для навчання моделей. Передача до США — на основі SCC, схвалених Європейською комісією.",
"consent.basis_title": "Правові підстави:",
"consent.basis1": "Голосова функція — ваша згода (ст. 6(1)(a) GDPR).",
"consent.basis2":
  "Технічні журнали (IP/UA/URL) — законні інтереси (ст. 6(1)(f)) — безпека та налагодження.",
"consent.section3_title": "Ваші права",
"consent.rights1":
  "Ви можете відкликати згоду в налаштуваннях віджета будь-коли; це не впливає на законність обробки до відкликання.",
"consent.rights2":
  "Окрім відкликання згоди, ви маєте право запросити доступ або видалення ваших даних, що зберігаються в наших системах (технічні журнали, показники витрат) через власника веб-сайту. Повні деталі в <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Політиці конфіденційності</a>.",
"consent.rights3":
  "Ця функція призначена для користувачів 16+; для молодших користувачів потрібна згода батьків/опікуна.",
"consent.footer_legal_title": "Правова Інформація",
"consent.footer_controller": "Контролер даних: власник цього веб-сайту.",
"consent.footer_processor": "TypelessForm: діє як обробник.",
"consent.footer_contact":
  "Контакт з питань конфіденційності: info@webappski.com.",
"consent.footer_sccs":
  "Передача до США здійснюється відповідно до SCC. Деталі доступні в нашій <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Політиці конфіденційності</a>.",
"consent.accept": "Приймаю",

// Consent checkboxes
"consent.checkbox_main": "Я надаю згоду на обробку моїх голосових даних і метаданих форми компанією TypelessForm та на міжнародну передачу до США (OpenAI) відповідно до SCC, як описано в <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Політиці конфіденційності</a>.",
"consent.checkbox_age": "Я підтверджую, що мені 16+ років або я маю згоду батьків/опікуна.",

// Privacy settings / data deletion
"privacy.title": "Конфіденційність та дані",
"privacy.subtitle": "Керуйте згодою та даними",
"privacy.info_title": "Ваш запис згоди",
"privacy.user_id": "Ідентифікатор",
"privacy.consent_date": "Згода надана",
"privacy.policy_version": "Версія політики",
"privacy.usage_count": "Кількість використань",
"privacy.no_data": "Дані про згоду не знайдені на цьому пристрої.",
"privacy.delete_title": "Видалити мої дані",
"privacy.delete_description": "Це назавжди видалить усі ваші записи згоди з наших серверів та очистить локальні дані. Цю дію не можна скасувати.",
"privacy.delete_confirm": "Я розумію, що це незворотньо",
"privacy.delete_button": "Видалити мої дані",
"privacy.deleting": "Видалення...",
"privacy.delete_success": "Усі ваші дані успішно видалені.",
"privacy.delete_error": "Не вдалося видалити дані. Спробуйте знову або напишіть на info@webappski.com.",
"privacy.done": "Готово",
"privacy.link": "Конфіденційність"
};
