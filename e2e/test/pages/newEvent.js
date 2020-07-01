import {Page} from './_page';
import {NewEventStep2} from './newEventStep2';
class _NewEvent extends Page {
  /**
   *
   * @param {string} selector
   * @return {string}
   */
  field(selector) {
    switch (selector) {
      case 'form':
        return '#NewEvent';
      case 'event name':
      case 'my event name':
        return '#NewEventName';
      case 'tos':
      case 'accept the Tos':
        return '#NewEventTos';
      case 'email':
      case 'my email':
        return '#NewEventEmail';
      case 'submit':
        return 'button.MuiButton-root';
    }
    throw new Error('Unknown selector ' + selector);
  }

  get name() {
    return 'NewEvent.step.1';
  }

  async submit() {
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });
    await super.submit();
    global.SCENE.scene = NewEventStep2;
    await NewEventStep2.waitForDisplayed();
  }
}
export const NewEvent = new _NewEvent('/');
