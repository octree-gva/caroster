import {expect, test} from './fixtures/event';

test.describe('Passenger in travel', () => {
  test('add passenger to travel', async ({eventPage, page}) => {
    await eventPage.addTravel();
    await eventPage.addPassenger('Tim');

    await expect(
      page.getByText('Tim has been added to this car')
    ).toBeVisible();
  });

  test('remove passenger from travel', async ({eventPage, page}) => {
    await eventPage.addTravel();
    await eventPage.addPassenger('Tim');

    await page.locator('button').filter({hasText: 'close'}).first().click();

    await expect(
      page.getByText('Passenger was moved to the waiting list.')
    ).toBeVisible();
  });
});
