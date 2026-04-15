// RO translations
export const translations = {
"modal.title": "Vorbește-ne despre aceste subiecte",
"modal.subtitle":
  "Înțelegem orice limbă, completăm totul și traducem dacă este necesar",

"loader.initial": "Pregătesc formularul...",

// Dynamic progress stages for initAnalyze loading
"loader.stage1": "Analizez câmpuri formular...",
"loader.stage2": "Detectare limbă...",
"loader.stage3": "Identificare câmpuri sensibile...",
"loader.stage4": "Pregătire sugestii...",
"loader.stage5": "Aproape gata!",

"button.startSpeaking": "Începe să vorbești",
"button.stopSpeaking": "Oprește înregistrarea",
"button.tryAgain": "Încearcă din nou",

"listening.title": "Ascult...",
"listening.subtitle": "Vorbește natural despre ceea ce vrei să completezi",
"processing.title": "Se procesează...",

// Dynamic progress stages for processing (voice->text->LLM)
"processing.stage1": "Convertire vorbire în text...",
"processing.stage2": "Detectare limbă...",
"processing.stage3": "Înțelegere cerere...",
"processing.stage4": "Extragere date...",
"processing.stage5": "Potrivire cu câmpuri formular...",
"processing.stage6": "Validare date...",
"processing.stage7": "Pregătire rezultate...",
"processing.stage8": "Aproape gata!",

"success.title": "Formular completat!",
"success.subtitle":
  "Revizuiește câmpurile completate și trimite când ești gata",
"success.apply_changes": "Completează și verifică",
"success.empty_fields": "Necompletat",
"success.check_fields": "Verifică",
"success.filled_fields": "Completat",
"success.field_single": "câmp",
"success.fields_multiple": "câmpuri",
"success.require_attention": "necesită atenție",
"success.successfully_filled": "completat cu succes",

"empty.title": "Nu au fost găsite câmpuri completabile",
"empty.subtitle": "Acest formular nu are câmpuri care pot fi completate prin voce",

"error.title": "Eroare",
"error.microphone": "Accesul la microfon este necesar",
"error.noFields": "Nu au fost detectate formulare pe această pagină",
"error.noActiveForm":
  "Nu s-a găsit niciun formular activ pentru completare",
"error.lowConfidence":
  "Nu am putut înțelege clar audio-ul. Te rog vorbește mai clar.",
"error.general": "Ceva nu a mers bine. Te rog, încearcă din nou.",
"error.domainNotAllowed":
  "Acest domeniu nu este autorizat să folosească serviciul. Vă rugăm să contactați administratorul site-ului.",
"error.invalidApiKey": "Serviciul nu este configurat corect. Contactați administratorul site-ului.",
"error.rateLimited": "Serviciul este ocupat acum. Încercați din nou într-un moment.",
"error.quotaExhausted": "Limita de utilizare a acestui serviciu a fost atinsă. Contactați administratorul site-ului.",
"error.no_fields_detected":
  "Nu s-au putut recunoaște informațiile pentru completarea formularului. Vă rugăm să încercați să specificați mai clar ce date trebuie introduse în câmpuri.",
"error.no_data_title": "Datele nu au fost recunoscute",
"error.mic_title": "Microfon necesar",
"error.network_title": "Problemă de conexiune",
"error.showDetails": "Afișează detalii tehnice",

"floatingButton.fillByVoice": "Completați prin voce",

"form.progress.filled": "{count} completat",
"form.progress.scrollToSelect": "Derulează pentru a selecta",
"form.formNumber": "{current} din {total}",
"form.allForms": "Toate cele {count} formulare",
"form.label": "Formular",
"form.fields": "Câmpuri",
"button.close": "Închide",
// Consent modal
"consent.title": "Confidențialitatea Datelor Dvs.",
"consent.subtitle":
  "Vă rugăm să citiți cu atenție informațiile despre protecția datelor dvs.",
"consent.warning_title": "Important: Nu Partajați Date Sensibile",
"consent.warning":
  "Vă rugăm să nu menționați parole, detalii de plată, identificatori guvernamentali sau informații medicale. Aceste date nu sunt destinate procesării de către funcția vocală.",
"consent.summary_card1_title": "Ce Colectăm",
"consent.summary_data1": "Înregistrare vocală → convertită în text",
"consent.summary_data2":
  "Nume/tipuri/substituenți de câmpuri (fără valori; câmpuri sensibile excluse)",
"consent.summary_data3": "Jurnale tehnice (IP, informații browser)",
"consent.summary_card2_title": "Unde Merge",
"consent.summary_transfer":
  "OpenAI (SUA) pentru procesare AI • Google Cloud/Firebase (UE, Polonia) pentru găzduire și securitate",
"consent.summary_card3_title": "Drepturile Dvs.",
"consent.summary_rights":
  "Retragerea consimțământului oricând • Solicitarea accesului sau ștergerii datelor dvs. • Detalii complete în <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Politica de Confidențialitate</a>",
"consent.full_details_title": "Citiți Detaliile Complete",
"consent.section1_title": "Ce date procesăm?",
"consent.data1":
  "Înregistrare vocală. Fișier audio trimis la OpenAI Whisper prin serverul nostru pentru transcriere. Fișierul nu este salvat pe server după procesare.",
"consent.data2":
  "Transcriere vocală (text). Trimisă la OpenAI GPT pentru completarea formularelor. În mod implicit nu salvăm transcrierea în sistemele noastre; în jurnalele tehnice stocăm doar metadate (lungimea textului, limba, durata). Important: OpenAI poate stoca datele cererilor până la 30 de zile pentru a preveni abuzurile; ștergerea anticipată la OpenAI nu este disponibilă; datele nu sunt utilizate pentru antrenarea modelelor.",
"consent.data3":
  "Metadate câmpuri formular. Nume/tipuri/substituenți (câmpuri sensibile excluse).",
"consent.data4":
  "URL-ul paginii. Procesat de infrastructura noastră (pentru compatibilitate/diagnostice), NU trimis către OpenAI. Vă rugăm să evitați datele personale în parametrii de interogare URL.",
"consent.data5":
  "User-Agent browser. Utilizat local și de infrastructura noastră (compatibilitate/securitate), NU trimis către OpenAI.",
"consent.data6":
  "Adresa IP. Înregistrată de infrastructura Google Cloud/Firebase pentru securitate (până la 30 de zile), NU trimisă către OpenAI.",
"consent.section2_title":
  "Unde și pe ce bază legală sunt transferate datele?",
"consent.recipients":
  "Destinatari. OpenAI (SUA) — procesare audio/text; Google Cloud/Firebase (UE/Polonia) — găzduire și jurnale de securitate. Datele nu sunt utilizate pentru antrenarea modelelor.",
"consent.transfer1":
  "OpenAI (SUA). Cererile către OpenAI (inclusiv audio/text) pot fi stocate de OpenAI până la 30 de zile pentru a preveni abuzurile; datele nu sunt utilizate pentru antrenarea modelelor. Transfer către SUA — pe baza SCC aprobate de Comisia Europeană.",
"consent.basis_title": "Baze legale:",
"consent.basis1":
  "Funcție vocală — consimțământul dvs. (Art. 6(1)(a) GDPR).",
"consent.basis2":
  "Jurnale tehnice (IP/UA/URL) — interese legitime (Art. 6(1)(f)) — securitate și depanare.",
"consent.section3_title": "Drepturile dvs.",
"consent.rights1":
  "Puteți retrage consimțământul în setările widget-ului oricând; aceasta nu afectează legalitatea procesării înainte de retragere.",
"consent.rights2":
  "Pe lângă retragerea consimțământului, aveți dreptul de a solicita accesul sau ștergerea datelor dvs. stocate în sistemele noastre (jurnale tehnice, valori de cost) prin proprietarul site-ului. Detalii complete în <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Politica de Confidențialitate</a>.",
"consent.rights3":
  "Această funcție este destinată utilizatorilor de 16+; pentru utilizatori mai tineri, este necesar consimțământul părinților/tutorilor.",
"consent.footer_legal_title": "Informații Juridice",
"consent.footer_controller":
  "Operator de date: proprietarul acestui site web.",
"consent.footer_processor":
  "TypelessForm: acționează ca persoană împuternicită.",
"consent.footer_contact": "Contact confidențialitate: info@webappski.com.",
"consent.footer_sccs":
  "Transferul către SUA se efectuează în baza SCC. Detaliile sunt disponibile în <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Politica noastră de Confidențialitate</a>.",
"consent.accept": "Accept",

// Consent checkboxes
"consent.checkbox_main": "Consimț la prelucrarea datelor mele vocale și a metadatelor formularului de către TypelessForm și la transferul internațional în SUA (OpenAI) în cadrul SCC, conform <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Politicii de confidențialitate</a>.",
"consent.checkbox_age": "Confirm că am 16+ ani sau am consimțământul unui părinte/tutore.",

// Privacy settings / data deletion
"privacy.title": "Confidențialitate și date",
"privacy.subtitle": "Gestionați consimțământul și datele",
"privacy.info_title": "Înregistrarea consimțământului dvs.",
"privacy.user_id": "Identificator",
"privacy.consent_date": "Consimțământ acordat",
"privacy.policy_version": "Versiunea politicii",
"privacy.usage_count": "Număr de utilizări",
"privacy.no_data": "Nu s-au găsit date de consimțământ pe acest dispozitiv.",
"privacy.delete_title": "Șterge datele mele",
"privacy.delete_description": "Aceasta va șterge permanent toate înregistrările de consimțământ de pe serverele noastre și va curăța datele locale. Această acțiune nu poate fi anulată.",
"privacy.delete_confirm": "Înțeleg că este permanent",
"privacy.delete_button": "Șterge datele mele",
"privacy.deleting": "Se șterge...",
"privacy.delete_success": "Toate datele dvs. au fost șterse cu succes.",
"privacy.delete_error": "Nu s-au putut șterge datele. Încercați din nou sau contactați info@webappski.com.",
"privacy.done": "Gata",
"privacy.link": "Confidențialitate"
};
