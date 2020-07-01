import {Then} from 'cucumber';

Then(/^I see the event page$/, async () => {
  await browser.saveScreenshotByName('NewEvent--success');
});

Then(/^I see my event$/, async () => {
  const titleElement = await $('.MuiToolbar-root h6');
  const headerTitle = await titleElement.getText();
  expect(headerTitle).toBe(SCENE.event.name);
});
