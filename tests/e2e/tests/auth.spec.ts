import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should allow user to register, login and see dashboard', async ({ page }) => {
    // Navigate to register
    await page.goto('/register');
    
    // Fill in registration form
    const timestamp = Date.now();
    const email = `testuser_${timestamp}@example.com`;
    const password = 'StrongPassword123!';
    
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.fill('input[name="confirmPassword"]', password);
    await page.click('button[type="submit"]');
    
    // Wait for redirect to login or auto-login
    await expect(page).toHaveURL(/.*(login|dashboard)/);
    
    // If redirected to login, login
    if (page.url().includes('login')) {
      await page.fill('input[name="email"]', email);
      await page.fill('input[name="password"]', password);
      await page.click('button[type="submit"]');
    }
    
    // Verify dashboard
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('h1')).toContainText('Dashboard');
  });
});
