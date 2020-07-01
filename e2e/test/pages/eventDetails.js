import {Page} from './_page';
import {NewEventStep2} from './newEventStep2';
class _EventDetails extends Page {
  /**
   *
   * @param {string} selector
   * @return {string}
   */
  field(selector) {
    switch (selector) {
      case 'name':
        return '#MenuHeaderTitle';
      case 'date':
        return '#EventDate';
      case 'address':
        return '#EventAddress';
      case 'address map':
        return '#EventAddressMap';
      case 'submit':
      case 'edit':
        return '#DetailsEditBtn';
    }
    throw new Error('Unknown selector ' + selector);
  }

  get name() {
    return 'EventDetails';
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
export const EventDetails = new _EventDetails('/');
