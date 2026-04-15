// PT translations
export const translations = {
"modal.title": "Conte-nos sobre esses tópicos",
"modal.subtitle":
  "Entendemos qualquer idioma, preencha tudo e traduza se necessário",

"loader.initial": "Preparando formulário...",

// Dynamic progress stages for initAnalyze loading
"loader.stage1": "Analisando campos do formulário...",
"loader.stage2": "Detectando idioma...",
"loader.stage3": "Identificando campos sensíveis...",
"loader.stage4": "Preparando sugestões...",
"loader.stage5": "Quase pronto!",

"button.startSpeaking": "Começar a falar",
"button.stopSpeaking": "Parar gravação",
"button.tryAgain": "Tentar novamente",

"listening.title": "Ouvindo...",
"listening.subtitle": "Fale naturalmente sobre o que deseja preencher",
"processing.title": "Processando...",

// Dynamic progress stages for processing (voice->text->LLM)
"processing.stage1": "Convertendo fala em texto...",
"processing.stage2": "Detectando idioma...",
"processing.stage3": "Compreendendo sua solicitação...",
"processing.stage4": "Extraindo dados...",
"processing.stage5": "Correspondendo com campos do formulário...",
"processing.stage6": "Validando dados...",
"processing.stage7": "Preparando resultados...",
"processing.stage8": "Quase pronto!",

"success.title": "Formul\u00e1rio preenchido!",
"success.subtitle":
  "Revise os campos preenchidos e envie quando estiver pronto",
"success.apply_changes": "Preencher e revisar",
"success.empty_fields": "Não preenchido",
"success.check_fields": "Verificar",
"success.filled_fields": "Preenchido",
"success.field_single": "campo",
"success.fields_multiple": "campos",
"success.require_attention": "requerem atenção",
"success.successfully_filled": "preenchido com sucesso",

"empty.title": "Nenhum campo preenchível encontrado",
"empty.subtitle": "Este formulário não possui campos que possam ser preenchidos por voz",

"error.title": "Erro",
"error.microphone": "Acesso ao microfone necessário",
"error.noFields": "Nenhum formulário detectado nesta página",
"error.noActiveForm":
  "Nenhum formulário ativo encontrado para preenchimento",
"error.lowConfidence":
  "Não foi possível entender claramente o áudio. Por favor, fale mais claramente.",
"error.general": "Algo deu errado. Por favor, tente novamente.",
"error.domainNotAllowed":
  "Este domínio não está autorizado a usar o serviço. Entre em contato com o administrador do site.",
"error.serviceUnavailable":
  "Serviço temporariamente indisponível. Por favor, tente novamente mais tarde ou entre em contato com o administrador do site.",
"error.invalidApiKey": "O serviço não está configurado corretamente. Contacte o administrador do site.",
"error.rateLimited": "O serviço está ocupado neste momento. Tente novamente num instante.",
"error.quotaExhausted": "O limite de utilização deste serviço foi atingido. Contacte o administrador do site.",
"error.no_fields_detected":
  "Não foi possível reconhecer informações para preencher o formulário. Por favor, tente especificar mais claramente quais dados devem ser inseridos nos campos.",
"error.no_data_title": "Dados não reconhecidos",
"error.mic_title": "Microfone necessário",
"error.network_title": "Problema de conexão",
"error.showDetails": "Mostrar detalhes técnicos",

"floatingButton.fillByVoice": "Preencher por voz",

"form.progress.filled": "{count} preenchido",
"form.progress.scrollToSelect": "Role para selecionar",
"form.formNumber": "{current} de {total}",
"form.allForms": "Todos os {count} formulários",
"form.label": "Formulário",
"form.fields": "Campos",
"button.close": "Fechar",
// Consent modal
"consent.title": "Sua Privacidade de Dados",
"consent.subtitle":
  "Por favor, leia atentamente as informações sobre a proteção de seus dados",
"consent.warning_title": "Importante: Não Compartilhe Dados Sensíveis",
"consent.warning":
  "Por favor, não mencione senhas, detalhes de pagamento, identificadores governamentais ou informações médicas. Estes dados não são destinados ao processamento pelo recurso de voz.",
"consent.summary_card1_title": "O Que Coletamos",
"consent.summary_data1": "Gravação de voz → convertida em texto",
"consent.summary_data2":
  "Nomes/tipos/espaços reservados de campos (sem valores; campos sensíveis excluídos)",
"consent.summary_data3":
  "Registros técnicos (IP, informações do navegador)",
"consent.summary_card2_title": "Para Onde Vai",
"consent.summary_transfer":
  "OpenAI (EUA) para processamento de IA • Google Cloud/Firebase (UE, Polônia) para hospedagem e segurança",
"consent.summary_card3_title": "Seus Direitos",
"consent.summary_rights":
  "Retirar consentimento a qualquer momento • Solicitar acesso ou exclusão de seus dados • Detalhes completos na <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Política de Privacidade</a>",
"consent.full_details_title": "Ler Detalhes Completos",
"consent.section1_title": "Quais dados processamos?",
"consent.data1":
  "Gravação de voz. Arquivo de áudio enviado ao OpenAI Whisper através de nosso servidor para transcrição. O arquivo não é salvo no servidor após o processamento.",
"consent.data2":
  "Transcrição de voz (texto). Enviada ao OpenAI GPT para preenchimento de formulários. Por padrão, não salvamos a transcrição em nossos sistemas; nos registros técnicos armazenamos apenas metadados (comprimento do texto, idioma, duração). Importante: a OpenAI pode armazenar dados de solicitação por até 30 dias para prevenir abusos; a exclusão antecipada na OpenAI não está disponível; os dados não são usados para treinamento de modelos.",
"consent.data3":
  "Metadados de campos de formulário. Nomes/tipos/espaços reservados (campos sensíveis excluídos).",
"consent.data4":
  "URL da página. Processado por nossa infraestrutura (para compatibilidade/diagnósticos), NÃO enviado à OpenAI. Evite dados pessoais em parâmetros de consulta de URL.",
"consent.data5":
  "User-Agent do navegador. Usado localmente e por nossa infraestrutura (compatibilidade/segurança), NÃO enviado à OpenAI.",
"consent.data6":
  "Endereço IP. Registrado pela infraestrutura Google Cloud/Firebase para segurança (até 30 dias), NÃO enviado à OpenAI.",
"consent.section2_title":
  "Para onde e com base em qual fundamento legal os dados são transferidos?",
"consent.recipients":
  "Destinatários. OpenAI (EUA) — processamento de áudio/texto; Google Cloud/Firebase (UE/Polônia) — hospedagem e registros de segurança. Os dados não são usados para treinamento de modelos.",
"consent.transfer1":
  "OpenAI (EUA). Solicitações à OpenAI (incluindo áudio/texto) podem ser armazenadas pela OpenAI por até 30 dias para prevenir abusos; os dados não são usados para treinamento de modelos. Transferência para os EUA — com base em CCPs aprovadas pela Comissão Europeia.",
"consent.basis_title": "Bases legais:",
"consent.basis1": "Recurso de voz — seu consentimento (Art. 6(1)(a) GDPR).",
"consent.basis2":
  "Registros técnicos (IP/UA/URL) — interesses legítimos (Art. 6(1)(f)) — segurança e depuração.",
"consent.section3_title": "Seus direitos",
"consent.rights1":
  "Você pode retirar o consentimento nas configurações do widget a qualquer momento; isso não afeta a legalidade do processamento antes da retirada.",
"consent.rights2":
  "Além de retirar o consentimento, você tem o direito de solicitar acesso ou exclusão de seus dados armazenados em nossos sistemas (registros técnicos, métricas de custo) através do proprietário do site. Detalhes completos na <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Política de Privacidade</a>.",
"consent.rights3":
  "Este recurso é destinado a usuários com 16 anos ou mais; para usuários mais jovens, é necessário o consentimento dos pais/responsável.",
"consent.footer_legal_title": "Informações Legais",
"consent.footer_controller":
  "Controlador de Dados: o proprietário deste site.",
"consent.footer_processor": "TypelessForm: atua como processador.",
"consent.footer_contact": "Contato de privacidade: info@webappski.com.",
"consent.footer_sccs":
  "A transferência para os EUA é realizada sob CCPs. Detalhes estão disponíveis em nossa <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Política de Privacidade</a>.",
"consent.accept": "Eu Aceito",

// Consent checkboxes
"consent.checkbox_main": "Consinto no processamento dos meus dados de voz e metadados de formulário pela TypelessForm e na transferência internacional para os EUA (OpenAI) sob SCCs, conforme descrito na <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>Política de Privacidade</a>.",
"consent.checkbox_age": "Confirmo que tenho 16+ anos ou tenho consentimento de um responsável.",

// Privacy settings / data deletion
"privacy.title": "Privacidade e dados",
"privacy.subtitle": "Gerir o seu consentimento e dados",
"privacy.info_title": "O seu registo de consentimento",
"privacy.user_id": "Identificador",
"privacy.consent_date": "Consentimento dado",
"privacy.policy_version": "Versão da política",
"privacy.usage_count": "Número de utilizações",
"privacy.no_data": "Nenhum dado de consentimento encontrado neste dispositivo.",
"privacy.delete_title": "Eliminar os meus dados",
"privacy.delete_description": "Isto eliminará permanentemente todos os seus registos de consentimento dos nossos servidores e limpará os dados locais. Esta ação não pode ser revertida.",
"privacy.delete_confirm": "Compreendo que é permanente",
"privacy.delete_button": "Eliminar os meus dados",
"privacy.deleting": "A eliminar...",
"privacy.delete_success": "Todos os seus dados foram eliminados com sucesso.",
"privacy.delete_error": "Falha ao eliminar dados. Tente novamente ou contacte info@webappski.com.",
"privacy.done": "Concluído",
"privacy.link": "Privacidade"
};
