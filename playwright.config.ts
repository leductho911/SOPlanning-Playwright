import { defineConfig, devices } from '@playwright/test';
import ENV from './utils/env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    baseURL: ENV.BASE_URL, // get from global setup and pass to baseURL for the test file use it
    extraHTTPHeaders: {
      'SOPLANNING-API': `${ENV.API_KEY}`,
    },
  },
  globalSetup: "utils/globalSetup.ts", // globalSetup need for environment variables

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        deviceScaleFactor: undefined,
        viewport: null,
        launchOptions: {
          args: ['--start-maximized']
        },
      },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

  ],

});
