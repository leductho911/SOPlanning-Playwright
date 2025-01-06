import { test, expect } from '@playwright/test';
import ENV from '../utils/env';

test('has title', async ({ page }) => {
  await page.goto(''); //get the baseURL from the playwright.config.ts
  await expect(page).toHaveTitle("Snipe-IT");

  // to get the environment from global setup
  console.log(`This is password: ${ENV.ENV_NAME}`);
  console.log(`This is base URL: ${ENV.BASE_URL}`);
  console.log(`This is username: ${ENV.USERNAME}`);
  console.log(`This is password: ${ENV.PASSWORD}`);
  
});
