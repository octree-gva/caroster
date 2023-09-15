import {expect, test} from './fixtures/event';

test('new event', async ({eventPage, page}) => {
  await expect(page.getByLabel(eventPage.name)).toBeVisible();
  await expect(page.getByLabel(eventPage.name)).toHaveId('MenuHeaderTitle');
});
