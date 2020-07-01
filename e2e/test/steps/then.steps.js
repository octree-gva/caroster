import {Then} from 'cucumber';

Then(/^I see the event page$/, async () => {
  await browser.saveScreenshotByName('NewEvent--success');
});

Then(/^I see the (.+) of the event$/, async field => {
  const element = await $(global.SCENE.scene.field(field));
  if (typeof global.SCENE.event[field] !== 'undefined') {
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
