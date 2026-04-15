// PL translations
export const translations = {
"modal.title": "Opowiedz nam o tych tematach",
"modal.subtitle":
  "Rozumiemy każdy język, wypełnimy wszystko i przetłumaczymy w razie potrzeby",

"button.startSpeaking": "Rozpocznij mówienie",
"button.stopSpeaking": "Zatrzymaj nagrywanie",
"button.tryAgain": "Spróbuj ponownie",

"listening.title": "Słucham...",
"listening.subtitle": "Mów naturalnie o tym, co chcesz wypełnić",
"processing.title": "Przetwarzam...",

// Dynamic progress stages for processing (voice->text->LLM)
"processing.stage1": "Konwertowanie mowy na tekst...",
"processing.stage2": "Wykrywanie języka...",
"processing.stage3": "Rozumienie Twojego żądania...",
"processing.stage4": "Wyodrębnianie danych...",
"processing.stage5": "Dopasowywanie do pół formularza...",
"processing.stage6": "Walidacja danych...",
"processing.stage7": "Przygotowywanie wyników...",
"processing.stage8": "Prawie gotowe!",

"success.title": "Formularz wypełniony!",
"success.subtitle": "Sprawdź wypełnione pola i wyślij, gdy będziesz gotowy",
"success.apply_changes": "Wypełnij i sprawdź",
"success.empty_fields": "Niewypełnione",
"success.check_fields": "Sprawdź",
"success.filled_fields": "Wypełnione",
"success.field_single": "pole",
"success.fields_multiple": "pola",
"success.require_attention": "wymagają uwagi",
"success.successfully_filled": "wypełnione pomyślnie",

"empty.title": "Nie znaleziono pól do wypełnienia",
"empty.subtitle": "Ten formularz nie posiada pól, które można wypełnić głosem",

"error.title": "Błąd",
"error.microphone": "Wymagany dostęp do mikrofonu",
"error.noFields": "Nie wykryto formularzy na tej stronie",
"error.noActiveForm": "Nie znaleziono aktywnego formularza do wypełnienia",
"error.lowConfidence":
  "Nie można było wyraźnie zrozumieć audio. Proszę mówić wyraźniej.",
"error.general": "Coś poszło nie tak. Spróbuj ponownie.",
"error.domainNotAllowed":
  "Ta domena nie jest upoważniona do korzystania z usługi. Skontaktuj się z administratorem witryny.",
"error.serviceUnavailable":
  "Usługa tymczasowo niedostępna. Spróbuj ponownie później lub skontaktuj się z administratorem witryny.",
"error.invalidApiKey": "Usługa nie jest prawidłowo skonfigurowana. Skontaktuj się z administratorem witryny.",
"error.rateLimited": "Usługa jest teraz przeciążona. Spróbuj ponownie za chwilę.",
"error.quotaExhausted": "Limit użycia tej usługi został wyczerpany. Skontaktuj się z administratorem witryny.",
"error.no_fields_detected":
  "Nie udało się rozpoznać informacji do wypełnienia formularza. Spróbuj dokładniej określić, jakie dane należy wprowadzić w pola.",
"error.no_data_title": "Dane nie zostały rozpoznane",
"error.mic_title": "Wymagany mikrofon",
"error.network_title": "Problem z połączeniem",
"error.showDetails": "Pokaż szczegóły techniczne",

"loader.initial": "Przygotowuję formularz...",

// Dynamic progress stages for initAnalyze loading
"loader.stage1": "Analizuję pola formularza...",
"loader.stage2": "Wykrywanie języka...",
"loader.stage3": "Identyfikacja wrażliwych pól...",
"loader.stage4": "Przygotowywanie sugestii...",
"loader.stage5": "Prawie gotowe!",

"floatingButton.fillByVoice": "Wypełnij głosem",

"form.progress.filled": "{count} wypełniono",
"form.progress.scrollToSelect": "Przewiń, aby wybrać",
"form.formNumber": "{current} z {total}",
"form.allForms": "Wszystkie {count} formularze",
"form.label": "Formularz",
"form.fields": "Pola",
"button.close": "Zamknij",
// Consent modal
"consent.title": "Twoja Prywatność Danych",
"consent.subtitle":
  "Prosimy o uważne przeczytanie informacji o ochronie Twoich danych",
"consent.warning_title": "Ważne: Nie Udostępniaj Danych Wrażliwych",
"consent.warning":
  "Proszę nie wymawiać haseł, danych płatności, identyfikatorów rządowych ani informacji medycznych. Te dane nie są przeznaczone do przetwarzania przez funkcję głosową.",
"consent.summary_card1_title": "Co Zbieramy",
"consent.summary_data1": "Nagranie głosowe → przekonwertowane na tekst",
"consent.summary_data2":
  "Nazwy/typy/podpowiedzi pól (bez wartości; pola wrażliwe wyłączone)",
"consent.summary_data3": "Logi techniczne (IP, informacje o przeglądarce)",
"consent.summary_card2_title": "Gdzie Trafia",
"consent.summary_transfer":
  "OpenAI (USA) do przetwarzania AI • Google Cloud/Firebase (UE, Polska) do hostingu i bezpieczeństwa",
"consent.summary_card3_title": "Twoje Prawa",
"consent.summary_rights":
  "Cofnij zgodę w dowolnym momencie • Żądaj dostępu lub usunięcia Twoich danych • Pełne szczegóły w <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Polityce Prywatności</a>",
"consent.full_details_title": "Przeczytaj Pełne Szczegóły",
"consent.section1_title": "Jakie dane przetwarzamy?",
"consent.data1":
  "Nagranie głosowe. Plik audio wysyłany do OpenAI Whisper przez nasz serwer w celu transkrypcji. Plik nie jest zapisywany na serwerze po przetworzeniu.",
"consent.data2":
  "Transkrypcja głosu (tekst). Wysyłana do OpenAI GPT w celu wypełniania formularzy. Domyślnie nie zapisujemy transkrypcji w naszych systemach; w logach technicznych przechowujemy tylko metadane (długość tekstu, język, czas trwania). Ważne: OpenAI może przechowywać dane żądań do 30 dni w celu zapobiegania nadużyciom; wcześniejsze usunięcie w OpenAI nie jest dostępne; dane nie są wykorzystywane do trenowania modeli.",
"consent.data3":
  "Metadane pól formularza. Nazwy/typy/podpowiedzi (pola wrażliwe wyłączone).",
"consent.data4":
  "URL strony. Przetwarzany przez naszą infrastrukturę (w celu kompatybilności/diagnostyki), NIE wysyłany do OpenAI. Proszę unikać danych osobowych w parametrach zapytań URL.",
"consent.data5":
  "User-Agent przeglądarki. Używany lokalnie i przez naszą infrastrukturę (kompatybilność/bezpieczeństwo), NIE wysyłany do OpenAI.",
"consent.data6":
  "Adres IP. Rejestrowany przez infrastrukturę Google Cloud/Firebase w celach bezpieczeństwa (do 30 dni), NIE wysyłany do OpenAI.",
"consent.section2_title":
  "Gdzie i na jakiej podstawie prawnej dane są przekazywane?",
"consent.recipients":
  "Odbiorcy. OpenAI (USA) — przetwarzanie audio/tekstu; Google Cloud/Firebase (UE/Polska) — hosting i logi bezpieczeństwa. Dane nie są wykorzystywane do trenowania modeli.",
"consent.transfer1":
  "OpenAI (USA). Żądania do OpenAI (w tym audio/tekst) mogą być przechowywane przez OpenAI do 30 dni w celu zapobiegania nadużyciom; dane nie są wykorzystywane do trenowania modeli. Transfer do USA — na podstawie SCC zatwierdzonych przez Komisję Europejską.",
"consent.basis_title": "Podstawy prawne:",
"consent.basis1": "Funkcja głosowa — Twoja zgoda (Art. 6(1)(a) RODO).",
"consent.basis2":
  "Logi techniczne (IP/UA/URL) — prawnie uzasadnione interesy (Art. 6(1)(f)) — bezpieczeństwo i debugowanie.",
"consent.section3_title": "Twoje prawa",
"consent.rights1":
  "Możesz cofnąć zgodę w ustawieniach widgetu w dowolnym momencie; nie wpływa to na zgodność z prawem przetwarzania przed cofnięciem.",
"consent.rights2":
  "Oprócz cofnięcia zgody masz prawo żądać dostępu lub usunięcia Twoich danych przechowywanych w naszych systemach (logi techniczne, metryki kosztów) za pośrednictwem właściciela witryny. Pełne szczegóły w <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Polityce Prywatności</a>.",
"consent.rights3":
  "Ta funkcja jest przeznaczona dla użytkowników w wieku 16+; dla młodszych użytkowników wymagana jest zgoda rodziców/opiekunów.",
"consent.footer_legal_title": "Informacje Prawne",
"consent.footer_controller":
  "Administrator danych: właściciel tej witryny.",
"consent.footer_processor": "TypelessForm: działa jako procesor.",
"consent.footer_contact":
  "Kontakt w sprawie prywatności: info@webappski.com.",
"consent.footer_sccs":
  "Transfer do USA odbywa się na podstawie SCC. Szczegóły dostępne w naszej <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Polityce Prywatności</a>.",
"consent.accept": "Akceptuję",

// Consent checkboxes
"consent.checkbox_main": "Wyrażam zgodę na przetwarzanie moich danych głosowych i metadanych formularza przez TypelessForm oraz na międzynarodowy transfer do USA (OpenAI) w ramach SCCs, zgodnie z opisem w <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Polityce Prywatności</a>.",
"consent.checkbox_age": "Potwierdzam, że mam ukończone 16 lat lub posiadam zgodę rodzica/opiekuna.",

// Privacy settings / data deletion
"privacy.title": "Prywatność i dane",
"privacy.subtitle": "Zarządzaj zgodą i danymi",
"privacy.info_title": "Twój zapis zgody",
"privacy.user_id": "Identyfikator",
"privacy.consent_date": "Zgoda udzielona",
"privacy.policy_version": "Wersja polityki",
"privacy.usage_count": "Liczba użyć",
"privacy.no_data": "Nie znaleziono danych o zgodzie na tym urządzeniu.",
"privacy.delete_title": "Usuń moje dane",
"privacy.delete_description": "To trwale usunie wszystkie Twoje zapisy zgody z naszych serwerów i wyczyści lokalne dane. Tej operacji nie można cofnąć.",
"privacy.delete_confirm": "Rozumiem, że to nieodwracalne",
"privacy.delete_button": "Usuń moje dane",
"privacy.deleting": "Usuwanie...",
"privacy.delete_success": "Wszystkie Twoje dane zostały pomyślnie usunięte.",
"privacy.delete_error": "Nie udało się usunąć danych. Spróbuj ponownie lub napisz na info@webappski.com.",
"privacy.done": "Gotowe",
"privacy.link": "Prywatność"
};
