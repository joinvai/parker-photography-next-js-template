# Active Context

## Current Focus
- Image Carousel Implementation
- Navigation Hover Effects

## Recent Changes
- Implemented basic carousel with shadcn components
- Added cursor-following text for navigation
- Attempted to fix hover text positioning with odd/even index logic

## Known Issues
### Carousel Navigation Bug
Current Behavior:
- Hover text (PREV/NEXT) is determined by array index (odd/even)
- This causes incorrect behavior when scrolling as the visible position doesn't match the array index

Desired Behavior:
- Only the first and last visible images should show hover text
- Middle image should never show hover text
- First visible image should show "PREV"
- Last visible image should show "NEXT"
- This should remain consistent while scrolling

## Next Steps
1. Refactor hover logic to use visible position rather than array index
2. Consider using Embla Carousel's API to track visible slides
3. Ensure hover text remains accurate during and after scrolling

## Active Decisions
- Using shadcn carousel component (based on Embla)
- Using PP Editorial font for hover text
- Full-width layout with three visible images
