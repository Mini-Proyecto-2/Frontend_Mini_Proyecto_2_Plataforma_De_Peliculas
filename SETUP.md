# Movies Platform - Development Setup

This project is initialized with:
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite 7** - Fast build tool
- **Tailwind CSS v4** - Utility-first CSS framework
- **Sass/SCSS** - CSS preprocessor for advanced styling

## Available Scripts

- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
├── src/
│   ├── assets/          # Static assets (images, icons, etc.)
│   ├── App.tsx          # Main App component
│   ├── App.scss         # App styles (Sass with variables and nesting)
│   ├── index.scss       # Global styles (includes Tailwind CSS)
│   └── main.tsx         # Application entry point
├── public/              # Public static files
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── package.json         # Project dependencies

```

## Technologies Demonstrated

### Tailwind CSS
Utility classes are available throughout the project. Example in `App.tsx`:
```tsx
<button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">
  Click me
</button>
```

### Sass/SCSS
Advanced CSS features like variables and nesting. Example in `App.scss`:
```scss
$logo-size: 6em;

.logo {
  height: $logo-size;
  
  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
}
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Notes

- Tailwind CSS v4 uses the new `@import "tailwindcss"` syntax in `index.scss`
- Both Sass and Tailwind work together - use Sass for component-specific styles and Tailwind for utility classes
- TypeScript provides type safety for all React components
