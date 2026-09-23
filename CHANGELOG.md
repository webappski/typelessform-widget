# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.9] - 2026-09-22

### Changed
- The accuracy figure on the package and the README is now our own measurement:
  given a correct transcript, 98.5% of spoken fields are filled correctly — a
  frozen 27-utterance corpus, 195 field observations, measured 2026-09-21,
  method at
  https://typelessform.com/blog/how-accurate-is-voice-form-filling-2026/. It
  replaces a 96% that was a speech vendor's own figure, for a different
  operation, quoted as if it were ours.

### Fixed
- The consent notice named "OpenAI Whisper" as the processor in all 25 locales.
  The service has never called whisper-1. The notice now names the recipient and
  the purpose and no model version at all — a version rots faster than 25
  locales get retranslated.
- The consent notice now says how long the consent record is kept (24 months
  from your most recent consent, deleted automatically after that) and that
  withdrawing consent deletes it sooner. The period is bound to the value the
  backend actually stamps, so the sentence cannot drift away from the deletion.
- That retention sentence existed in English only. `t()` has no English
  fallback, so twenty-four locales rendered the literal key `consent.retention`
  inside the notice, with the number never substituted. It is written in all 25
  now, each naming the privacy panel the way that locale's own UI labels it.
- The withdrawal guarantee ("the same action also deletes your consent records
  from our servers") had been written in English only as well. The other
  twenty-four locales promised less than the widget actually does.
- The control that withdraws consent now says withdrawal.
- For an error it does not recognise, the modal printed the same sentence twice,
  one line under the other. It states it once; a recognised error still shows
  its own detail.
- A consent given on 29 February was kept a day past the period the notice
  states: twenty-four months on, that date does not exist, and the surplus
  rolled into 1 March. The day is clamped, and the arithmetic reads the clock in
  UTC rather than the host's.
- Fields that name a second factor — 2FA, MFA, authenticator, one-time password,
  verification or recovery code — are now excluded from AI processing by a
  deterministic rule rather than by the classifier's judgement. Ordinary fields
  that merely end in "code" (zip, country, promo) are still filled.

### Internal
- The E2E suite builds its own stand and tears it down, and refuses to run if
  the built bundle points at production endpoints. Tests that need a live
  backend are opt-in behind `TF_LIVE_TESTS=1` and print their estimated cost
  before starting.
- Deploying hosting rebuilds the widget in production mode first, so a
  development bundle left by a test run cannot ship.

## [1.0.8] - 2026-09-16

### Fixed
- Review-modal captions "Auto-translated" and "Original" are now translated in all
  25 interface locales. They had been hardcoded English in every locale, so a
  Polish or Japanese user saw two English words inside an otherwise translated UI.
- `WIDGET_VERSION` matches the published package version again. It had read
  `1.0.0-beta.1` since March while the package shipped 1.0.7, and it is stamped
  into consent receipts (GDPR Art. 7(1) proof) and error reports — those records
  named a build nobody was running. A third hardcoded `'1.0.0'` in the analyse
  payload now reads the same constant.

### Internal
- Publishing the package now prepares the public source mirror automatically
  (`postpublish`). The script copies an explicit allowlist only, refuses to run
  on a mirror with uncommitted changes, and prints the push command instead of
  pushing.

> Note: releases 1.0.1–1.0.7 were published without changelog entries; this file
> resumes at 1.0.8 rather than inventing history for them.

## [1.0.0-beta.1] - 2026-03-12

### Added
- Initial public beta release
- Voice input with Web Speech API + OpenAI Whisper fallback
- AI-powered form field detection and filling
- Support for 25 languages
- GDPR consent dialog with dual-checkbox (consent + age 16+)
- Privacy-aware field filtering (`data-ai-private` attribute)
- Universal form support: standard HTML, custom components, SPAs
- Multi-field badge system for quick fills
- TypeScript declarations included
- ES module and UMD builds

### Security
- API keys validated server-side with SHA-256 hashing
- PII filtering before AI processing (passwords, SSNs, credit cards excluded)
- IP addresses hashed with daily rotation in consent records
- User-Agent hashed before storage
- Domain-based access control per API key
- Google Fonts loading is opt-in only (`load-fonts` attribute) to avoid GDPR issues
