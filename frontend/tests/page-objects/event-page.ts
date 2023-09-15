import type {Page} from '@playwright/test';

const API_URL = 'http://localhost:1337';

export class EventPage {
  public uuid: string;
  public name: string;

  constructor(public readonly page: Page) {}

  async createEvent(name: string) {
    const response = await fetch(`${API_URL}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email: 'test@example.org',
        date: '2030-01-30',
      }),
    });
    const payload = await response.json();
    this.uuid = payload.uuid;
    this.name = name;
  }

  async goto() {
    await this.page.goto(`/e/${this.uuid}`);
  }

  async addTravel(carName = 'Test car') {
    await this.page.getByLabel('add-car').click();
    await this.page.getByLabel('Name of the car').click();
    await this.page.getByLabel('Name of the car').fill(carName);
    await this.page.getByLabel('Telephone number').click();
    await this.page.getByLabel('Telephone number').fill('0044 444 44 44');
    await this.page.getByLabel('Choose date').click();
    await this.page.getByLabel('Next month').click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('gridcell', {name: '28'}).click();
    if (await this.page.getByRole('button', {name: 'OK'}).isVisible())
      this.page.getByRole('button', {name: 'OK'}).click();
    await this.page.getByLabel('Meeting place').click();
    await this.page.getByLabel('Meeting place').fill('Au coin de la rue');
    await this.page.getByLabel('Additional information').click();
    await this.page
      .getByLabel('Additional information')
      .fill("J'aime le vent dans mes cheveux");
    await this.page.getByRole('button', {name: 'Add'}).click();
  }

  async addPassenger(name: string) {
    // Select first travel (fail if it does not exist)
    await this.page
      .getByRole('button', {name: 'Add to passenger'})
      .first()
      .click();
    await this.page.getByPlaceholder('Name').click();
    await this.page.getByPlaceholder('Name').fill(name);
    await this.page.getByRole('button', {name: 'Add to car'}).click();
  }
}
