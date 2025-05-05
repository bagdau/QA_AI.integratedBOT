import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 10000,
  retries: 0,
  use: {
    headless: false, // Поставь true, если хочешь без браузера
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
});
