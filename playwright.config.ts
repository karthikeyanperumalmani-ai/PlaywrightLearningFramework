import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// ✅ Load .env variables
dotenv.config({ path: `.env.${process.env.ENV || 'qa'}` })

// Read values from env
const browser = process.env.BROWSER || 'chromium';
const isHeadless = process.env.HEADLESS !== 'false';
const baseURL = process.env.BASE_URL || '';

/**
 * Map browser dynamically
 */
const getProject = () => {
  switch (browser.toLowerCase()) {
    case 'chrome':
      return {
        name: 'Google Chrome',
        use: { ...devices['Desktop Chrome'], channel: 'chrome' },
      };
    case 'firefox':
      return {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] },
      };
    case 'webkit':
      return {
        name: 'webkit',
        use: { ...devices['Desktop Safari'] },
      };
    default:
      return {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      };
  }
};

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter:'html',
//  reporter: [
//     ['monocart-reporter', {
//       name: 'My Test Report',
//       outputFile: './monocart-report/index.html'
//     }]
//   ],

  use: {
    baseURL: baseURL,                 // ✅ from .env
    headless: process.env.CI ? true : isHeadless,           // ✅ dynamic from .env
    trace: 'on-first-retry',
    screenshot: 'on-first-failure',
  },

  projects: [getProject()],
});
``