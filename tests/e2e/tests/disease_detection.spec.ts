import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Disease Detection', () => {
  test('should allow image upload and show results', async ({ page }) => {
    // Assuming user is already logged in or mock it
    // For e2e, usually there's a global setup for auth. We'll mock standard login here.
    await page.goto('/login');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button[type="submit"]');
    
    await page.goto('/vision/detect');
    
    // Upload image
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click('text=Upload Image');
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, '../../fixtures/test_leaf.jpg'));
    
    // Select crop
    await page.selectOption('select[name="crop"]', 'tomato');
    
    // Submit
    await page.click('button:has-text("Analyze")');
    
    // See results
    await expect(page.locator('.results-card')).toBeVisible();
    await expect(page.locator('.disease-name')).toBeVisible();
    await expect(page.locator('.confidence-score')).toContainText('%');
  });
});
