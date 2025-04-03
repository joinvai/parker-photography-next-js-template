# System Patterns

## Architecture Overview

### Component Architecture
```mermaid
graph TD
    Header[Header Container]
    Hamburger[Hamburger Menu]
    Logo[Logo Component]
    Nav[Navigation Menu]
    Overlay[Overlay Component]
    Numbers[Number Indicators]
    Links[Navigation Links]

    Header --> Hamburger
    Header --> Logo
    Header --> Nav
    Header --> Overlay
    Nav --> Numbers
    Nav --> Links

    LogoState[Logo State Management]
    Header --> LogoState
    LogoState --> Logo
```

## Font System
- Local fonts are loaded using Next.js font system
- Font variables are defined in Tailwind config
- CSS variables are used for font family references
- Consistent typography scale through Tailwind classes

### Font Loading Pattern
```typescript
// Font loading in layout.tsx
import localFont from 'next/font/local'

const dmSans = localFont({
  src: '../public/fonts/DM SANS/...',
  variable: '--font-dm-sans'
})

const editorialNew = localFont({
  src: '../public/fonts/Editorial New/...',
  variable: '--font-editorial-new'
})
```

### Font Usage Pattern
```typescript
// Tailwind config
fontFamily: {
  sans: ['var(--font-dm-sans)'],
  heading: ['var(--font-editorial-new)']
}

// Component usage
className="font-sans" // For body text
className="font-heading" // For headings
```

## Design Patterns

### Component Patterns
1. **Container Pattern**
   - Header serves as main container
   - Manages state for menu open/closed
   - Controls animation sequences
   - Manages logo state and switching

2. **Compound Components**
   - Hamburger menu with transform state
   - Navigation menu with numbered links
   - Overlay with fade transitions
   - Dynamic logo with state-based switching

3. **State Management**
   - Local state for menu visibility
   - Animation state management
   - Transition state coordination
   - Logo state based on menu state

### Animation Patterns
1. **Sequential Animation**
   - Top-to-bottom fade-in sequence
   - Coordinated opacity transitions
   - Staggered element animations

2. **Transform Patterns**
   - Hamburger to X rotation
   - Overlay fade-in/out
   - Link fade-in sequence

## Technical Implementation

### Component Structure
```typescript
interface HeaderProps {
  defaultLogo?: 'black' | 'white';
}

interface NavigationItem {
  number: number;
  label: string;
  path: string;
}

interface AnimationState {
  isOpen: boolean;
  isAnimating: boolean;
}
```

### Animation Implementation
1. **Framer Motion Option**
   - Uses variants for animation states
   - Manages animation sequences
   - Handles transition timing

2. **Tailwind Option**
   - Uses transition classes
   - Manages animation states
   - Controls timing with delays

## Reusability Patterns

### Props API
- Configurable navigation items
- Customizable timing
- Theme integration
- Event handlers

### Style Patterns
- CSS-in-JS or Tailwind utilities
- Theme-aware styling
- Responsive design patterns
- Animation class management

## Integration Patterns

### Layout Integration
- Fixed positioning
- Z-index management
- Viewport considerations
- Responsive behavior

### Navigation Integration
- Route management
- Link handling
- State persistence
- History management
