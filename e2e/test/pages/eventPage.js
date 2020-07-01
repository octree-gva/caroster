import {Page} from './_page';
import {EventDetails} from './eventDetails';
import {NewCar} from './newCar';
class _EventPage extends Page {
  /**
   *
   * @param {string} selector
   * @return {string}
   */
  field(selector) {
    switch (selector) {
      case 'menu':
        return '#MenuMoreInfo';
      case 'title':
        return '#MenuHeaderTitle';
      case 'detail tab':
        return '#DetailsTab';
      case 'new car tab':
        return '#NewCarTab';
      case 'invite tab':
        return '#InviteTab';
    }
    throw new Error('Unknown selector ' + selector);
  }

  get name() {
    return 'EventDetail';
  }

  async open() {
    this._path = `/e/${global.SCENE.event.id}`;
    return super.open();
  }
  async openMenu() {
    const menu = await $(this.field('menu'));
    await menu.click();
    await browser.saveScreenshotByName(`${this.name}--openMenu`);
  }
  async openTab(tab) {
    await this.openMenu();
    switch (tab) {
      case 'details':
        const tab = await $(this.field('detail tab'));
        await tab.click();
        global.SCENE.scene = EventDetails;
        await EventDetails.waitForDisplayed();
        return;
      case 'new car':
        const tab = await $(this.field('new car tab'));
        await tab.click();
        global.SCENE.scene = NewCar;
    }
  }

  async submit() {
    await super.submit();
  }
}
export const EventPage = new _EventPage('/event/myevent-id');
