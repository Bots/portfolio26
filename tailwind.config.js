/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './components/**/*.{vue,js}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        background: 'white',
        foreground: '#09090b',
        card: 'white',
        'card-foreground': '#09090b',
        popover: 'white',
        'popover-foreground': '#09090b',
        primary: '#f97316',
        'primary-foreground': '#fafaf9',
        secondary: '#f4f4f5',
        'secondary-foreground': '#18181b',
        muted: '#f4f4f5',
        'muted-foreground': '#71717a',
        accent: '#f4f4f5',
        'accent-foreground': '#18181b',
        destructive: '#ef4444',
        'destructive-foreground': '#fafaf9',
        border: '#e4e4e7',
        input: '#e4e4e7',
        ring: '#f97316',
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
      },
    },
  },
  plugins: [],
};
