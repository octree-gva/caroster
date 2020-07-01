import {When} from 'cucumber';
import {NewEvent} from '../pages/newEvent';
import {EventPage} from '../pages/eventPage';

When(/^I am on the homepage$/, {}, async () => {
  await NewEvent.open();
  global.SCENE.scene = NewEvent;
});

When(/^I am on the event page$/, {}, async () => {
  await EventPage.open();
  global.SCENE.scene = EventPage;
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

When(/^I write (.+) in (.+) field$/, {}, async (field, value) => {
  await global.SCENE.scene.type(field, value);
});

When(/^I go to the event detail page$/, async () => {
  await global.SCENE.scene.openTab('details');
});
