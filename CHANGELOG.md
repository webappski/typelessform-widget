# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.12] - 2026-10-22

### Changed
- Behaviour change of the public `applyValuesGlobal()`: `data-ai-private` is now
  read by presence, like everywhere else. A field carrying the attribute with any
  value, `data-ai-private="false"` included, is no longer written by
  `applyValuesGlobal()` or by any other layer that writes values. Before, those
  layers compared the value with `"true"`, so a bare `data-ai-private` (the form the
  user guide shows) stopped only the layers above them, and a direct call to
  `applyValuesGlobal()` filled such a field. The visitor's path through the widget is
  unchanged: the scanner has always treated the attribute by presence. USER_GUIDE,
  README and TECHNICAL now describe the attribute this way.
- The same goes for the other two private markers the scanner has always known:
  `data-private="true"` and a password field. Every layer that writes values, the
  public `applyValuesGlobal()` and the form applier included, now skips them too;
  before, a field marked this way and handed to such a layer directly was filled.
  All layers ask one check (`lib/private-marker.ts`) instead of five copies.
- Checkboxes and radio buttons the widget fills are set with a click, the way a person
  sets them, and only when their state differs. Like a person's click, it runs the
  page's own click handlers (analytics, a confirmation dialog). A box the page does not
  let change — a disabled one, or one whose click the page cancels — is left as it is;
  it used to be forced. The public `applyValuesGlobal()` and the fallback the widget
  uses before its form applier is set up still set `checked` directly, so in a
  controlled React form a radio or checkbox they write does not reach the component's
  state.

### Fixed
- Privacy of selects, radio groups and checkbox groups: in 1.0.11 the value of such
  a field marked `data-ai-private` was still sent to `/complete`. A marked select,
  radio or checkbox now stays out of the fill request, as text fields already did.
- A radio or checkbox group with `data-private="true"` on a later button or box (not
  the first) was sent to `/complete` and filled: only the first element's alias was
  read. Any marked member now makes the group private.
- Fields hidden the way form builders hide their spam traps are no longer sent to the
  analysis or filled: `display: none` or `visibility: hidden` on the field or on an
  element around it, a text field clipped to a 1×1px box, a text field marked
  `aria-hidden` inside the form. On WPForms (its built-in anti-spam protection, a
  honeypot field, is on by default for new forms) the widget filled the hidden spam
  trap and WPForms silently dropped the entry while the visitor saw "thank you"; the
  submission is no longer lost. Nor is the wrapper of such a field (`div.wpforms-field`
  around the trap): it is not sent, not listed in the review, and nothing is written for
  it. When the widget
  looks a field up by a looser match (part of its name, the first field of the same
  type), it does not write into a field hidden in one of these ways either; a native
  select that bootstrap-select, Chosen or Selectize hides behind its own button is
  still written. Browsers
  without `checkVisibility()` (Safari before 17.4) decide the same. A radio or
  checkbox whose own box is hidden but whose label is shown (a custom-styled control)
  stays a field. Not covered: a field only moved off the screen (`left: -9999px`) or
  made transparent (`opacity: 0`, `height: 0`) without one of the markers above still
  counts as visible.
- Contact Form 7 field labels: a field wrapped in an element inside its `<label>`
  gets that label (Contact Form 7 draws every field this way), and a radio or
  checkbox option gets the text right after it. On Contact Form 7 every field was
  given the first field's label, and with generator names (`text-415`) the visitor's
  name went into "Company".
- Single-choice selects, radio groups and checkbox groups are filled. The backend
  keeps fields with options off the list of field names shown before speaking, and the
  widget used that list as the list of fields it may fill, so none of them was ever
  filled on any site. A field with options is now filled when the backend's privacy
  verdict for it is "not sensitive" and it is not marked private. Checkbox groups are
  recognised by their shared name and sent with their options; a Choices.js select
  (WPForms "Modern") is read and chosen through its own list, so the visitor sees the
  value too.
- Radio buttons and checkboxes in a controlled React form keep the choice in the
  form's state. The widget set `checked` and sent `input` and `change`, but React hears
  these inputs only through a click: the boxes were drawn ticked while the component's
  state stayed empty, and the form was submitted without the choice (1.0.11 filled no
  radio or group at all; a lone checkbox the widget wrote had the same
  defect). The widget now sets them with a click: one click on each box that has to
  change, and the `input` and `change` the browser sends with it, so Vue's `v-model`
  and plain forms hear it as they hear a person; the widget sends no event of its own
  on top. When the page did not keep a click (`v-model` can drop a box clicked in the
  same moment as another), the widget clicks that box once more.
  `applyValuesGlobal()` is not changed (see Changed).
- A checkbox group the page itself keeps to one box (Contact Form 7's `exclusive`
  option) or to a few, answered with more options than the page allows, no longer makes
  the widget click it over and over. The widget clicked such a group every 2 seconds for
  as long as the page stayed open: the "Fill and review" window never closed, and a
  choice the visitor made afterwards was clicked back. A box the page undoes after the
  fill's click gets one more click — from the widget's own retries and from its checks
  after the fill together — and is then left as the page holds it until the next fill or
  in-page navigation (see Notes), so the group ends where a person clicking the named
  options in order would end (an exclusive group: on the last one named).
