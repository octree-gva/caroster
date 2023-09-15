import {test as setup, expect} from '@playwright/test';

const email = process.env.TEST_EMAIL || '';
const password = process.env.TEST_PASSWORD || '';

const authFile = 'tests/playwright/.auth/user.json';

setup('authenticate', async ({page}) => {
  await page.goto('/fr/auth/login');
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Email').press('Tab');
  await page.locator('input[name="password"]').fill(password);
  await page.getByRole('button', {name: 'Se connecter'}).click();
  await page.waitForURL('/fr/dashboard/');

  await expect(
    page.getByRole('heading', {name: 'Mes Carosters'})
  ).toBeVisible();

  await page.context().storageState({path: authFile});
});
