import {Page} from './_page';
import {EventDetails} from './eventDetails';
class _EditEvent extends Page {
  /**
   *
   * @param {string} selector
   * @return {string}
   */
  field(selector) {
    switch (selector) {
      case 'form':
        return '#EditEvent';
      case 'event name':
      case 'my event name':
        return '#EditEventName';
      case 'event date':
      case 'my event date':
        return '#EditEventDate';
      case 'event address':
      case 'my event address':
        return '#EditEventAddress';
      case 'submit':
        return '#EditEventSubmit';
    }
    throw new Error('Unknown selector ' + selector);
  }

  get name() {
    return 'EditEvent.step.1';
  }

  async submit() {
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });
    await super.submit();
    SCENE.scene = EventDetails;
    await EventDetails.waitForDisplayed(2000);
  }
}
export const EditEvent = new _EditEvent('/');
