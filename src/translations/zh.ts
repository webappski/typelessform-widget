// ZH translations
export const translations = {
"modal.title": "告诉我们这些主题",
"modal.subtitle": "我们可以理解任何语言，自动填写所有内容，并在需要时翻译",

"loader.initial": "正在准备表单...",

// Dynamic progress stages for initAnalyze loading
"loader.stage1": "正在分析表单字段...",
"loader.stage2": "正在检测语言...",
"loader.stage3": "正在识别敏感字段...",
"loader.stage4": "正在准备建议...",
"loader.stage5": "快好了！",

"button.startSpeaking": "开始说话",
"button.stopSpeaking": "停止录制",
"button.tryAgain": "重试",

"listening.title": "正在聆听...",
"listening.subtitle": "请自然地说出您想要填写的内容",

"processing.title": "正在处理...",

// Dynamic progress stages for processing (voice->text->LLM)
"processing.stage1": "正在将语音转换为文字...",
"processing.stage2": "正在检测语言...",
"processing.stage3": "正在理解您的请求...",
"processing.stage4": "正在提取数据...",
"processing.stage5": "正在匹配表单字段...",
"processing.stage6": "正在验证数据...",
"processing.stage7": "正在准备结果...",
"processing.stage8": "快好了！",

"success.title": "表单已填写！",
"success.subtitle": "查看已填写的字段，准备好后提交",
"success.apply_changes": "填写并检查",
"success.empty_fields": "未填写",
"success.check_fields": "检查",
"success.filled_fields": "已完成",
"success.field_single": "字段",
"success.fields_multiple": "字段",
"success.require_attention": "需要注意",
"success.successfully_filled": "成功填写",

"empty.title": "未找到可填写的字段",
"empty.subtitle": "此表单没有可以通过语音填写的字段",

"error.title": "错误",
"error.microphone": "需要麦克风访问权限",
"error.noFields": "此页面未检测到表单",
"error.noActiveForm": "未找到可填写的活动表单",
"error.lowConfidence": "无法清楚地理解音频。请说得更清楚一些。",
"error.general": "出现错误，请重试。",
"error.domainNotAllowed": "该域名未被授权使用此服务。请联系网站管理员。",
"error.serviceUnavailable": "服务暂时不可用。请稍后重试或联系网站管理员。",
"error.invalidApiKey": "服务配置不正确。请联系网站管理员。",
"error.rateLimited": "服务当前繁忙。请稍后再试。",
"error.quotaExhausted": "此服务的使用限额已达到。请联系网站管理员。",
"error.no_fields_detected":
  "无法识别填写表单的信息。请尝试更清楚地指定应在字段中输入哪些数据。",
"error.no_data_title": "数据未识别",
"error.mic_title": "需要麦克风",
"error.network_title": "连接问题",
"error.showDetails": "显示技术细节",

"floatingButton.fillByVoice": "语音填写",

"form.progress.filled": "{count} 已填写",
"form.progress.scrollToSelect": "滚动选择",
"form.formNumber": "{current} / {total}",
"form.allForms": "全部 {count} 个表单",
"form.label": "表单",
"form.fields": "字段",
"button.close": "关闭",
// Consent modal
"consent.title": "您的数据隐私",
"consent.subtitle": "请仔细阅读有关数据保护的信息",
"consent.warning_title": "重要提示：请勿分享敏感数据",
"consent.warning":
  "请勿说出密码、支付详情、政府标识符或医疗信息。这些数据不适用于语音功能处理。",
"consent.summary_card1_title": "我们收集的内容",
"consent.summary_data1": "语音录音 → 转换为文本",
"consent.summary_data2": "字段名称/类型/占位符(无值;排除敏感字段)",
"consent.summary_data3": "技术日志(IP、浏览器信息)",
"consent.summary_card2_title": "数据去向",
"consent.summary_transfer":
  "OpenAI(美国)用于AI处理 • Google Cloud/Firebase(欧盟、波兰)用于托管和安全",
"consent.summary_card3_title": "您的权利",
"consent.summary_rights":
  "随时撤回同意 • 请求访问或删除您的数据 • <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>隐私政策</a>中的完整详细信息",
"consent.full_details_title": "阅读完整详细信息",
"consent.section1_title": "我们处理哪些数据?",
"consent.data1":
  "语音录音。音频文件通过我们的服务器发送到OpenAI Whisper进行转录。处理后文件不会保存在服务器上。",
"consent.data2":
  "语音转录(文本)。发送到OpenAI GPT用于表单填写。默认情况下,我们不在系统中保存转录;在技术日志中我们仅存储元数据(文本长度、语言、时长)。重要提示:OpenAI可能会存储请求数据长达30天以防止滥用;OpenAI不提供提前删除;数据不用于模型训练。",
"consent.data3": "表单字段元数据。名称/类型/占位符(排除敏感字段)。",
"consent.data4":
  "页面URL。由我们的基础设施处理(用于兼容性/诊断),不发送到OpenAI。请避免在URL查询参数中包含个人数据。",
"consent.data5":
  "浏览器User-Agent。在本地和我们的基础设施中使用(兼容性/安全),不发送到OpenAI。",
"consent.data6":
  "IP地址。由Google Cloud/Firebase基础设施记录用于安全(最多30天),不发送到OpenAI。",
"consent.section2_title": "数据传输到何处以及基于何种法律依据?",
"consent.recipients":
  "接收方。OpenAI(美国)——音频/文本处理;Google Cloud/Firebase(欧盟/波兰)——托管和安全日志。数据不用于模型训练。",
"consent.transfer1":
  "OpenAI(美国)。向OpenAI发送的请求(包括音频/文本)可能会被OpenAI存储长达30天以防止滥用;数据不用于模型训练。传输到美国——基于欧盟委员会批准的SCC。",
"consent.basis_title": "法律依据:",
"consent.basis1": "语音功能——您的同意(GDPR第6(1)(a)条)。",
"consent.basis2":
  "技术日志(IP/UA/URL)——合法利益(第6(1)(f)条)——安全和调试。",
"consent.section3_title": "您的权利",
"consent.rights1":
  "您可以随时在小部件设置中撤回同意;这不影响撤回前处理的合法性。",
"consent.rights2":
  "除撤回同意外,您还有权通过网站所有者请求访问或删除存储在我们系统中的数据(技术日志、成本指标)。<a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>隐私政策</a>中的完整详细信息。",
"consent.rights3":
  "此功能适用于16岁以上用户;对于年轻用户,需要父母/监护人同意。",
"consent.footer_legal_title": "法律信息",
"consent.footer_controller": "数据控制者:本网站的所有者。",
"consent.footer_processor": "TypelessForm:充当处理者。",
"consent.footer_contact": "隐私联系方式:info@webappski.com。",
"consent.footer_sccs":
  "向美国的传输根据SCC进行。详细信息可在我们的<a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>隐私政策</a>中查看。",
"consent.accept": "我接受",

// Consent checkboxes
"consent.checkbox_main": "我同意 TypelessForm 处理我的语音和表单元数据，并根据 SCC 向美国（OpenAI）进行国际传输，如<a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>隐私政策</a>中所述。",
"consent.checkbox_age": "我确认我已年满 16 岁或已获得父母/监护人的同意。",

// Privacy settings / data deletion
"privacy.title": "隐私与数据",
"privacy.subtitle": "管理您的同意和数据",
"privacy.info_title": "您的同意记录",
"privacy.user_id": "标识符",
"privacy.consent_date": "同意日期",
"privacy.policy_version": "政策版本",
"privacy.usage_count": "使用次数",
"privacy.no_data": "此设备上未找到同意数据。",
"privacy.delete_title": "删除我的数据",
"privacy.delete_description": "这将永久删除我们服务器上的所有同意记录并清除本地数据。此操作无法撤销。",
"privacy.delete_confirm": "我理解这是永久性的",
"privacy.delete_button": "删除我的数据",
"privacy.deleting": "正在删除...",
"privacy.delete_success": "您的所有数据已成功删除。",
"privacy.delete_error": "删除数据失败。请重试或联系 info@webappski.com。",
"privacy.done": "完成",
"privacy.link": "隐私"
};
