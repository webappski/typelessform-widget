import { css } from 'lit';

export const tokenStyles = css`
  :host {
    /* ═══ Accent — Coral / Orange ═══ */
    --accent-50: #FFF7ED;
    --accent-100: #FFEDD5;
    --accent-200: #FED7AA;
    --accent-300: #FDBA74;
    --accent-400: #FB923C;
    --accent-500: #F97316;
    --accent-600: #EA580C;
    --accent-700: #C2410C;

    /* Backward-compat aliases (primary → accent) */
    --primary-50: var(--accent-50);
    --primary-100: var(--accent-100);
    --primary-200: var(--accent-200);
    --primary-300: var(--accent-300);
    --primary-400: var(--accent-400);
    --primary-500: var(--accent-500);
    --primary-600: var(--accent-600);
    --primary-700: var(--accent-700);

    /* ═══ Success — Warm Green ═══ */
    --success-50: #F0FDF4;
    --success-100: #DCFCE7;
    --success-200: #BBF7D0;
    --success-300: #86EFAC;
    --success-400: #4ADE80;
    --success-500: #22C55E;
    --success-600: #16A34A;
    --success-700: #15803D;

    /* ═══ Error — Warm Red ═══ */
    --error-50: #FEF2F2;
    --error-100: #FEE2E2;
    --error-200: #FECACA;
    --error-500: #EF4444;
    --error-600: #DC2626;
    --error-700: #B91C1C;

    /* ═══ Warning — Amber ═══ */
    --warning-50: #FFFBEB;
    --warning-100: #FEF3C7;
    --warning-200: #FDE68A;
    --warning-300: #FCD34D;
    --warning-500: #F59E0B;
    --warning-600: #D97706;
    --warning-700: #B45309;
    --warning-800: #92400E;

    /* ═══ Neutrals — Warm Stone ═══ */
    --gray-25: #FDFCFB;
    --gray-50: #FAFAF8;
    --gray-100: #F5F5F4;
    --gray-150: #EEECEB;
    --gray-200: #E7E5E4;
    --gray-300: #D6D3D1;
    --gray-400: #A8A29E;
    --gray-500: #78716C;
    --gray-600: #57534E;
    --gray-700: #44403C;
    --gray-800: #292524;
    --gray-900: #1C1917;
    --gray-950: #0C0A09;
    --white: #FFFFFF;

    /* Spacing (4px base) */
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-5: 1.25rem;
    --space-6: 1.5rem;
    --space-8: 2rem;
    --space-10: 2.5rem;
    --space-12: 3rem;
    --space-16: 4rem;
    --space-20: 5rem;

    /* Border Radius */
    --radius-xs: 4px;
    --radius-sm: 6px;
    --radius-md: 10px;
    --radius-lg: 14px;
    --radius-xl: 20px;
    --radius-2xl: 24px;
    --radius-full: 9999px;

    /* Typography */
    --text-xs: 0.75rem;
    --text-sm: 0.875rem;
    --text-base: 1rem;
    --text-lg: 1.125rem;
    --text-xl: 1.25rem;
    --text-2xl: 1.5rem;
    --text-3xl: 1.875rem;
    --text-4xl: 2.25rem;

    /* Line Heights */
    --leading-tight: 1.25;
    --leading-snug: 1.375;
    --leading-normal: 1.5;
    --leading-relaxed: 1.625;
    --leading-loose: 2;

    /* Shadows — warm-toned */
    --shadow-xs: 0 1px 2px rgba(28, 25, 23, 0.04);
    --shadow-sm: 0 2px 6px rgba(28, 25, 23, 0.06);
    --shadow-md: 0 4px 16px rgba(28, 25, 23, 0.08);
    --shadow-lg: 0 12px 32px rgba(28, 25, 23, 0.10);
    --shadow-xl: 0 20px 48px rgba(28, 25, 23, 0.12);
    --shadow-2xl: 0 25px 50px rgba(28, 25, 23, 0.18);
    --shadow-accent: 0 4px 20px rgba(249, 115, 22, 0.25);
    --shadow-accent-lg: 0 8px 32px rgba(249, 115, 22, 0.30);
    --shadow-success: 0 4px 20px rgba(34, 197, 94, 0.20);
    --shadow-error: 0 4px 20px rgba(239, 68, 68, 0.20);

    /* Transitions */
    --transition-fast: 150ms cubic-bezier(0.22, 1, 0.36, 1);
    --transition-base: 250ms cubic-bezier(0.22, 1, 0.36, 1);
    --transition-slow: 400ms cubic-bezier(0.22, 1, 0.36, 1);
    --transition-spring: 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);

    all: initial;
    display: block;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: var(--gray-900);
    -webkit-font-smoothing: antialiased;
  }

  /* A11y: Respect user preference for reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
