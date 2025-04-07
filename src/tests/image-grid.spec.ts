import { test, expect } from '@playwright/test';

test.describe('Image Grid', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the projects page
    await page.goto('/projects');
  });

  test('should render grid with correct layout pattern', async ({ page }) => {
    // Wait for grid to be visible
    await page.waitForSelector('[data-testid="image-grid"]');

    // Get all grid items
    const gridItems = await page.$$('[data-testid="grid-item"]');

    // Verify we have at least 6 items to test a complete pattern
    expect(gridItems.length).toBeGreaterThan(5);

    // Check layout pattern (2-1-2-1)
    for (let i = 0; i < 6; i++) {
      const item = gridItems[i];
      const isFullWidth = i === 2 || i === 5;
      
      if (isFullWidth) {
        // Check if item spans full width
        const hasFullWidth = await item.evaluate(el => 
          el.classList.contains('col-span-2') && el.classList.contains('row-span-2')
        );
        expect(hasFullWidth).toBe(true);
      } else {
        // Check if item is half width
        const isHalfWidth = await item.evaluate(el => 
          el.classList.contains('col-span-1')
        );
        expect(isHalfWidth).toBe(true);
      }
    }
  });

  test('should show hover effect on grid items', async ({ page }) => {
    // Wait for first grid item
    const firstItem = await page.waitForSelector('[data-testid="grid-item"]:first-child');
    
    // Get initial opacity of primary and secondary images
    const primaryImage = await firstItem.$('[data-testid="primary-image"]');
    const secondaryImage = await firstItem.$('[data-testid="secondary-image"]');
    
    // Hover over the item
    await firstItem.hover();
    
    // Check that primary image is hidden and secondary is visible
    await expect(primaryImage).toHaveClass(/opacity-0/);
    await expect(secondaryImage).toHaveClass(/opacity-100/);
  });

  test('grid should fill full width of container', async ({ page }) => {
    // Wait for grid
    const grid = await page.waitForSelector('[data-testid="image-grid"]');
    
    // Get grid and container widths
    const gridWidth = await grid.evaluate(el => el.offsetWidth);
    const containerWidth = await page.$eval('[data-testid="grid-container"]', el => el.offsetWidth);
    
    // Grid should fill container width (allowing for small rounding differences)
    expect(Math.abs(gridWidth - containerWidth)).toBeLessThanOrEqual(1);
  });
}); 