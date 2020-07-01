import {Page} from './_page';
class _NewCar extends Page {
  /**
   *
   * @param {string} selector
   * @return {string}
   */
  field(selector) {
    switch (selector) {
      case 'form':
        return '#NewCar';
      case 'name':
      case 'my car name':
        return '#NewCarName';
      case 'seats':
      case 'my car seats':
        return '.MuiSlider-marked';
      case 'meeting':
      case 'my car meeting':
        return '#NewCarMeeting';
      case 'event date':
      case 'my car event date':
        return '#NewCarDateTime';
      case 'phone':
      case 'my phone':
        return '#NewCarPhone';
      case 'car details':
      case 'my car details':
        return '#NewCarDetails';
      case 'submit':
        return 'button.MuiButton-contained';
    }
    throw new Error('Unknown selector ' + selector);
  }

  get name() {
    return 'NewCar';
  }

  async submit() {
    await new Promise(resolve => {
      setTimeout(resolve, 3000);
    });
    await browser.saveScreenshotByName(`${this.name}--filled`);

    //    await super.submit();
  }
}
export const NewCar = new _NewCar('/');
