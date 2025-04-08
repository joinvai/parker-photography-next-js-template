# SIRE Website - Remaining Tasks

## UI Improvements
- [ ] Press page enhancements
  - [ ] Tighten overall UI layout and spacing
  - [ ] Improve visual hierarchy
  - [ ] Ensure consistent padding/margins

## Watch Page
- [ ] Add Netflix-style image gallery
  - [ ] Import and optimize Netflix screenshots/images
  - [ ] Create responsive image grid layout
- [ ] Style page layout
  - [ ] Match Netflix-inspired design aesthetic
  - [ ] Add smooth transitions/animations
  - [ ] Ensure mobile responsiveness

## Studio Page
- [ ] Create company section
  - [ ] Implement 3-column grid layout
    - Photo | Paragraph | Photo structure
  - [ ] Optimize images for performance
  - [ ] Add responsive behavior for mobile
- [ ] Build team component
  - [ ] Create `team.ts` data file with:
    ```typescript
    interface TeamMember {
      name: string;
      title: string;
      bio: string;
      image: string;
    }
    ```
  - [ ] Map team data similar to projects.ts structure
  - [ ] Style team member cards/grid
  - [ ] Add hover effects and animations

## Contact Page
- [ ] Redesign forms based on inspiration site
  - [ ] Match visual style and layout
  - [ ] Add form validation
  - [ ] Improve input field styling
  - [ ] Add success/error states

## Global Components
- [ ] Implement cursor selector component
  - [ ] Add custom cursor styles
  - [ ] Create hover states
  - [ ] Ensure smooth transitions
  - [ ] Test across all interactive elements

## General
- [ ] Cross-browser testing
- [ ] Mobile responsiveness verification
- [ ] Performance optimization
- [ ] Accessibility checks


Bonus ideas:
- [ ] Add a "back to top" button that scrolls to the top of the page
- [ ] Add a "share" button that shares the current page on social media

