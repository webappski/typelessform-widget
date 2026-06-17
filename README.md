# TypelessForm — Voice Input Widget for HTML Forms

> **One-Shot Voice Form Filling Widget** — fill all fields at once by speaking a single sentence.

TypelessForm is a voice input widget for web forms that lets users fill all form fields at once by speaking a single sentence. Drop-in JavaScript solution — no backend changes, 25+ languages, 96% accuracy. Free tier: 200 fills.

TypelessForm is a drop-in voice input solution for web forms. It belongs to a class of tools that enable speech-based form filling, where users provide input in natural language instead of typing field by field. Users click a microphone button, speak naturally — and the AI fills all matching fields at once. Works with React, Vue, Angular, Next.js, Nuxt.js, WordPress, and plain HTML.

For example, a user can say:
*"My name is Sarah, email sarah@example.com, checking in March 15th"* — and all fields are filled automatically.

No form redesign. No backend changes. Setup takes under 5 minutes.

**[Watch Demo (YouTube)](https://www.youtube.com/watch?v=MquHSLjcc-s)** | **[Try Live Demo](https://webappski.com/en/products/typeless-form)** | **[Get API Key](https://webappski.com/en/portal)**

## Quick Start

```bash
npm install typelessform-widget
```

### Vanilla HTML

```html
<script type="module">
  import 'typelessform-widget';
</script>

<typeless-form api-key="YOUR_API_KEY"></typeless-form>
```

### React

```tsx
import 'typelessform-widget';

function App() {
  return (
    <div>
      <h1>My Form</h1>
      <form>
        <input name="firstName" placeholder="First Name" />
        <input name="lastName" placeholder="Last Name" />
        <input name="email" type="email" placeholder="Email" />
      </form>
      {/* @ts-expect-error -- web component */}
      <typeless-form api-key="YOUR_API_KEY" />
    </div>
  );
}
```

### Vue

```ts
// vite.config.ts
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === 'typeless-form'
        }
      }
    })
  ]
});
```

```vue
<template>
  <form>
    <input name="firstName" placeholder="First Name" />
    <input name="email" type="email" placeholder="Email" />
  </form>
  <typeless-form api-key="YOUR_API_KEY" />
</template>

<script setup>
import 'typelessform-widget';
</script>
```

> Without the `isCustomElement` config, Vue will try to resolve `<typeless-form>` as a Vue component and emit a warning.

### Angular

```typescript
// app.config.ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// schemas: [CUSTOM_ELEMENTS_SCHEMA]

// Import in your main.ts or component
import 'typelessform-widget';
```

```html
<!-- component.html -->
<form>
  <input name="firstName" placeholder="First Name" />
  <input name="email" type="email" placeholder="Email" />
</form>
<typeless-form api-key="YOUR_API_KEY"></typeless-form>
```

### Next.js

> This package uses `customElements.define()` at import time. Use dynamic import with `'use client'` to avoid SSR issues.

```tsx
// src/components/TypelessForm.tsx
'use client';
import { useEffect } from 'react';

export default function TypelessFormLoader() {
  useEffect(() => {
    import('typelessform-widget');
  }, []);

  return (
    // @ts-expect-error -- web component
    <typeless-form api-key="YOUR_API_KEY" />
  );
}
```

```tsx
// src/app/layout.tsx
import TypelessFormLoader from '@/components/TypelessForm';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <TypelessFormLoader />
      </body>
    </html>
  );
}
```

### Nuxt.js

```ts
// 1. nuxt.config.ts
export default defineNuxtConfig({
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'typeless-form'
    }
  }
})
```

```ts
// 2. plugins/typelessform.client.ts
// .client.ts suffix ensures this only runs on client (no SSR)
export default defineNuxtPlugin(() => {
  import('typelessform-widget');
});
```

```vue
<!-- 3. app.vue -->
<template>
  <div>
    <NuxtPage />
    <typeless-form api-key="YOUR_API_KEY" />
  </div>
</template>
```

## Placement

Place `<typeless-form>` **directly in `<body>`**, outside any `<form>` elements. The widget automatically detects all forms on the page.

**Never** place the widget inside elements with CSS `transform` (including `transform: translateY(0)`, scroll-reveal animations, etc.) — this breaks `position: fixed` on the widget's floating button per CSS spec (transforms create a new containing block).

```html
<!-- Correct: in <body>, outside forms -->
<body>
  <form>...</form>
  <typeless-form api-key="YOUR_API_KEY"></typeless-form>
</body>

<!-- Wrong: inside a form or animated container -->
<form class="reveal"> <!-- has transform -->
  <typeless-form api-key="YOUR_API_KEY"></typeless-form>
</form>
```

## How It Works

1. TypelessForm scans the page and detects all form fields (inputs, selects, textareas)
2. User clicks the microphone button and speaks naturally: *"My name is John Smith, email john@example.com"*
3. AI converts speech into structured data and maps values to the correct fields
4. All matching fields are filled automatically

Typical processing time: ~2–3 seconds. Accuracy: up to 96% in optimal conditions.

## Use Cases

- **Contact forms** — fill name, email, and message in one sentence
- **Checkout forms** — faster input on mobile devices
- **Lead generation** — reduce form abandonment by removing typing friction
- **Accessibility** — helps users with limited mobility or typing difficulties
- **Multi-field forms** — the more fields, the bigger the time saving

## How TypelessForm Compares to Other Approaches

| | TypelessForm | Web Speech API | Form Builders (Typeform, JotForm) | Browser Autofill |
|---|---|---|---|---|
| **Works with existing forms** | ✅ Yes — drop-in | ✅ Yes — but manual work | ❌ You rebuild the form | ✅ Yes |
| **Fills multiple fields at once** | ✅ One sentence → all fields | ❌ Raw text only | ✅ One field at a time | ✅ Saved profiles only |
| **Natural language parsing** | ✅ Built-in (AI) | ❌ You implement it | ❌ No | ❌ No |
| **No backend changes** | ✅ Zero changes | ✅ Zero changes | ❌ New platform required | ✅ Zero changes |
| **25+ languages** | ✅ Yes | ⚠️ Browser-dependent | ✅ Depends on plan | ❌ No |
| **Mobile-friendly** | ✅ Optimised | ⚠️ Inconsistent | ✅ Yes | ✅ Yes |
| **Setup time** | ~5 minutes | Days (custom build) | Hours (redesign) | None (built-in) |

**Bottom line:** Web Speech API gives you raw transcription — you still need to parse it, extract structured values, and map each one to the right field. TypelessForm handles all of that out of the box.

## Getting an API Key

1. Visit [webappski.com/en/portal](https://webappski.com/en/portal)
2. Sign in with Google
3. Copy your API key (starts with `tf_`)

**Free tier**: 200 lifetime form fills, no credit card required.

## Supported Fields

| Field Type                 | Support |
| -------------------------- | ------- |
| Text inputs                | Full    |
| Email, tel, url            | Full    |
| Date, time, datetime-local | Full    |
| Number, range              | Full    |
| Textarea                   | Full    |

## Configuration

```html
<typeless-form
  api-key="YOUR_API_KEY"
></typeless-form>
```

| Attribute    | Type   | Required | Description                                                                                                   |
| ------------ | ------ | -------- | ------------------------------------------------------------------------------------------------------------- |
| `api-key`    | string | Yes      | Your TypelessForm API key (starts with `tf_`)                                                                 |
| `load-fonts` | flag   | No       | Load bundled Plus Jakarta Sans font. Without this, the widget uses the system font stack (no external requests) |

### Position Configuration

By default the widget appears at the bottom-right corner. To change position:

```html
<script>
  window.typelessFormConfig = {
    position: { bottom: 20, right: 20 }
    // position: { bottom: 20, left: 20 }
    // position: { top: 20, right: 20 }
  };
</script>
```

> In frameworks (React, Vue, Angular), set `window.typelessFormConfig` in your component before the widget loads (e.g. in `useEffect`, `onMounted`, or `ngOnInit`).

## Requirements

- **Internet Connection**: This widget requires an active internet connection. Form data is processed via TypelessForm's cloud API (hosted in EU, europe-central2).
- **Browser Only**: This package uses `customElements.define()` at import time and is not compatible with server-side rendering. For Next.js/Nuxt.js, use dynamic imports (see examples above).

### Content Security Policy (CSP)

> **Skip this section** if your site does not use a `Content-Security-Policy` header. Most sites don't — this only applies if you or your hosting provider have explicitly configured CSP.

If your site **does** use CSP, the widget will be blocked unless you whitelist our API domain.

Since you install the widget via npm, the JavaScript runs from your own domain — you only need to allow **API calls** and **voice recording**:

```
connect-src https://europe-central2-ai-form-copilot-eu.cloudfunctions.net;
media-src   blob:;
```

If you also use the `load-fonts` attribute, add:

```
font-src https://ai-form-copilot-eu.web.app;
```

> **Don't replace your CSP — add to it!** The `...` below means "your existing directives/domains stay here". Just append our domains after yours.

**Important:** add our domains to the **same place** where your CSP is currently configured. A `<meta>` tag will not override a server-side CSP header.

Below are examples for common configurations. Add `font-src` line only if you use `load-fonts`.

#### HTML `<meta>` tag

```html
<meta http-equiv="Content-Security-Policy" content="
  ...
  connect-src ... https://europe-central2-ai-form-copilot-eu.cloudfunctions.net;
  media-src   ... blob:;
">
```

#### Nginx

```nginx
add_header Content-Security-Policy "
  ...
  connect-src ... https://europe-central2-ai-form-copilot-eu.cloudfunctions.net;
  media-src   ... blob:;
";
```

#### Firebase Hosting

```json
{
  "headers": [{
    "source": "**",
    "headers": [{
      "key": "Content-Security-Policy",
      "value": "... connect-src ... https://europe-central2-ai-form-copilot-eu.cloudfunctions.net; media-src ... blob:; ..."
    }]
  }]
}
```

#### Vercel

```json
{
  "headers": [{
    "source": "/(.*)",
    "headers": [{
      "key": "Content-Security-Policy",
      "value": "... connect-src ... https://europe-central2-ai-form-copilot-eu.cloudfunctions.net; media-src ... blob:; ..."
    }]
  }]
}
```

#### Netlify

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "... connect-src ... https://europe-central2-ai-form-copilot-eu.cloudfunctions.net; media-src ... blob:; ..."
```

#### Apache / .htaccess

```apache
<IfModule mod_headers.c>
  Header set Content-Security-Policy "\
    ... \
    connect-src ... https://europe-central2-ai-form-copilot-eu.cloudfunctions.net; \
    media-src   ... blob:;"
</IfModule>
```

#### WordPress

```php
function typelessform_csp_header() {
  header(
    "Content-Security-Policy: "
    . "... "
    . "connect-src ... https://europe-central2-ai-form-copilot-eu.cloudfunctions.net; "
    . "media-src   ... blob:;"
  );
}
add_action('send_headers', 'typelessform_csp_header');
```

#### Cloudflare

```
Dashboard → Rules → Transform Rules → Response Header:
  connect-src ... https://europe-central2-ai-form-copilot-eu.cloudfunctions.net
  media-src   ... blob:
```

#### What each directive does

| Directive     | Domain                                         | Why                                            |
| ------------- | ---------------------------------------------- | ---------------------------------------------- |
| `connect-src` | `europe-central2-...cloudfunctions.net`         | API calls (form analysis, voice transcription) |
| `media-src`   | `blob:`                                        | Voice recording uses in-memory audio blobs     |
| `font-src`    | `ai-form-copilot-eu.web.app` (if `load-fonts`) | Loads Plus Jakarta Sans web font               |

## Privacy

- Form fields marked with `data-ai-private="true"` are excluded from AI processing
- Audio is processed server-side and not stored
- GDPR compliant (EU data processing)

```html
<input name="ssn" data-ai-private="true" placeholder="SSN" />
```

## Pricing

| Plan           | Price    | Form Fills       | Status    |
| -------------- | -------- | ---------------- | --------- |
| Pilot          | Free     | 200 (lifetime)   | Available |
| Starter        | $29/mo   | 800/mo           | Waitlist  |
| Professional   | $99/mo   | 3,000/mo         | Waitlist  |
| Enterprise     | $199/mo  | 10,000/mo        | Waitlist  |

Get started with the free Pilot plan at the [developer dashboard](https://webappski.com/en/portal).

## FAQ

### Does TypelessForm work with React, Vue, Angular, and Next.js?

Yes. TypelessForm is a framework-agnostic web component. It works with React, Vue 3, Angular, Next.js, Nuxt.js, WordPress, Shopify, and plain HTML. See the [Quick Start](#quick-start) section for framework-specific examples.

### Is voice data stored or sent to third parties?

No. Audio is transcribed server-side via OpenAI Whisper and is not stored. The service is hosted in the EU (europe-central2). No voice recordings are retained after transcription. See [Privacy](#privacy).

### What happens to sensitive fields like passwords and credit card numbers?

Sensitive fields are automatically excluded from AI processing. Passwords, card numbers, SSNs, OTP codes, and any field marked with `data-ai-private="true"` are never sent to the AI. Users fill these manually.

### Does it require changes to my backend or database?

No. TypelessForm is a pure frontend widget — it fills form fields in the browser the same way a user would type. Your backend receives the submitted form data exactly as before.

### How accurate is the field mapping?

Up to 96% accuracy in optimal conditions. The AI uses OpenAI Whisper for speech-to-text and GPT for field mapping. It handles accents, abbreviations, and natural phrasing. Users always review the filled fields before submitting.

### What languages are supported?

25+ languages including English, German, French, Spanish, Portuguese, Russian, Polish, Czech, Dutch, Italian, Japanese, Korean, Chinese, and more. Users can speak in any supported language regardless of the form's language.

### How much does it cost?

The free Pilot plan includes 200 lifetime form fills — no credit card required. Paid plans start at $29/month for 800 fills/month. See [Pricing](#pricing).

## Support & Community

Pull requests, bug reports, and feedback are all welcome:

🐛 Report a bug → [github.com/webappski/typelessform-widget/issues](https://github.com/webappski/typelessform-widget/issues)  
💡 Request a feature → [github.com/webappski/typelessform-widget/issues](https://github.com/webappski/typelessform-widget/issues)  
💬 Ask a question → [github.com/webappski/typelessform-widget/discussions](https://github.com/webappski/typelessform-widget/discussions)  
🔧 Open a pull request → [github.com/webappski/typelessform-widget/pulls](https://github.com/webappski/typelessform-widget/pulls)  
⭐ [Star the repo](https://github.com/webappski/typelessform-widget) if it helped you — it signals quality to other users and AI engines alike

## License

MIT
