// ES translations
export const translations = {
"modal.title": "Cuéntanos sobre estos temas",
"modal.subtitle":
  "Entendemos cualquier idioma, completa todo y traduce si es necesario",

"button.startSpeaking": "Comenzar a hablar",
"button.stopSpeaking": "Detener grabación",
"button.tryAgain": "Intentar de nuevo",

"listening.title": "Escuchando...",
"listening.subtitle": "Habla de forma natural sobre lo que deseas rellenar",
"processing.title": "Procesando...",

// Dynamic progress stages for processing (voice->text->LLM)
"processing.stage1": "Convirtiendo voz en texto...",
"processing.stage2": "Detectando idioma...",
"processing.stage3": "Comprendiendo tu solicitud...",
"processing.stage4": "Extrayendo datos...",
"processing.stage5": "Asociando con campos del formulario...",
"processing.stage6": "Validando datos...",
"processing.stage7": "Preparando resultados...",
"processing.stage8": "¡Casi listo!",

"success.title": "\u00a1Formulario rellenado!",
"success.subtitle":
  "Revisa los campos rellenados y envía cuando estés listo",
"success.apply_changes": "Completar y revisar",
"success.empty_fields": "No completado",
"success.check_fields": "Verificar",
"success.filled_fields": "Completado",
"success.field_single": "campo",
"success.fields_multiple": "campos",
"success.require_attention": "requieren atención",
"success.successfully_filled": "llenado exitosamente",

"empty.title": "No se encontraron campos rellenables",
"empty.subtitle": "Este formulario no tiene campos que puedan completarse por voz",

"error.title": "Error",
"error.microphone": "Se requiere acceso al micrófono",
"error.noFields": "No se detectaron formularios en esta página",
"error.noActiveForm": "No se encontró un formulario activo para rellenar",
"error.lowConfidence":
  "No se pudo entender claramente el audio. Por favor, habla más claramente.",
"error.general": "Algo salió mal. Por favor, inténtalo de nuevo.",
"error.domainNotAllowed":
  "Este dominio no está autorizado para usar el servicio. Por favor, contacte al administrador del sitio web.",
"error.serviceUnavailable":
  "Servicio temporalmente no disponible. Por favor, inténtelo más tarde o contacte al administrador del sitio web.",
"error.invalidApiKey": "El servicio no está configurado correctamente. Contacte al administrador del sitio web.",
"error.rateLimited": "El servicio está ocupado en este momento. Inténtelo de nuevo en un momento.",
"error.quotaExhausted": "Se ha alcanzado el límite de uso de este servicio. Contacte al administrador del sitio web.",
"error.no_fields_detected":
  "No se pudo reconocer información para rellenar el formulario. Por favor, intenta especificar más claramente qué datos deben ingresarse en los campos.",
"error.no_data_title": "Datos no reconocidos",
"error.mic_title": "Micrófono requerido",
"error.network_title": "Problema de conexión",
"error.showDetails": "Mostrar detalles técnicos",

"loader.initial": "Preparando formulario...",

// Dynamic progress stages for initAnalyze loading
"loader.stage1": "Analizando campos del formulario...",
"loader.stage2": "Detectando idioma...",
"loader.stage3": "Identificando campos sensibles...",
"loader.stage4": "Preparando sugerencias...",
"loader.stage5": "¡Casi listo!",

"floatingButton.fillByVoice": "Llenar por voz",

"form.progress.filled": "{count} rellenado",
"form.progress.scrollToSelect": "Desplázate para seleccionar",
"form.formNumber": "{current} de {total}",
"form.allForms": "Todos los {count} formularios",
"form.label": "Formulario",
"form.fields": "Campos",
"button.close": "Cerrar",
// Consent modal
"consent.title": "Su Privacidad de Datos",
"consent.subtitle":
  "Por favor, lea atentamente la información sobre la protección de sus datos",
"consent.warning_title": "Importante: No Comparta Datos Sensibles",
"consent.warning":
  "Por favor, no mencione contraseñas, detalles de pago, identificadores gubernamentales o información médica. Estos datos no están destinados a ser procesados por la función de voz.",
"consent.summary_card1_title": "Qué Recopilamos",
"consent.summary_data1": "Grabación de voz → convertida a texto",
"consent.summary_data2":
  "Nombres/tipos/marcadores de posición de campos (sin valores; campos sensibles excluidos)",
"consent.summary_data3":
  "Registros técnicos (IP, información del navegador)",
"consent.summary_card2_title": "A Dónde Va",
"consent.summary_transfer":
  "OpenAI (EE.UU.) para procesamiento de IA • Google Cloud/Firebase (UE, Polonia) para alojamiento y seguridad",
"consent.summary_card3_title": "Sus Derechos",
"consent.summary_rights":
  "Retirar consentimiento en cualquier momento • Solicitar acceso o eliminación de sus datos • Detalles completos en la <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Política de Privacidad</a>",
"consent.full_details_title": "Leer Detalles Completos",
"consent.section1_title": "¿Qué datos procesamos?",
"consent.data1":
  "Grabación de voz. Archivo de audio enviado a OpenAI Whisper a través de nuestro servidor para transcripción. El archivo no se guarda en el servidor después del procesamiento.",
"consent.data2":
  "Transcripción de voz (texto). Enviada a OpenAI GPT para completar formularios. Por defecto, no guardamos la transcripción en nuestros sistemas; en los registros técnicos almacenamos solo metadatos (longitud del texto, idioma, duración). Importante: OpenAI puede almacenar datos de solicitud hasta 30 días para prevenir abusos; la eliminación anticipada en OpenAI no está disponible; los datos no se utilizan para entrenar modelos.",
"consent.data3":
  "Metadatos de campos de formulario. Nombres/tipos/marcadores de posición (campos sensibles excluidos).",
"consent.data4":
  "URL de la página. Procesada por nuestra infraestructura (para compatibilidad/diagnósticos), NO enviada a OpenAI. Por favor, evite datos personales en parámetros de consulta de URL.",
"consent.data5":
  "User-Agent del navegador. Utilizado localmente y por nuestra infraestructura (compatibilidad/seguridad), NO enviado a OpenAI.",
"consent.data6":
  "Dirección IP. Registrada por la infraestructura de Google Cloud/Firebase para seguridad (hasta 30 días), NO enviada a OpenAI.",
"consent.section2_title":
  "¿A dónde y sobre qué base legal se transfieren los datos?",
"consent.recipients":
  "Destinatarios. OpenAI (EE.UU.) — procesamiento de audio/texto; Google Cloud/Firebase (UE/Polonia) — alojamiento y registros de seguridad. Los datos no se utilizan para entrenar modelos.",
"consent.transfer1":
  "OpenAI (EE.UU.). Las solicitudes a OpenAI (incluyendo audio/texto) pueden ser almacenadas por OpenAI hasta 30 días para prevenir abusos; los datos no se utilizan para entrenar modelos. Transferencia a EE.UU. — basada en SCC aprobadas por la Comisión Europea.",
"consent.basis_title": "Bases legales:",
"consent.basis1": "Función de voz — su consentimiento (Art. 6(1)(a) RGPD).",
"consent.basis2":
  "Registros técnicos (IP/UA/URL) — intereses legítimos (Art. 6(1)(f)) — seguridad y depuración.",
"consent.section3_title": "Sus derechos",
"consent.rights1":
  "Puede retirar el consentimiento en la configuración del widget en cualquier momento; esto no afecta la legalidad del procesamiento antes de la retirada.",
"consent.rights2":
  "Además de retirar el consentimiento, tiene derecho a solicitar acceso o eliminación de sus datos almacenados en nuestros sistemas (registros técnicos, métricas de costos) a través del propietario del sitio web. Detalles completos en la <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Política de Privacidad</a>.",
"consent.rights3":
  "Esta función está destinada a usuarios de 16+; para usuarios más jóvenes, se requiere el consentimiento de padres/tutores.",
"consent.footer_legal_title": "Información Legal",
"consent.footer_controller":
  "Responsable del Tratamiento: el propietario de este sitio web.",
"consent.footer_processor":
  "TypelessForm: actúa como encargado del tratamiento.",
"consent.footer_contact": "Contacto de privacidad: info@webappski.com.",
"consent.footer_sccs":
  "La transferencia a EE.UU. se realiza bajo SCC. Los detalles están disponibles en nuestra <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Política de Privacidad</a>.",
"consent.accept": "Acepto",

// Consent checkboxes
"consent.checkbox_main": "Doy mi consentimiento para el procesamiento de mis datos de voz y metadatos de formulario por TypelessForm y para la transferencia internacional a EE.UU. (OpenAI) bajo SCCs, según se describe en la <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Política de Privacidad</a>.",
"consent.checkbox_age": "Confirmo que tengo 16+ años o cuento con el consentimiento de mis padres/tutores.",

// Privacy settings / data deletion
"privacy.title": "Privacidad y datos",
"privacy.subtitle": "Gestionar su consentimiento y datos",
"privacy.info_title": "Su registro de consentimiento",
"privacy.user_id": "Identificador",
"privacy.consent_date": "Consentimiento dado",
"privacy.policy_version": "Versión de la política",
"privacy.usage_count": "Número de usos",
"privacy.no_data": "No se encontraron datos de consentimiento en este dispositivo.",
"privacy.delete_title": "Eliminar mis datos",
"privacy.delete_description": "Esto eliminará permanentemente todos sus registros de consentimiento de nuestros servidores y borrará los datos locales. Esta acción no se puede deshacer.",
"privacy.delete_confirm": "Entiendo que esto es permanente",
"privacy.delete_button": "Eliminar mis datos",
"privacy.deleting": "Eliminando...",
"privacy.delete_success": "Todos sus datos han sido eliminados exitosamente.",
"privacy.delete_error": "No se pudieron eliminar los datos. Inténtelo de nuevo o contacte a info@webappski.com.",
"privacy.done": "Hecho",
"privacy.link": "Privacidad"
};
