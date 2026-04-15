# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
