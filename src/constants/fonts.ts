/**
 * Where the opt-in widget font (`load-fonts`) is loaded from, and the @font-face
 * rules that ask for it.
 *
 * The four .woff2 files live in widget/public/fonts/ and Vite copies them into
 * the build folder, so on the host they sit under /widget-build/fonts/. That is
 * the path to use: firebase.json sends the CORS header (Access-Control-Allow-Origin: *)
 * only for /widget-build/**, and a page on another origin may use a font only if
 * the server allows it that way. Until this module existed both components asked
 * for a /fonts path the host has never served, so every site that set `load-fonts`
 * got a 404 and the system font.
 *
 * Both components insert the same text, so the names are written once, here;
 * tests/e2e/test-suites/font-opt-in.spec.cjs fails if a second copy appears.
 */
export const FONT_BASE_URL = 'https://ai-form-copilot-eu.web.app/widget-build/fonts';

export const FONT_FACE_CSS = `
/* cyrillic-ext */
@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 200 800;
  font-display: swap;
  src: url('${FONT_BASE_URL}/plus-jakarta-sans-cyrillic-ext.woff2') format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* vietnamese */
@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 200 800;
  font-display: swap;
  src: url('${FONT_BASE_URL}/plus-jakarta-sans-vietnamese.woff2') format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 200 800;
  font-display: swap;
  src: url('${FONT_BASE_URL}/plus-jakarta-sans-latin-ext.woff2') format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 200 800;
  font-display: swap;
  src: url('${FONT_BASE_URL}/plus-jakarta-sans-latin.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}`;
