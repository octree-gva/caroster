import {test as base} from '@playwright/test';
import {EventPage} from '../page-objects/event-page';

type EventFixtures = {
  eventPage: EventPage;
};

export const test = base.extend<EventFixtures>({
  eventPage: async ({page}, use) => {
    const eventPage = new EventPage(page);
    await eventPage.createEvent('Test event');
    await eventPage.goto();

    await use(eventPage);

    // TODO Set clear actions
  },
});

export {expect} from '@playwright/test';
