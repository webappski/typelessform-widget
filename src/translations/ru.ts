// RU translations
export const translations = {
"modal.title": "Расскажите об этих темах",
"modal.subtitle":
  "Мы поймём любой язык, всё заполним и, если нужно, переведём",
"loader.initial": "Подготовка формы...",

// Dynamic progress stages for initAnalyze loading
"loader.stage1": "Анализирую поля формы...",
"loader.stage2": "Определяю язык...",
"loader.stage3": "Определяю чувствительные поля...",
"loader.stage4": "Подготавливаю предложения...",
"loader.stage5": "Почти готово!",

"button.startSpeaking": "Начните говорить",
"button.stopSpeaking": "Остановить запись",
"button.tryAgain": "Попробовать снова",

"listening.title": "Слушаю...",
"listening.subtitle": "Говорите естественно о том, что нужно заполнить",
"processing.title": "Обрабатываю...",

// Dynamic progress stages for processing (voice->text->LLM)
"processing.stage1": "Преобразую речь в текст...",
"processing.stage2": "Распознаю язык...",
"processing.stage3": "Понимаю ваш запрос...",
"processing.stage4": "Извлекаю данные...",
"processing.stage5": "Сопоставляю с полями формы...",
"processing.stage6": "Проверяю корректность...",
"processing.stage7": "Подготавливаю результат...",
"processing.stage8": "Почти готово!",

// Stepper steps (4 steps mapped from 8 backend stages)
"processing.step1": "Преобразование речи в текст",
"processing.step2": "Понимание вашего запроса",
"processing.step3": "Сопоставление с полями формы",
"processing.step4": "Подготовка результатов",

"success.title": "Форма заполнена!",
"success.subtitle": "Проверьте заполненные поля и отправьте",
"success.apply_changes": "Заполнить и проверить",
"success.legend_filled": "Заполнено",
"success.legend_check": "Требует проверки",
"success.legend_empty": "Не заполнено",
"success.empty_fields": "Не заполнено",
"success.check_fields": "Проверьте",
"success.filled_fields": "Готово",
"success.field_single": "поле",
"success.fields_multiple": "поля",
"success.require_attention": "требуют внимания",
"success.successfully_filled": "успешно заполнено",

"empty.title": "Заполняемые поля не найдены",
"empty.subtitle": "В этой форме нет полей, которые можно заполнить голосом",

"error.title": "Ошибка",
"error.microphone": "Требуется доступ к микрофону",
"error.noFields": "Формы не обнаружены на этой странице",
"error.noActiveForm": "Не найдена активная форма для заполнения",
"error.lowConfidence":
  "Не удалось четко распознать речь. Пожалуйста, говорите более отчетливо.",
"error.general": "Что-то пошло не так. Попробуйте еще раз.",
"error.domainNotAllowed":
  "Этот домен не авторизован для использования сервиса. Обратитесь к администратору сайта.",
"error.serviceUnavailable":
  "Сервис временно недоступен. Пожалуйста, попробуйте позже или обратитесь к администратору сайта.",
"error.invalidApiKey":
  "Сервис некорректно настроен. Обратитесь к администратору сайта.",
"error.rateLimited": "Сервис сейчас перегружен. Попробуйте через минуту.",
"error.quotaExhausted": "Лимит использования сервиса исчерпан. Обратитесь к администратору сайта.",
"error.no_fields_detected":
  "Не удалось распознать информацию для заполнения формы. Попробуйте четче указать, какие данные нужно ввести в поля.",
"error.no_data_title": "Данные не распознаны",
"error.mic_title": "Требуется микрофон",
"error.network_title": "Проблема соединения",
"error.showDetails": "Показать технические детали",

"floatingButton.fillByVoice": "Заполнить голосом",

"form.progress.filled": "{count} заполнено",
"form.progress.scrollToSelect": "Прокрутите для выбора",
"form.formNumber": "{current} из {total}",
"form.allForms": "Все {count} формы",
"form.label": "Форма",
"form.fields": "Поля",

"button.close": "Закрыть",

// Consent modal
"consent.title": "Конфиденциальность ваших данных",
"consent.subtitle":
  "Пожалуйста, внимательно прочитайте информацию о защите ваших данных",

// Anti-PII warning (hero banner)
"consent.warning_title": "Важно: Не сообщайте конфиденциальные данные",
"consent.warning":
  "Пожалуйста, не произносите пароли, платёжные данные, гос-идентификаторы и медицинскую информацию. Эти данные не предназначены для обработки голосовой функцией.",

// Summary cards (always visible)
"consent.summary_card1_title": "Что мы собираем",
"consent.summary_data1": "Голосовая запись → преобразуется в текст",
"consent.summary_data2":
  "Названия/типы/подсказки полей (без значений; чувствительные поля исключаем)",
"consent.summary_data3": "Технические логи (IP, информация о браузере)",

"consent.summary_card2_title": "Куда передаются данные",
"consent.summary_transfer":
  "OpenAI (США) для AI-обработки • Google Cloud/Firebase (ЕС, Польша) для хостинга и безопасности",

"consent.summary_card3_title": "Ваши права",
"consent.summary_rights":
  "Отозвать согласие в любой момент • Запросить доступ или удаление ваших данных • Подробности в <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Политике конфиденциальности</a>",

// Full details accordion
"consent.full_details_title": "Читать полные детали",

// Section 1: What data we process
"consent.section1_title": "Какие данные мы обрабатываем?",
"consent.data1":
  "Голосовая запись. Аудиофайл отправляется на OpenAI Whisper через наш сервер для транскрибации. Файл не сохраняется на сервере после обработки.",
"consent.data2":
  "Транскрипт голоса (текст). Отправляется в OpenAI GPT для заполнения формы. Мы не храним транскрипт на наших серверах; он обрабатывается в памяти и удаляется после ответа. Мы логируем только технические метаданные (длина, язык, длительность). Важно: OpenAI может хранить данные запроса до 30 дней для предотвращения злоупотреблений; досрочное удаление у OpenAI недоступно; данные не используются для обучения моделей.",
"consent.data3":
  "Метаданные полей формы. Названия/типы/подсказки (чувствительные поля исключаем).",
"consent.data4":
  "URL страницы. Обрабатывается нашей инфраструктурой (для совместимости/диагностики), в OpenAI не передаётся. Пожалуйста, избегайте персональных данных в query-параметрах URL.",
"consent.data5":
  "User-Agent браузера. Используется локально и нашей инфраструктурой (совместимость/безопасность), в OpenAI не передаётся.",
"consent.data6":
  "IP-адрес. Логируется инфраструктурой Google Cloud/Firebase для безопасности (до 30 дней), в OpenAI не передаётся.",

// Section 2: Where and on what basis
"consent.section2_title": "Куда и на каком основании передаются данные?",
"consent.recipients":
  "Получатели. OpenAI (США) — обработка аудио/текста; Google Cloud/Firebase (ЕС/Польша) — хостинг и логи безопасности. Данные не используются для обучения моделей.",
"consent.transfer1":
  "OpenAI (США). Запросы к OpenAI (включая аудио/текст) могут храниться у OpenAI до 30 дней для предотвращения злоупотреблений; данные не используются для обучения моделей. Передача в США — на основе SCCs, утверждённых Европейской Комиссией.",
"consent.basis_title": "Правовые основания:",
"consent.basis1": "Голосовая функция — ваше согласие (Art. 6(1)(a) GDPR).",
"consent.basis2":
  "Технические логи (IP/UA/URL) — законные интересы (Art. 6(1)(f)) — безопасность и отладка.",

// Section 3: Your rights
"consent.section3_title": "Ваши права",
"consent.rights1":
  "Вы можете отозвать согласие в настройках виджета в любой момент; это не влияет на законность обработки до отзыва.",
"consent.rights2":
  "Кроме отзыва согласия, вы имеете право запросить доступ или удаление ваших данных, хранящихся в наших системах (технические логи и метрики использования), через владельца сайта. Подробности в <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Политике конфиденциальности</a>.",
"consent.rights3":
  "Функция предназначена для пользователей 16+; для младше требуется согласие родителя/опекуна.",

// Footer legal info
"consent.footer_legal_title": "Юридическая информация",
"consent.footer_controller": "Контроллер данных: владелец этого сайта.",
"consent.footer_processor":
  "TypelessForm: выступает как обработчик (processor).",
"consent.footer_contact": "Контакты по приватности: info@webappski.com.",
"consent.footer_sccs":
  "Передача в США осуществляется по SCCs. С деталями можно ознакомиться в нашей <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Политике конфиденциальности</a>.",

"consent.accept": "Принимаю",

// Consent checkboxes
"consent.checkbox_main": "Я даю согласие на обработку моих голосовых данных и метаданных формы компанией TypelessForm, а также на международную передачу в США (OpenAI) на основе SCCs, как описано в <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Политике конфиденциальности</a>.",
"consent.checkbox_age": "Я подтверждаю, что мне 16+ лет или у меня есть согласие родителя/опекуна.",

// Privacy settings / data deletion
"privacy.title": "Конфиденциальность и данные",
"privacy.subtitle": "Управление согласием и данными",
"privacy.info_title": "Запись вашего согласия",
"privacy.user_id": "Идентификатор",
"privacy.consent_date": "Согласие дано",
"privacy.policy_version": "Версия политики",
"privacy.usage_count": "Количество использований",
"privacy.no_data": "Данные о согласии не найдены на этом устройстве.",
"privacy.delete_title": "Удалить мои данные",
"privacy.delete_description": "Это безвозвратно удалит все ваши записи о согласии с наших серверов и очистит локальные данные. Это действие нельзя отменить.",
"privacy.delete_confirm": "Я понимаю, что это необратимо",
"privacy.delete_button": "Удалить мои данные",
"privacy.deleting": "Удаление...",
"privacy.delete_success": "Все ваши данные успешно удалены.",
"privacy.delete_error": "Не удалось удалить данные. Попробуйте снова или напишите на info@webappski.com.",
"privacy.done": "Готово",
"privacy.link": "Конфиденциальность"
};