- After a fill, what the visitor changes stays, and a scroll writes a field again at
  most once. In the 10 seconds after a fill every scroll checked the form against the
  answer. The check read a radio or a checkbox as "true" or "false" and compared that
  with the answer ("1000-5000 EUR", "Phone, Email"), so it found every radio and
  checkbox group changed, wrote the whole answer again and started its 10 seconds over:
  while the visitor kept scrolling, the check never ended. A Contact Form 7 exclusive
  group got about six clicks a scroll, and a choice or a text the visitor had corrected
  was written back. Now the check reads a group by the options ticked and a select by
  the option chosen, as the widget writes them, and leaves a field that shows its answer
  alone; the 10 seconds count from the fill, and a write the check makes does not extend
  them; a field the visitor has changed since the fill (typed into, clicked, chosen in
  the browser's own control — for controls a component library draws, see Notes) is not
  written again until the next fill. The same holds for the widget's other checks after
  a fill: right after the window closes, when the form's structure changes, and after an
  in-page navigation (see Notes).
- A text field or a select the page keeps putting back after the widget writes it (a
  controlled field that keeps its own state, a select the page resets or sets to another
  option) is no longer written every 2 seconds for as long as the page stays open (see
  Notes), and the "Fill and review" window closes. A text field or a select gets the
  fill's write and one more after it, from the widget's own retries or its checks after
  the fill, and is then left as the page holds it until the next fill or in-page
  navigation (see Notes). A select whose chosen option the page removed no longer gets a
  `change` with nothing chosen.
- An answer for a radio group or a checkbox group that matches none of its options
  leaves the field as it is; it used to clear the option the visitor had chosen. An
  option is matched by its value or its label, in any letter case, as selects already
  were, and a checkbox group answered with one text naming several options
  ("Call me back, Send a quote") ticks each of them.

### Notes
- Checked on Contact Form 7 6.2.3 and WPForms Lite 2.0.2.2 and on replica pages of
  their markup; not run on other versions or on Gravity Forms, Elementor, Ninja Forms.
- A lone checkbox (consent, terms, opt-in, a single option) is deliberately never
  ticked by voice: one checkbox cannot be reliably told apart as a consent or an
  option, and ticking a consent for the visitor is the wrong error to risk. The
  visitor ticks it by hand. Checkbox groups are filled.
- A multiple-choice select (`<select multiple>`) is not filled by voice: it is left
  for the visitor.
- A page script that toggles a box itself when the click bubbles up to it, so that the
  click changes nothing, leaves the box unticked: the widget does not force it.
- In the 10 seconds after a fill, a scroll still writes the answer back into a field
  that a page script, not the visitor, changed or emptied, within the limits above.
  After those 10 seconds only a change of the form's structure or an in-page navigation
  can still write it back, once. A change counts as the visitor's when the browser
  reports it as a person's input. Controls a component library draws over a hidden
  native field — the Choices.js select of WPForms "Modern", date pickers — set that
  field from a script, and the browser reports their change as the page's: a choice the
  visitor makes in such a control in the 10 seconds after a fill can be put back to the
  answer by a scroll, once, in plain view. A page script that sets a checkbox or radio
  with `click()` gets the same events from the browser as a person, so such a box counts
  as the visitor's and is not written again until the next fill.
- After a fill, a field is written again at most once, whichever check asks, and once
  more after each in-page navigation to a new address (`history.pushState`, back or
  forward). While the widget restores the form after such a navigation, a field the page
  mounts anew gets a write of its own — a page that shows a loading state, then the
  form, is restored both times. `history.replaceState` (a page keeping its own state in
  the address) gives nothing back, nor does an address change that comes less than a
  second after the widget wrote a field: that is taken for the page's answer to the
  write (a router that puts the field's value into the address). A person who navigates
  within that second gets only what is left of the fill's write. Outside a navigation a
  field mounted anew shares the write of the one it replaced: a page that rebuilds the
  form a second time without changing the address leaves the rebuilt fields empty until
  the next fill. What the visitor changed since the fill stays theirs after a navigation
  too. A page that pushes a new address more than a second after the widget's write and
  puts the field back gets it written once per such push, without an upper limit (the
  visitor's own changes stay theirs).
- Component libraries that draw their own control over a hidden native input marked
  `aria-hidden` (MUI Select, MUI X date fields) no longer have that input sent as a
  text field: it reads the same as a spam trap. Such controls were not filled
  correctly before either (the input was labelled with the shown value, "Poland",
  where the component expects "PL").

## [1.0.11] - 2026-10-11

### Fixed
- With `load-fonts` the widget font did not load: the files were requested from
  `/fonts`, a path the host has never served, and now come from
  `/widget-build/fonts`, where the files and their CORS header live.
- The version stamped into consent receipts and error reports is the package
  version again (1.0.10 carried "1.0.9" inside; the code of 1.0.10 and 1.0.9 is the same).

## [1.0.10] - 2026-10-07

### Changed
- LICENSE names the current operator: Lizaveta Isayeuskaya, sole proprietorship,
  Gdynia, Poland (NIP PL5862379862). No code changes.
- README: the paid plans are priced in euros and bought by invoice.

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
