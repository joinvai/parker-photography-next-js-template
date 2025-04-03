# Tech Context

## Technologies Used

-   **Framework:** Next.js (v14+ likely, using App Router)
-   **Language:** TypeScript
-   **Package Manager:** Bun (indicated by `bun.lock`)
-   **UI Library:** React
-   **Styling:** Tailwind CSS (v3 likely)
    -   Configured via `tailwind.config.ts` and `postcss.config.mjs`.
    -   Global styles in `src/app/globals.css`.
-   **Component Library:** Shadcn UI
    -   Components located in `src/components/ui/`.
    -   Configuration in `components.json`.
    -   Uses `src/lib/utils.ts` for utility functions (like `cn`).
-   **Animation:** Framer Motion or Tailwind CSS (to be decided or implemented).
-   **Linting/Formatting:** Biome (indicated by `biome.json`)

## Development Setup

-   **Running the App:** Likely `bun run dev` (standard Next.js command with Bun).
-   **Building the App:** Likely `bun run build`.
-   **Dependencies:** Managed via `package.json` and installed using `bun install`.

## Technical Constraints

-   Must adhere to the chosen tech stack (Next.js, React, TypeScript, Tailwind, Shadcn UI, Bun, Biome).
-   Animations should be performant and smooth.

## Dependencies

-   Key dependencies visible: `next`, `react`, `react-dom`, `tailwindcss`, `@radix-ui/*` (via Shadcn UI), `framer-motion` (potentially, if chosen for animation), `typescript`, `biome`. (Review `package.json` for a full list if needed).

## Tool Usage Patterns

-   **Component Generation:** Likely using the Shadcn UI CLI (`bunx shadcn-ui add ...`) to add new UI components.
-   **Code Quality:** Biome is used for linting and formatting, likely integrated into the development workflow (e.g., pre-commit hooks or editor integration).

# Technical Context

## Technology Stack

### Core Technologies
- React/Next.js
- TypeScript
- Framer Motion / Tailwind v3 (animation options)

### Development Tools
- Modern IDE with TypeScript support
- Browser DevTools for animation debugging
- Performance monitoring tools

## Development Setup

### Required Dependencies
```json
{
  "dependencies": {
    "framer-motion": "^10.x",
    // or
    "tailwindcss": "^3.x",
    "@types/react": "^18.x",
    "@types/react-dom": "^18.x"
  }
}
```

### Development Environment
- Node.js 18+ recommended
- npm or yarn package manager
- Git for version control
- Browser with developer tools

## Technical Constraints

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- iOS Safari 14+
- Android Chrome 90+

### Performance Budgets
- First paint < 1s
- Animation performance: 60fps
- Total bundle size impact < 50KB

### Accessibility Requirements
- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Proper ARIA attributes

## Development Guidelines

### Code Style
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Component documentation

### Animation Guidelines
1. **Framer Motion**
   ```typescript
   const variants = {
     open: { ... },
     closed: { ... }
   }
   ```

2. **Tailwind**
   ```html
   <div class="transition-all duration-300 ease-in-out">
   ```

### Testing Requirements
- Unit tests for components
- Integration tests for animations
- Accessibility testing
- Performance testing

## Deployment Considerations

### Build Process
- TypeScript compilation
- CSS optimization
- Bundle size monitoring
- Source maps generation

### Performance Optimization
- Code splitting
- Tree shaking
- Image optimization
- Animation performance monitoring

### Monitoring
- Performance metrics
- Error tracking
- Usage analytics
- Animation frame rate monitoring

## Font Configuration
- Body Font: DM Sans (stored in @public/fonts/DM SANS)
- Heading Font: Editorial New (stored in @public/fonts/Editorial New)
- Implementation: Using Next.js local fonts
- Font variables are defined in Tailwind config and applied globally

## Technologies
- Next.js
- Tailwind CSS
- TypeScript

## Development Setup
The project uses Next.js with TypeScript and Tailwind CSS for styling. Fonts are managed using Next.js local fonts feature rather than Google Fonts or other external sources.
