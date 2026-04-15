// JA translations
export const translations = {
"modal.title": "これらのトピックについて教えてください",
"modal.subtitle":
  "どの言語でも理解し、必要に応じてすべてを入力し翻訳します",

"loader.initial": "フォームを準備しています...",

// Dynamic progress stages for initAnalyze loading
"loader.stage1": "フォームフィールドを分析中...",
"loader.stage2": "言語を検出中...",
"loader.stage3": "機密フィールドを識別中...",
"loader.stage4": "提案を準備中...",
"loader.stage5": "もうすぐです!",

"button.startSpeaking": "話し始める",
"button.stopSpeaking": "録音を停止",
"button.tryAgain": "再試行",

"listening.title": "リッスン中...",
"listening.subtitle": "入力したい内容を自然に話してください",
"processing.title": "処理中...",

// Dynamic progress stages for processing (voice->text->LLM)
"processing.stage1": "音声をテキストに変換中...",
"processing.stage2": "言語を検出中...",
"processing.stage3": "リクエストを理解中...",
"processing.stage4": "データを抽出中...",
"processing.stage5": "フォームフィールドと照合中...",
"processing.stage6": "データを検証中...",
"processing.stage7": "結果を準備中...",
"processing.stage8": "もうすぐです!",

"success.title": "フォームが入力されました！",
"success.subtitle":
  "入力されたフィールドを確認し、準備ができたら送信してください",
"success.apply_changes": "入力して確認",
"success.empty_fields": "未入力",
"success.check_fields": "確認",
"success.filled_fields": "完了",
"success.field_single": "フィールド",
"success.fields_multiple": "フィールド",
"success.require_attention": "注意が必要です",
"success.successfully_filled": "正常に入力されました",

"empty.title": "入力可能なフィールドが見つかりません",
"empty.subtitle": "このフォームには音声で入力できるフィールドがありません",

"error.title": "エラー",
"error.microphone": "マイクアクセスが必要です",
"error.noFields": "このページにフォームが見つかりませんでした",
"error.noActiveForm": "入力可能なアクティブなフォームが見つかりません",
"error.lowConfidence":
  "音声を明確に理解できませんでした。もっとはっきりと話してください。",
"error.general": "問題が発生しました。もう一度お試しください。",
"error.domainNotAllowed":
  "このドメインはサービスの使用を許可されていません。ウェブサイト管理者にお問い合わせください。",
"error.serviceUnavailable":
  "サービスは一時的に利用できません。後でもう一度お試しいただくか、ウェブサイト管理者にお問い合わせください。",
"error.invalidApiKey": "サービスが正しく設定されていません。ウェブサイトの管理者にお問い合わせください。",
"error.rateLimited": "サービスが混み合っています。しばらくしてからもう一度お試しください。",
"error.quotaExhausted": "このサービスの利用上限に達しました。ウェブサイトの管理者にお問い合わせください。",
"error.no_fields_detected":
  "フォームに入力する情報を認識できませんでした。フィールドに入力すべきデータをより明確に指定してください。",
"error.no_data_title": "データが認識されませんでした",
"error.mic_title": "マイクが必要です",
"error.network_title": "接続の問題",
"error.showDetails": "技術的な詳細を表示",

"floatingButton.fillByVoice": "音声で入力",

"form.progress.filled": "{count} 入力済み",
"form.progress.scrollToSelect": "スクロールして選択",
"form.formNumber": "{current} / {total}",
"form.allForms": "すべての {count} フォーム",
"form.label": "フォーム",
"form.fields": "フィールド",
"button.close": "閉じる",
// Consent modal
"consent.title": "データプライバシー",
"consent.subtitle": "データ保護に関する情報を注意深くお読みください",
"consent.warning_title": "重要:機密データを共有しないでください",
"consent.warning":
  "パスワード、支払い詳細、政府発行の識別子、医療情報は述べないでください。このデータは音声機能による処理を意図していません。",
"consent.summary_card1_title": "収集するもの",
"consent.summary_data1": "音声録音 → テキストに変換",
"consent.summary_data2":
  "フィールド名/タイプ/プレースホルダー(値なし;機密フィールドは除外)",
"consent.summary_data3": "技術ログ(IP、ブラウザ情報)",
"consent.summary_card2_title": "データの送信先",
"consent.summary_transfer":
  "OpenAI(米国)AI処理用 • Google Cloud/Firebase(EU、ポーランド)ホスティングとセキュリティ用",
"consent.summary_card3_title": "あなたの権利",
"consent.summary_rights":
  "いつでも同意を撤回 • データへのアクセスまたは削除を要求 • <a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>プライバシーポリシー</a>の詳細",
"consent.full_details_title": "詳細を読む",
"consent.section1_title": "処理するデータは何ですか?",
"consent.data1":
  "音声録音。オーディオファイルは、転写のために当社のサーバー経由でOpenAI Whisperに送信されます。ファイルは処理後、サーバーに保存されません。",
"consent.data2":
  "音声転写(テキスト)。フォーム入力のためにOpenAI GPTに送信されます。デフォルトでは、システムに転写を保存しません。技術ログにはメタデータ(テキスト長、言語、期間)のみを保存します。重要:OpenAIは不正使用防止のため最大30日間リクエストデータを保存する場合があります。OpenAIでの早期削除は利用できません。データはモデルトレーニングには使用されません。",
"consent.data3":
  "フォームフィールドのメタデータ。名前/タイプ/プレースホルダー(機密フィールドは除外)。",
"consent.data4":
  "ページURL。当社のインフラストラクチャで処理されます(互換性/診断用)。OpenAIには送信されません。URLクエリパラメータに個人データを含めないでください。",
"consent.data5":
  "ブラウザUser-Agent。ローカルおよび当社のインフラストラクチャで使用されます(互換性/セキュリティ)。OpenAIには送信されません。",
"consent.data6":
  "IPアドレス。セキュリティのためGoogle Cloud/Firebaseインフラストラクチャで記録されます(最大30日)。OpenAIには送信されません。",
"consent.section2_title":
  "データはどこに、どのような法的根拠で転送されますか?",
"consent.recipients":
  "受信者。OpenAI(米国)—オーディオ/テキスト処理。Google Cloud/Firebase(EU/ポーランド)—ホスティングとセキュリティログ。データはモデルトレーニングには使用されません。",
"consent.transfer1":
  "OpenAI(米国)。OpenAIへのリクエスト(オーディオ/テキストを含む)は、不正使用防止のため最大30日間OpenAIによって保存される場合があります。データはモデルトレーニングには使用されません。米国への転送—欧州委員会承認のSCCに基づきます。",
"consent.basis_title": "法的根拠:",
"consent.basis1": "音声機能—お客様の同意(GDPR第6(1)(a)条)。",
"consent.basis2":
  "技術ログ(IP/UA/URL)—正当な利益(第6(1)(f)条)—セキュリティとデバッグ。",
"consent.section3_title": "あなたの権利",
"consent.rights1":
  "ウィジェット設定でいつでも同意を撤回できます。撤回前の処理の合法性には影響しません。",
"consent.rights2":
  "同意の撤回に加えて、ウェブサイト所有者を通じて、当社のシステムに保存されているデータ(技術ログ、コストメトリクス)へのアクセスまたは削除を要求する権利があります。<a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>プライバシーポリシー</a>の詳細をご覧ください。",
"consent.rights3":
  "この機能は16歳以上のユーザーを対象としています。若いユーザーには保護者/後見人の同意が必要です。",
"consent.footer_legal_title": "法的情報",
"consent.footer_controller": "データ管理者:このウェブサイトの所有者。",
"consent.footer_processor": "TypelessForm:処理者として機能します。",
"consent.footer_contact": "プライバシー連絡先:info@webappski.com。",
"consent.footer_sccs":
  "米国への転送はSCCの下で実施されます。詳細は当社の<a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>プライバシーポリシー</a>でご確認いただけます。",
"consent.accept": "同意します",

// Consent checkboxes
"consent.checkbox_main": "<a href='https://webappski.com/en/legal/product-privacy' target='_blank' rel='noopener noreferrer'>プライバシーポリシー</a>に記載されているとおり、TypelessForm による音声データとフォームメタデータの処理、および SCC に基づく米国（OpenAI）への国際転送に同意します。",
"consent.checkbox_age": "16歳以上であること、または保護者の同意を得ていることを確認します。",

// Privacy settings / data deletion
"privacy.title": "プライバシーとデータ",
"privacy.subtitle": "同意とデータの管理",
"privacy.info_title": "同意の記録",
"privacy.user_id": "識別子",
"privacy.consent_date": "同意日",
"privacy.policy_version": "ポリシーバージョン",
"privacy.usage_count": "使用回数",
"privacy.no_data": "このデバイスに同意データが見つかりません。",
"privacy.delete_title": "データを削除",
"privacy.delete_description": "これにより、サーバー上のすべての同意記録が完全に削除され、ローカルデータもクリアされます。この操作は元に戻せません。",
"privacy.delete_confirm": "これが永続的であることを理解しています",
"privacy.delete_button": "データを削除",
"privacy.deleting": "削除中...",
"privacy.delete_success": "すべてのデータが正常に削除されました。",
"privacy.delete_error": "データの削除に失敗しました。再試行するか、info@webappski.comにご連絡ください。",
"privacy.done": "完了",
"privacy.link": "プライバシー"
};
