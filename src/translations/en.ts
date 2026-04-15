// EN translations
export const translations = {
"modal.title": "Tell us about these topics",
"modal.subtitle": "Speak naturally in any language",
"loader.initial": "Preparing form...",

// Dynamic progress stages for initAnalyze loading
"loader.stage1": "Analyzing form fields...",
"loader.stage2": "Detecting language...",
"loader.stage3": "Identifying sensitive fields...",
"loader.stage4": "Preparing suggestions...",
"loader.stage5": "Almost ready!",

"button.startSpeaking": "Start Speaking",
"button.stopSpeaking": "Stop Recording",
"button.tryAgain": "Try Again",

"listening.title": "Listening...",
"listening.subtitle": "Speak naturally about what you want to fill",
"processing.title": "Processing...",

// Dynamic progress stages for processing (voice->text->LLM)
"processing.stage1": "Converting speech to text...",
"processing.stage2": "Detecting language...",
"processing.stage3": "Understanding your request...",
"processing.stage4": "Extracting data...",
"processing.stage5": "Matching with form fields...",
"processing.stage6": "Validating data...",
"processing.stage7": "Preparing results...",
"processing.stage8": "Almost ready!",

"success.title": "Form Filled!",
"success.subtitle": "Review the filled fields and submit when ready",
"success.apply_changes": "Fill and review",
"success.empty_fields": "Not filled",
"success.check_fields": "Check",
"success.filled_fields": "Completed",
"success.field_single": "field",
"success.fields_multiple": "fields",
"success.require_attention": "require attention",
"success.successfully_filled": "successfully filled",

"empty.title": "No fillable fields found",
"empty.subtitle": "This form doesn't have fields that can be filled by voice",

"error.title": "Error",
"error.microphone": "Microphone access required",
"error.noFields": "No forms detected on this page",
"error.noActiveForm": "No active form found for filling",
"error.lowConfidence":
  "Could not clearly understand the audio. Please speak more clearly.",
"error.general": "Something went wrong. Please try again.",
"error.domainNotAllowed":
  "This domain is not authorized to use the service. Please contact the website administrator.",
"error.serviceUnavailable":
  "Service temporarily unavailable. Please try again later or contact the website administrator.",
"error.invalidApiKey": "Service is not configured correctly. Please contact the website administrator.",
"error.rateLimited": "Service is busy right now. Please try again in a moment.",
"error.quotaExhausted": "The usage limit for this service has been reached. Please contact the website administrator.",
"error.no_fields_detected":
  "Could not recognize information for filling the form. Please try to clearly specify what data should be entered in the fields.",
"error.no_data_title": "Data not recognized",
"error.mic_title": "Microphone Required",
"error.network_title": "Connection Problem",
"error.showDetails": "Show technical details",

"floatingButton.fillByVoice": "Fill by Voice",

"form.progress.filled": "{count} filled",
"form.progress.scrollToSelect": "Scroll to select",
"form.formNumber": "{current} of {total}",
"form.allForms": "All {count} forms",
"form.label": "Form",
"form.fields": "Fields",

"button.close": "Close",

// Consent modal
"consent.title": "Your Data Privacy",
"consent.subtitle":
  "Please read the information about your data protection carefully",

// Anti-PII warning (hero banner)
"consent.warning_title": "Important: Do Not Share Sensitive Data",
"consent.warning":
  "Please do not speak passwords, payment details, government identifiers, or medical information. This data is not intended for processing by the voice feature.",

// Summary cards (always visible)
"consent.summary_card1_title": "What We Collect",
"consent.summary_data1": "Voice recording → converted to text",
"consent.summary_data2":
  "Field names/types/placeholders (without values; sensitive fields excluded)",
"consent.summary_data3": "Technical logs (IP, browser info)",

"consent.summary_card2_title": "Where It Goes",
"consent.summary_transfer":
  "OpenAI (USA) for AI processing • Google Cloud/Firebase (EU, Poland) for hosting and security",

"consent.summary_card3_title": "Your Rights",
"consent.summary_rights":
  "Withdraw consent anytime • Request access or deletion of your data • Full details in <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Privacy Policy</a>",

// Full details accordion
"consent.full_details_title": "Read Full Details",

// Section 1: What data we process
"consent.section1_title": "What data do we process?",
"consent.data1":
  "Voice recording. Audio file sent to OpenAI Whisper via our server for transcription. File is not saved on server after processing.",
"consent.data2":
  "Voice transcript (text). Sent to OpenAI GPT for form filling. We do not store the transcript on our servers; it is processed in memory and discarded after the response. We log only technical metadata (length, language, duration). Important: OpenAI may store request data for up to 30 days to prevent abuse; early deletion at OpenAI is not available; data is not used for model training.",
"consent.data3":
  "Form field metadata. Names/types/placeholders (sensitive fields excluded).",
"consent.data4":
  "Page URL. Processed by our infrastructure (for compatibility/diagnostics), NOT sent to OpenAI. Please avoid personal data in URL query parameters.",
"consent.data5":
  "Browser User-Agent. Used locally and by our infrastructure (compatibility/security), NOT sent to OpenAI.",
"consent.data6":
  "IP address. Logged by Google Cloud/Firebase infrastructure for security (up to 30 days), NOT sent to OpenAI.",

// Section 2: Where and on what basis
"consent.section2_title":
  "Where and on what legal basis is data transferred?",
"consent.recipients":
  "Recipients. OpenAI (USA) — audio/text processing; Google Cloud/Firebase (EU/Poland) — hosting and security logs. Data is not used for model training.",
"consent.transfer1":
  "OpenAI (USA). Requests to OpenAI (including audio/text) may be stored by OpenAI for up to 30 days to prevent abuse; data is not used for model training. Transfer to USA — based on SCCs approved by the European Commission.",
"consent.basis_title": "Legal bases:",
"consent.basis1": "Voice feature — your consent (Art. 6(1)(a) GDPR).",
"consent.basis2":
  "Technical logs (IP/UA/URL) — legitimate interests (Art. 6(1)(f)) — security and debugging.",

// Section 3: Your rights
"consent.section3_title": "Your rights",
"consent.rights1":
  "You can withdraw consent in widget settings at any time; this does not affect the lawfulness of processing before withdrawal.",
"consent.rights2":
  "In addition to withdrawing consent, you have the right to request access or deletion of your data stored in our systems (technical logs and usage metrics) via the website owner. Full details in <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Privacy Policy</a>.",
"consent.rights3":
  "This feature is intended for users 16+; for younger users, parental/guardian consent is required.",

// Footer legal info
"consent.footer_legal_title": "Legal Information",
"consent.footer_controller": "Data Controller: the owner of this website.",
"consent.footer_processor": "TypelessForm: acts as a processor.",
"consent.footer_contact": "Privacy contact: info@webappski.com.",
"consent.footer_sccs":
  "Transfer to USA is carried out under SCCs. Details are available in our <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Privacy Policy</a>.",

"consent.accept": "I Accept",

// Consent checkboxes
"consent.checkbox_main": "I consent to the processing of my voice and form metadata by TypelessForm and to international transfer to the U.S. (OpenAI) under SCCs, as described in the <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Privacy Policy</a>.",
"consent.checkbox_age": "I confirm I am 16+ or have parental/guardian consent.",

// Privacy settings / data deletion
"privacy.title": "Privacy & Data",
"privacy.subtitle": "Manage your consent and data",
"privacy.info_title": "Your Consent Record",
"privacy.user_id": "Identifier",
"privacy.consent_date": "Consent given",
"privacy.policy_version": "Policy version",
"privacy.usage_count": "Usage count",
"privacy.no_data": "No consent data found on this device.",
"privacy.delete_title": "Delete My Data",
"privacy.delete_description": "This will permanently delete all your consent records from our servers and clear local data. This action cannot be undone.",
"privacy.delete_confirm": "I understand this is permanent",
"privacy.delete_button": "Delete My Data",
"privacy.deleting": "Deleting...",
"privacy.delete_success": "All your data has been deleted successfully.",
"privacy.delete_error": "Failed to delete data. Please try again or contact info@webappski.com.",
"privacy.done": "Done",
"privacy.link": "Privacy & Data",
};
