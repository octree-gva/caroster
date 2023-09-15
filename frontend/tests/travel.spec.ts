import {expect, test} from './fixtures/event';

test.describe('Travels', () => {
  test('add new travel', async ({eventPage, page}) => {
    await eventPage.addTravel();
    await expect(page.getByText('The car has been created')).toBeVisible();
  });

  test('update existing travel', async ({eventPage, page}) => {
    await eventPage.addTravel();

    await page.locator('#EditTravelBtn').first().click();
    await page.getByLabel('Choose date').click();
    await page.getByLabel('Next month').click();
    await page.waitForTimeout(1000);
    await page.getByRole('gridcell', {name: '19'}).click();
    if (await page.getByRole('button', {name: 'OK'}).isVisible())
      page.getByRole('button', {name: 'OK'}).click();
    await page.getByLabel('Choose time').click();
    await page.locator('.MuiClock-squareMask').click();
    await page.locator('.MuiClock-squareMask').click();
    if (await page.getByRole('button', {name: 'OK'}).isVisible())
      page.getByRole('button', {name: 'OK'}).click();
    await page.getByLabel('Telephone number').click();
    await page.getByLabel('Telephone number').fill('555 555 55 55');
    await page.getByText('7', {exact: true}).click();
    await page.getByRole('button', {name: 'Save'}).click();

    await expect(page.getByText('555 555 55 55')).toBeVisible();
    // TODO Add a toast on travel edition ?
  });

  test('remove travel', async ({eventPage, page}) => {
    await eventPage.addTravel();

    await page.locator('#EditTravelBtn').first().click();
    await page.getByRole('button', {name: 'Remove'}).click();
    await page.getByRole('button', {name: 'Confirm'}).click();
    await expect(
      page.getByText(
        'The car has been removed and its passengers moved to the waiting list.'
      )
    ).toBeVisible();
  });
});
