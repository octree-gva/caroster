import {When} from 'cucumber';
import {NewEvent} from '../pages/newEvent';
import {EditEvent} from '../pages/editEvent';
import {EventPage} from '../pages/eventPage';

When(/^I am on the homepage$/, {}, async () => {
  await NewEvent.open();
  global.SCENE.scene = NewEvent;
});

When(/^I am on the event page$/, {}, async () => {
  await EventPage.open();
  global.SCENE.scene = EventPage;
});

When(/^I see the event edit page$/, {}, async () => {
  await EditEvent.waitForDisplayed();
  global.SCENE.scene = EditEvent;
});

When(/^I type (.+)$/, {}, async field => {
  await global.SCENE.scene.type(field);
});

When(/^I click (.+)$/, {}, async field => {
  await global.SCENE.scene.click(field);
});

When(/^I submit the form$/, {}, async () => {
  await global.SCENE.scene.submit();
});

When(/^I write (.+) in (.+) field$/, {}, async (value, field) => {
  await global.SCENE.scene.type(field, value);
});
When(/^I pick (.+)$/, {}, async field => {
  await global.SCENE.scene.pick(field);
});

When(/^I go to the event detail page$/, async () => {
  await global.SCENE.scene.openTab('details');
});
When(/^I go to the new car page$/, async () => {
  await global.SCENE.scene.openTab('new car');
});
