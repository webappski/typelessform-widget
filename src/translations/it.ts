// IT translations
export const translations = {
"modal.title": "Raccontaci di questi argomenti",
"modal.subtitle":
  "Comprendiamo qualsiasi lingua, compiliamo tutto e traduciamo se necessario",

"button.startSpeaking": "Inizia a parlare",
"button.stopSpeaking": "Interrompi registrazione",
"button.tryAgain": "Riprova",

"listening.title": "Ascoltando...",
"listening.subtitle": "Parla naturalmente di ciò che vuoi compilare",
"processing.title": "Elaborazione...",

// Dynamic progress stages for processing (voice->text->LLM)
"processing.stage1": "Conversione del parlato in testo...",
"processing.stage2": "Rilevamento della lingua...",
"processing.stage3": "Comprensione della tua richiesta...",
"processing.stage4": "Estrazione dei dati...",
"processing.stage5": "Abbinamento con i campi del modulo...",
"processing.stage6": "Validazione dei dati...",
"processing.stage7": "Preparazione dei risultati...",
"processing.stage8": "Quasi pronto!",

"success.title": "Modulo compilato!",
"success.subtitle": "Rivedi i campi compilati e invia quando sei pronto",
"success.apply_changes": "Compila e verifica",
"success.empty_fields": "Non compilato",
"success.check_fields": "Verifica",
"success.filled_fields": "Completato",
"success.field_single": "campo",
"success.fields_multiple": "campi",
"success.require_attention": "richiedono attenzione",
"success.successfully_filled": "compilato con successo",

"empty.title": "Nessun campo compilabile trovato",
"empty.subtitle": "Questo modulo non ha campi compilabili tramite voce",

"error.title": "Errore",
"error.microphone": "È necessario l'accesso al microfono",
"error.noFields": "Nessun modulo rilevato in questa pagina",
"error.noActiveForm": "Nessun modulo attivo trovato per la compilazione",
"error.lowConfidence":
  "Non è stato possibile comprendere chiaramente l'audio. Parla più chiaramente.",
"error.general": "Qualcosa è andato storto. Riprova.",
"error.domainNotAllowed":
  "Questo dominio non è autorizzato a utilizzare il servizio. Contatta l'amministratore del sito web.",
"error.serviceUnavailable":
  "Servizio temporaneamente non disponibile. Riprova più tardi o contatta l'amministratore del sito.",
"error.invalidApiKey": "Il servizio non è configurato correttamente. Contatta l'amministratore del sito web.",
"error.rateLimited": "Il servizio è occupato in questo momento. Riprova tra un momento.",
"error.quotaExhausted": "Il limite di utilizzo di questo servizio è stato raggiunto. Contatta l'amministratore del sito web.",
"error.no_fields_detected":
  "Non è stato possibile riconoscere le informazioni per compilare il modulo. Prova a specificare più chiaramente quali dati devono essere inseriti nei campi.",
"error.no_data_title": "Dati non riconosciuti",
"error.mic_title": "Microfono richiesto",
"error.network_title": "Problema di connessione",
"error.showDetails": "Mostra dettagli tecnici",

"loader.initial": "Preparazione del modulo...",

// Dynamic progress stages for initAnalyze loading
"loader.stage1": "Analisi dei campi del modulo...",
"loader.stage2": "Rilevamento della lingua...",
"loader.stage3": "Identificazione dei campi sensibili...",
"loader.stage4": "Preparazione dei suggerimenti...",
"loader.stage5": "Quasi pronto!",

"floatingButton.fillByVoice": "Compila con voce",

"form.progress.filled": "{count} compilato",
"form.progress.scrollToSelect": "Scorri per selezionare",
"form.formNumber": "{current} di {total}",
"form.allForms": "Tutti i {count} moduli",
"form.label": "Modulo",
"form.fields": "Campi",
"button.close": "Chiudi",
// Consent modal
"consent.title": "La Tua Privacy dei Dati",
"consent.subtitle":
  "Si prega di leggere attentamente le informazioni sulla protezione dei tuoi dati",
"consent.warning_title": "Importante: Non Condividere Dati Sensibili",
"consent.warning":
  "Si prega di non menzionare password, dettagli di pagamento, identificatori governativi o informazioni mediche. Questi dati non sono destinati ad essere elaborati dalla funzione vocale.",
"consent.summary_card1_title": "Cosa Raccogliamo",
"consent.summary_data1": "Registrazione vocale → convertita in testo",
"consent.summary_data2":
  "Nomi/tipi/segnaposto dei campi (senza valori; campi sensibili esclusi)",
"consent.summary_data3": "Log tecnici (IP, informazioni del browser)",
"consent.summary_card2_title": "Dove Va",
"consent.summary_transfer":
  "OpenAI (USA) per elaborazione IA • Google Cloud/Firebase (UE, Polonia) per hosting e sicurezza",
"consent.summary_card3_title": "I Tuoi Diritti",
"consent.summary_rights":
  "Ritirare il consenso in qualsiasi momento • Richiedere accesso o cancellazione dei tuoi dati • Dettagli completi nell'<a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Informativa sulla Privacy</a>",
"consent.full_details_title": "Leggi i Dettagli Completi",
"consent.section1_title": "Quali dati elaboriamo?",
"consent.data1":
  "Registrazione vocale. File audio inviato a OpenAI Whisper tramite il nostro server per la trascrizione. Il file non viene salvato sul server dopo l'elaborazione.",
"consent.data2":
  "Trascrizione vocale (testo). Inviata a OpenAI GPT per la compilazione di moduli. Per impostazione predefinita non salviamo la trascrizione nei nostri sistemi; nei log tecnici memorizziamo solo metadati (lunghezza del testo, lingua, durata). Importante: OpenAI può memorizzare i dati delle richieste fino a 30 giorni per prevenire abusi; la cancellazione anticipata presso OpenAI non è disponibile; i dati non vengono utilizzati per l'addestramento dei modelli.",
"consent.data3":
  "Metadati dei campi del modulo. Nomi/tipi/segnaposto (campi sensibili esclusi).",
"consent.data4":
  "URL della pagina. Elaborato dalla nostra infrastruttura (per compatibilità/diagnostica), NON inviato a OpenAI. Si prega di evitare dati personali nei parametri di query dell'URL.",
"consent.data5":
  "User-Agent del browser. Utilizzato localmente e dalla nostra infrastruttura (compatibilità/sicurezza), NON inviato a OpenAI.",
"consent.data6":
  "Indirizzo IP. Registrato dall'infrastruttura Google Cloud/Firebase per sicurezza (fino a 30 giorni), NON inviato a OpenAI.",
"consent.section2_title":
  "Dove e su quale base legale vengono trasferiti i dati?",
"consent.recipients":
  "Destinatari. OpenAI (USA) — elaborazione audio/testo; Google Cloud/Firebase (UE/Polonia) — hosting e log di sicurezza. I dati non vengono utilizzati per l'addestramento dei modelli.",
"consent.transfer1":
  "OpenAI (USA). Le richieste a OpenAI (inclusi audio/testo) possono essere memorizzate da OpenAI fino a 30 giorni per prevenire abusi; i dati non vengono utilizzati per l'addestramento dei modelli. Trasferimento negli USA — basato su SCC approvate dalla Commissione Europea.",
"consent.basis_title": "Basi legali:",
"consent.basis1": "Funzione vocale — il tuo consenso (Art. 6(1)(a) GDPR).",
"consent.basis2":
  "Log tecnici (IP/UA/URL) — interessi legittimi (Art. 6(1)(f)) — sicurezza e debug.",
"consent.section3_title": "I tuoi diritti",
"consent.rights1":
  "Puoi ritirare il consenso nelle impostazioni del widget in qualsiasi momento; ciò non pregiudica la liceità del trattamento prima del ritiro.",
"consent.rights2":
  "Oltre a ritirare il consenso, hai il diritto di richiedere l'accesso o la cancellazione dei tuoi dati memorizzati nei nostri sistemi (log tecnici, metriche dei costi) tramite il proprietario del sito web. Dettagli completi nell'<a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Informativa sulla Privacy</a>.",
"consent.rights3":
  "Questa funzione è destinata agli utenti di età pari o superiore a 16 anni; per gli utenti più giovani è richiesto il consenso dei genitori/tutori.",
"consent.footer_legal_title": "Informazioni Legali",
"consent.footer_controller":
  "Titolare del Trattamento: il proprietario di questo sito web.",
"consent.footer_processor":
  "TypelessForm: agisce come responsabile del trattamento.",
"consent.footer_contact": "Contatto per la privacy: info@webappski.com.",
"consent.footer_sccs":
  "Il trasferimento negli USA viene effettuato ai sensi delle SCC. I dettagli sono disponibili nella nostra <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Informativa sulla Privacy</a>.",
"consent.accept": "Accetto",

// Consent checkboxes
"consent.checkbox_main": "Acconsento al trattamento dei miei dati vocali e metadati del modulo da parte di TypelessForm e al trasferimento internazionale negli Stati Uniti (OpenAI) ai sensi delle SCC, come descritto nell'<a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Informativa sulla privacy</a>.",
"consent.checkbox_age": "Confermo di avere 16+ anni o di avere il consenso di un genitore/tutore.",

// Privacy settings / data deletion
"privacy.title": "Privacy e dati",
"privacy.subtitle": "Gestisci il tuo consenso e i tuoi dati",
"privacy.info_title": "Il tuo registro di consenso",
"privacy.user_id": "Identificatore",
"privacy.consent_date": "Consenso dato",
"privacy.policy_version": "Versione della policy",
"privacy.usage_count": "Numero di utilizzi",
"privacy.no_data": "Nessun dato di consenso trovato su questo dispositivo.",
"privacy.delete_title": "Elimina i miei dati",
"privacy.delete_description": "Questo eliminerà permanentemente tutti i tuoi record di consenso dai nostri server e cancellerà i dati locali. Questa azione non può essere annullata.",
"privacy.delete_confirm": "Capisco che è permanente",
"privacy.delete_button": "Elimina i miei dati",
"privacy.deleting": "Eliminazione...",
"privacy.delete_success": "Tutti i tuoi dati sono stati eliminati con successo.",
"privacy.delete_error": "Impossibile eliminare i dati. Riprova o contatta info@webappski.com.",
"privacy.done": "Fatto",
"privacy.link": "Privacy"
};
