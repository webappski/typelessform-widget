// FR translations
export const translations = {
"modal.title": "Parlez-nous de ces sujets",
"modal.subtitle":
  "Nous comprenons toutes les langues, remplissez tout et traduisez si nécessaire",

"button.startSpeaking": "Commencer à parler",
"button.stopSpeaking": "Arrêter l'enregistrement",
"button.tryAgain": "Réessayer",

"listening.title": "Écoute...",
"listening.subtitle": "Parlez naturellement de ce que vous voulez remplir",
"processing.title": "Traitement...",

// Dynamic progress stages for processing (voice->text->LLM)
"processing.stage1": "Conversion de la parole en texte...",
"processing.stage2": "Détection de la langue...",
"processing.stage3": "Compréhension de votre demande...",
"processing.stage4": "Extraction des données...",
"processing.stage5": "Correspondance avec les champs du formulaire...",
"processing.stage6": "Validation des données...",
"processing.stage7": "Préparation des résultats...",
"processing.stage8": "Presque prêt !",

// Stepper steps (4 steps mapped from 8 backend stages)
"processing.step1": "Conversion de la parole en texte",
"processing.step2": "Compréhension de votre demande",
"processing.step3": "Correspondance avec les champs",
"processing.step4": "Préparation des résultats",

"success.title": "Formulaire rempli !",
"success.subtitle":
  "Vérifiez les champs remplis et envoyez lorsque vous êtes prêt",
"success.apply_changes": "Remplir et vérifier",
"success.empty_fields": "Non rempli",
"success.check_fields": "Vérifier",
"success.filled_fields": "Complété",
"success.field_single": "champ",
"success.fields_multiple": "champs",
"success.require_attention": "nécessitent une attention",
"success.successfully_filled": "rempli avec succès",

"empty.title": "Aucun champ remplissable trouvé",
"empty.subtitle": "Ce formulaire ne contient pas de champs pouvant être remplis par la voix",

"error.title": "Erreur",
"error.microphone": "Accès au microphone requis",
"error.noFields": "Aucun formulaire détecté sur cette page",
"error.noActiveForm": "Aucun formulaire actif trouvé pour le remplissage",
"error.lowConfidence":
  "Impossible de comprendre clairement l'audio. Veuillez parler plus clairement.",
"error.general": "Une erreur est survenue. Veuillez réessayer.",
"error.domainNotAllowed":
  "Ce domaine n'est pas autorisé à utiliser le service. Veuillez contacter l'administrateur du site web.",
"error.serviceUnavailable":
  "Service temporairement indisponible. Veuillez réessayer plus tard ou contacter l'administrateur du site.",
"error.invalidApiKey": "Le service n'est pas configuré correctement. Veuillez contacter l'administrateur du site.",
"error.rateLimited": "Le service est occupé en ce moment. Veuillez réessayer dans un instant.",
"error.quotaExhausted": "La limite d'utilisation de ce service a été atteinte. Veuillez contacter l'administrateur du site.",
"error.no_fields_detected":
  "Impossible de reconnaître les informations pour remplir le formulaire. Veuillez essayer de spécifier plus clairement quelles données doivent être saisies dans les champs.",
"error.no_data_title": "Données non reconnues",
"error.mic_title": "Microphone requis",
"error.network_title": "Problème de connexion",
"error.showDetails": "Afficher les détails techniques",

"loader.initial": "Préparation du formulaire...",

// Dynamic progress stages for initAnalyze loading
"loader.stage1": "Analyse des champs du formulaire...",
"loader.stage2": "Détection de la langue...",
"loader.stage3": "Identification des champs sensibles...",
"loader.stage4": "Préparation des suggestions...",
"loader.stage5": "Presque prêt !",

"floatingButton.fillByVoice": "Remplir par voix",

"form.progress.filled": "{count} rempli",
"form.progress.scrollToSelect": "Faites défiler pour sélectionner",
"form.formNumber": "{current} sur {total}",
"form.allForms": "Tous les {count} formulaires",
"form.label": "Formulaire",
"form.fields": "Champs",
"button.close": "Fermer",
// Consent modal
"consent.title": "Votre Confidentialité des Données",
"consent.subtitle":
  "Veuillez lire attentivement les informations sur la protection de vos données",
"consent.warning_title": "Important : Ne Partagez Pas de Données Sensibles",
"consent.warning":
  "Veuillez ne pas mentionner de mots de passe, détails de paiement, identifiants gouvernementaux ou informations médicales. Ces données ne sont pas destinées à être traitées par la fonction vocale.",
"consent.summary_card1_title": "Ce Que Nous Collectons",
"consent.summary_data1": "Enregistrement vocal → converti en texte",
"consent.summary_data2":
  "Noms/types/espaces réservés des champs (sans valeurs ; champs sensibles exclus)",
"consent.summary_data3":
  "Journaux techniques (IP, informations du navigateur)",
"consent.summary_card2_title": "Où Cela Va",
"consent.summary_transfer":
  "OpenAI (États-Unis) pour le traitement IA • Google Cloud/Firebase (UE, Pologne) pour l'hébergement et la sécurité",
"consent.summary_card3_title": "Vos Droits",
"consent.summary_rights":
  "Retirer le consentement à tout moment • Demander l'accès ou la suppression de vos données • Détails complets dans la <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Politique de Confidentialité</a>",
"consent.full_details_title": "Lire les Détails Complets",
"consent.section1_title": "Quelles données traitons-nous ?",
"consent.data1":
  "Enregistrement vocal. Fichier audio envoyé à OpenAI Whisper via notre serveur pour transcription. Le fichier n'est pas enregistré sur le serveur après traitement.",
"consent.data2":
  "Transcription vocale (texte). Envoyée à OpenAI GPT pour remplir le formulaire. Par défaut, nous ne sauvegardons pas la transcription dans nos systèmes ; dans les journaux techniques, nous stockons uniquement des métadonnées (longueur du texte, langue, durée). Important : OpenAI peut stocker les données de requête jusqu'à 30 jours pour prévenir les abus ; la suppression anticipée chez OpenAI n'est pas disponible ; les données ne sont pas utilisées pour l'entraînement de modèles.",
"consent.data3":
  "Métadonnées des champs du formulaire. Noms/types/espaces réservés (champs sensibles exclus).",
"consent.data4":
  "URL de la page. Traitée par notre infrastructure (pour compatibilité/diagnostics), NON envoyée à OpenAI. Veuillez éviter les données personnelles dans les paramètres d'URL.",
"consent.data5":
  "User-Agent du navigateur. Utilisé localement et par notre infrastructure (compatibilité/sécurité), NON envoyé à OpenAI.",
"consent.data6":
  "Adresse IP. Enregistrée par l'infrastructure Google Cloud/Firebase pour la sécurité (jusqu'à 30 jours), NON envoyée à OpenAI.",
"consent.section2_title":
  "Où et sur quelle base juridique les données sont-elles transférées ?",
"consent.recipients":
  "Destinataires. OpenAI (États-Unis) — traitement audio/texte ; Google Cloud/Firebase (UE/Pologne) — hébergement et journaux de sécurité. Les données ne sont pas utilisées pour l'entraînement de modèles.",
"consent.transfer1":
  "OpenAI (États-Unis). Les requêtes à OpenAI (y compris audio/texte) peuvent être stockées par OpenAI jusqu'à 30 jours pour prévenir les abus ; les données ne sont pas utilisées pour l'entraînement de modèles. Transfert vers les États-Unis — basé sur les CCT approuvées par la Commission européenne.",
"consent.basis_title": "Bases juridiques :",
"consent.basis1":
  "Fonction vocale — votre consentement (Art. 6(1)(a) RGPD).",
"consent.basis2":
  "Journaux techniques (IP/UA/URL) — intérêts légitimes (Art. 6(1)(f)) — sécurité et débogage.",
"consent.section3_title": "Vos droits",
"consent.rights1":
  "Vous pouvez retirer votre consentement dans les paramètres du widget à tout moment ; cela n'affecte pas la légalité du traitement avant le retrait.",
"consent.rights2":
  "En plus de retirer votre consentement, vous avez le droit de demander l'accès ou la suppression de vos données stockées dans nos systèmes (journaux techniques, métriques de coûts) via le propriétaire du site web. Détails complets dans la <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Politique de Confidentialité</a>.",
"consent.rights3":
  "Cette fonctionnalité est destinée aux utilisateurs de 16 ans et plus ; pour les utilisateurs plus jeunes, le consentement parental/tuteur est requis.",
"consent.footer_legal_title": "Informations Légales",
"consent.footer_controller":
  "Responsable du traitement : le propriétaire de ce site web.",
"consent.footer_processor":
  "TypelessForm : agit en tant que sous-traitant.",
"consent.footer_contact": "Contact confidentialité : info@webappski.com.",
"consent.footer_sccs":
  "Le transfert vers les États-Unis est effectué en vertu des CCT. Les détails sont disponibles dans notre <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Politique de Confidentialité</a>.",
"consent.accept": "J'accepte",

// Consent checkboxes
"consent.checkbox_main": "Je consens au traitement de mes données vocales et métadonnées de formulaire par TypelessForm et au transfert international vers les États-Unis (OpenAI) dans le cadre des SCCs, tel que décrit dans la <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Politique de confidentialité</a>.",
"consent.checkbox_age": "Je confirme que j'ai 16 ans ou plus ou que j'ai le consentement d'un parent/tuteur.",

// Privacy settings / data deletion
"privacy.title": "Confidentialité & Données",
"privacy.subtitle": "Gérer votre consentement et vos données",
"privacy.info_title": "Votre enregistrement de consentement",
"privacy.user_id": "Identifiant",
"privacy.consent_date": "Consentement donné",
"privacy.policy_version": "Version de la politique",
"privacy.usage_count": "Nombre d'utilisations",
"privacy.no_data": "Aucune donnée de consentement trouvée sur cet appareil.",
"privacy.delete_title": "Supprimer mes données",
"privacy.delete_description": "Cela supprimera définitivement tous vos enregistrements de consentement de nos serveurs et effacera les données locales. Cette action est irréversible.",
"privacy.delete_confirm": "Je comprends que c'est permanent",
"privacy.delete_button": "Supprimer mes données",
"privacy.deleting": "Suppression...",
"privacy.delete_success": "Toutes vos données ont été supprimées avec succès.",
"privacy.delete_error": "Échec de la suppression des données. Veuillez réessayer ou contacter info@webappski.com.",
"privacy.done": "Terminé",
"privacy.link": "Confidentialité"
};
