import {Page} from './_page';
import {EventPage} from './eventPage';
class _NewEventStep2 extends Page {
  /**
   *
   * @param {string} selector
   * @return {string}
   */
  field(selector) {
    switch (selector) {
      case 'form':
        return '#NewEvent';
      case 'event date':
      case 'my event date':
        return '#NewEventDate';
      case 'event address':
      case 'my event address':
        return '#NewEventAddress';
      case 'submit':
        return 'button.MuiButton-root';
    }
    throw new Error('Unknown selector ' + selector);
  }

  get name() {
    return 'NewEvent.step.2';
  }

  async submit() {
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });
    await super.submit();
    global.SCENE.scene = EventPage;
    EventPage.waitForDisplayed();
  }
}
export const NewEventStep2 = new _NewEventStep2('/');
