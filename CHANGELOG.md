# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
