// KO translations
export const translations = {
"modal.title": "이 주제들에 대해 알려주세요",
"modal.subtitle":
  "모든 언어를 이해하며, 필요하다면 자동으로 채우고 번역합니다",

"button.startSpeaking": "말하기 시작",
"button.stopSpeaking": "녹음 중지",
"button.tryAgain": "다시 시도",

"listening.title": "듣는 중...",
"listening.subtitle": "채우고 싶은 내용을 자연스럽게 말하세요",
"processing.title": "처리 중...",

"success.title": "양식이 채워졌습니다!",
"success.subtitle": "채워진 필드를 검토하고 준비되면 제출하세요",
"empty.title": "입력 가능한 필드를 찾을 수 없습니다",
"empty.subtitle": "이 양식에는 음성으로 입력할 수 있는 필드가 없습니다",

"error.title": "오류",
"error.microphone": "마이크 접근이 필요합니다",
"error.noFields": "이 페이지에서 양식이 감지되지 않았습니다",
"error.general": "문제가 발생했습니다. 다시 시도해주세요.",
"error.domainNotAllowed":
  "이 도메인은 서비스 사용이 승인되지 않았습니다. 웹사이트 관리자에게 문의해주세요.",
"error.invalidApiKey": "서비스가 올바르게 구성되지 않았습니다. 웹사이트 관리자에게 문의하세요.",
"error.rateLimited": "서비스가 현재 바쁩니다. 잠시 후 다시 시도해 주세요.",
"error.quotaExhausted": "이 서비스의 사용 한도에 도달했습니다. 웹사이트 관리자에게 문의하세요.",
"error.no_fields_detected":
  "양식을 채우기 위한 정보를 인식할 수 없었습니다. 필드에 입력해야 할 데이터를 더 명확하게 지정해 주세요.",
"error.no_data_title": "데이터가 인식되지 않았습니다",
"error.mic_title": "마이크 필요",
"error.network_title": "연결 문제",
"error.showDetails": "기술적 세부사항 표시",

"floatingButton.fillByVoice": "음성으로 채우기",

"form.progress.filled": "{count}개 작성됨",
"form.progress.scrollToSelect": "스크롤하여 선택",
"form.formNumber": "{current} / {total}",
"form.allForms": "모든 {count}개 양식",
"form.label": "양식",
"form.fields": "필드",

"loader.initial": "양식 준비 중...",

// Dynamic progress stages for initAnalyze loading
"loader.stage1": "양식 필드 분석 중...",
"loader.stage2": "언어 감지 중...",
"loader.stage3": "민감한 필드 식별 중...",
"loader.stage4": "제안 준비 중...",
"loader.stage5": "거의 완료!",

// Dynamic progress stages for processing (voice->text->LLM)
"processing.stage1": "음성을 텍스트로 변환 중...",
"processing.stage2": "언어 감지 중...",
"processing.stage3": "요청 이해 중...",
"processing.stage4": "데이터 추출 중...",
"processing.stage5": "양식 필드와 매칭 중...",
"processing.stage6": "데이터 검증 중...",
"processing.stage7": "결과 준비 중...",
"processing.stage8": "거의 완료!",

"success.apply_changes": "작성 및 검토",
"success.empty_fields": "입력되지 않음",
"success.check_fields": "확인",
"success.filled_fields": "완료",
"success.field_single": "필드",
"success.fields_multiple": "필드",
"success.require_attention": "주의가 필요합니다",
"success.successfully_filled": "성공적으로 입력되었습니다",

"error.noActiveForm": "채울 활성 양식을 찾을 수 없습니다",
"error.lowConfidence":
  "오디오를 명확하게 이해할 수 없었습니다. 더 또렷하게 말씀해주세요.",
"button.close": "닫기",

// Consent modal
"consent.title": "귀하의 데이터 프라이버시",
"consent.subtitle": "귀하의 데이터 보호에 관한 정보를 주의 깊게 읽어주세요",
"consent.warning_title": "중요: 민감한 데이터를 공유하지 마세요",
"consent.warning":
  "비밀번호, 결제 세부정보, 정부 식별자 또는 의료 정보를 언급하지 마세요. 이러한 데이터는 음성 기능으로 처리되도록 의도되지 않았습니다.",
"consent.summary_card1_title": "수집하는 정보",
"consent.summary_data1": "음성 녹음 → 텍스트로 변환",
"consent.summary_data2":
  "필드 이름/유형/자리 표시자(값 없음; 민감한 필드 제외)",
"consent.summary_data3": "기술 로그(IP, 브라우저 정보)",
"consent.summary_card2_title": "데이터 전송 위치",
"consent.summary_transfer":
  "OpenAI(미국) AI 처리 • Google Cloud/Firebase(EU, 폴란드) 호스팅 및 보안",
"consent.summary_card3_title": "귀하의 권리",
"consent.summary_rights":
  "언제든지 동의 철회 • 데이터 접근 또는 삭제 요청 • <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>개인정보 보호정책</a>의 전체 세부정보",
"consent.full_details_title": "전체 세부정보 읽기",
"consent.section1_title": "어떤 데이터를 처리합니까?",
"consent.data1":
  "음성 녹음. 오디오 파일이 전사를 위해 당사 서버를 통해 OpenAI Whisper로 전송됩니다. 파일은 처리 후 서버에 저장되지 않습니다.",
"consent.data2":
  "음성 전사(텍스트). 양식 작성을 위해 OpenAI GPT로 전송됩니다. 기본적으로 시스템에 전사를 저장하지 않습니다. 기술 로그에는 메타데이터(텍스트 길이, 언어, 기간)만 저장합니다. 중요: OpenAI는 남용 방지를 위해 최대 30일간 요청 데이터를 저장할 수 있습니다. OpenAI에서 조기 삭제는 불가능합니다. 데이터는 모델 훈련에 사용되지 않습니다.",
"consent.data3":
  "양식 필드 메타데이터. 이름/유형/자리 표시자(민감한 필드 제외).",
"consent.data4":
  "페이지 URL. 당사 인프라에서 처리됩니다(호환성/진단용). OpenAI로 전송되지 않습니다. URL 쿼리 매개변수에 개인 데이터를 넣지 마세요.",
"consent.data5":
  "브라우저 User-Agent. 로컬 및 당사 인프라에서 사용됩니다(호환성/보안). OpenAI로 전송되지 않습니다.",
"consent.data6":
  "IP 주소. Google Cloud/Firebase 인프라에서 보안을 위해 기록됩니다(최대 30일). OpenAI로 전송되지 않습니다.",
"consent.section2_title": "어디로, 어떤 법적 근거로 데이터가 전송됩니까?",
"consent.recipients":
  "수신자. OpenAI(미국) — 오디오/텍스트 처리; Google Cloud/Firebase(EU/폴란드) — 호스팅 및 보안 로그. 데이터는 모델 훈련에 사용되지 않습니다.",
"consent.transfer1":
  "OpenAI(미국). OpenAI에 대한 요청(오디오/텍스트 포함)은 남용 방지를 위해 최대 30일간 OpenAI에 저장될 수 있습니다. 데이터는 모델 훈련에 사용되지 않습니다. 미국으로의 전송 — 유럽 위원회가 승인한 SCC를 기반으로 합니다.",
"consent.basis_title": "법적 근거:",
"consent.basis1": "음성 기능 — 귀하의 동의(GDPR 제6조 제1항 a호).",
"consent.basis2":
  "기술 로그(IP/UA/URL) — 정당한 이익(제6조 제1항 f호) — 보안 및 디버깅.",
"consent.section3_title": "귀하의 권리",
"consent.rights1":
  "위젯 설정에서 언제든지 동의를 철회할 수 있습니다. 이는 철회 전 처리의 합법성에 영향을 미치지 않습니다.",
"consent.rights2":
  "동의 철회 외에도 웹사이트 소유자를 통해 당사 시스템에 저장된 데이터(기술 로그, 비용 메트릭)에 대한 접근 또는 삭제를 요청할 권리가 있습니다. <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>개인정보 보호정책</a>의 전체 세부정보를 참조하세요.",
"consent.rights3":
  "이 기능은 16세 이상 사용자를 대상으로 합니다. 더 어린 사용자의 경우 부모/보호자의 동의가 필요합니다.",
"consent.footer_legal_title": "법적 정보",
"consent.footer_controller": "데이터 관리자: 이 웹사이트의 소유자.",
"consent.footer_processor": "TypelessForm: 처리자로 활동합니다.",
"consent.footer_contact": "개인정보 보호 연락처: info@webappski.com.",
"consent.footer_sccs":
  "미국으로의 전송은 SCC에 따라 수행됩니다. 세부정보는 당사 <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>개인정보 보호정책</a>에서 확인할 수 있습니다.",
"consent.accept": "동의합니다",

// Consent checkboxes
"consent.checkbox_main": "<a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>개인정보 보호정책</a>에 명시된 대로 TypelessForm의 음성 및 양식 메타데이터 처리 및 SCC에 따른 미국(OpenAI)으로의 국제 전송에 동의합니다.",
"consent.checkbox_age": "만 16세 이상이거나 부모/보호자의 동의가 있음을 확인합니다.",

// Privacy settings / data deletion
"privacy.title": "개인정보 및 데이터",
"privacy.subtitle": "동의 및 데이터 관리",
"privacy.info_title": "동의 기록",
"privacy.user_id": "식별자",
"privacy.consent_date": "동의 날짜",
"privacy.policy_version": "정책 버전",
"privacy.usage_count": "사용 횟수",
"privacy.no_data": "이 기기에서 동의 데이터를 찾을 수 없습니다.",
"privacy.delete_title": "내 데이터 삭제",
"privacy.delete_description": "이렇게 하면 서버에서 모든 동의 기록이 영구적으로 삭제되고 로컬 데이터가 지워집니다. 이 작업은 취소할 수 없습니다.",
"privacy.delete_confirm": "이것이 영구적임을 이해합니다",
"privacy.delete_button": "내 데이터 삭제",
"privacy.deleting": "삭제 중...",
"privacy.delete_success": "모든 데이터가 성공적으로 삭제되었습니다.",
"privacy.delete_error": "데이터 삭제에 실패했습니다. 다시 시도하거나 info@webappski.com으로 문의하세요.",
"privacy.done": "완료",
"privacy.link": "개인정보"
};
