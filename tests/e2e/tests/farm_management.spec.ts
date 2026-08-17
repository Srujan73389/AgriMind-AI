import { test, expect } from '@playwright/test';

test.describe('Farm Management', () => {
  test('should add a farm, draw boundary, and add crop', async ({ page }) => {
    // Mock login
    await page.goto('/login');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button[type="submit"]');
    
    await page.goto('/farms');
    
    // Add Farm
    await page.click('text=Add New Farm');
    await page.fill('input[name="farmName"]', 'E2E Test Farm');
    
    // Mock drawing boundary - interact with map
    // Assuming Leaflet or similar where we can click to draw
    await page.click('.leaflet-container', { position: { x: 100, y: 100 } });
    await page.click('.leaflet-container', { position: { x: 200, y: 100 } });
    await page.click('.leaflet-container', { position: { x: 200, y: 200 } });
    await page.click('.leaflet-container', { position: { x: 100, y: 200 } });
    await page.click('.leaflet-container', { position: { x: 100, y: 100 } }); // close polygon
    
    await page.click('button:has-text("Save Farm")');
    
    await expect(page.locator('text=E2E Test Farm')).toBeVisible();
    
    // Add Crop
    await page.click('text=E2E Test Farm');
    await page.click('text=Add Field/Crop');
    await page.fill('input[name="fieldName"]', 'Field 1');
    await page.selectOption('select[name="cropType"]', 'wheat');
    await page.click('button:has-text("Save Field")');
    
    await expect(page.locator('text=Field 1')).toBeVisible();
    await expect(page.locator('text=wheat')).toBeVisible();
  });
});
