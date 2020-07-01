import {Page} from './_page';
class _EventPage extends Page {
  /**
   *
   * @param {string} selector
   * @return {string}
   */
  field(selector) {
    // switch (selector) {
    //   case 'form':
    //     return '#NewEvent';
    // }
    throw new Error('Unknown selector ' + selector);
  }

  get name() {
    return 'EventDetail';
  }

  async open() {
    this._path = `/e/${global.SCENE.event.id}`;
    return super.open();
  }

  async submit() {
    await super.submit();
  }
}
export const EventPage = new _EventPage('/event/myevent-id');
