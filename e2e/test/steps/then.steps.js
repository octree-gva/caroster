import {Then} from 'cucumber';

Then(/^I see the event page$/, async () => {
  await browser.saveScreenshotByName('EventPage--created');
});

Then(/^I see event detail page$/, async () => {
  await browser.saveScreenshotByName('EventDetails--updated');
});

Then(/^I see the Tos page$/, async () => {
  await new Promise(resolve => setTimeout(resolve, 720));
  await browser.saveScreenshotByName('TosPage');
});

Then(/^I see the (.+) of the event$/, async field => {
  const element = await $(global.SCENE.scene.field(field));
  if (typeof global.SCENE.event[field] !== 'undefined' && field != 'date') {
    const value = global.SCENE.event[field];
    const elementValue = await element.getText();
    expect(value).toBe(elementValue);
  }
});

Then(/^I see my event$/, async () => {
  const titleElement = await $(global.SCENE.scene.field('title'));
  const headerTitle = await titleElement.getText();
  expect(headerTitle).toBe(global.SCENE.event.name);
});
