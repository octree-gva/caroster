const axios = require('axios');
const controller = require('./controllers/event');

jest.mock('axios');

beforeAll(() => {
  global.strapi.plugins['email-designer'].services.template.fetch = jest.fn(
    () => 1
  );
  global.strapi.plugins['email-designer'].services.email.sendTemplatedEmail =
    jest.fn();

  axios.get.mockResolvedValue({data: [{lat: 0, lng: 0}]});
});

describe('controller.event.findOne', () => {
  test('gets sanitized event', async () => {
    const ctx = getContext();
    ctx.setParams({
      uuid: '00000000-0000-0000-0000-000000000000',
    });

    const result = await controller.findOne(ctx);
    expect(result).toEqual(
      expect.objectContaining({
        name: 'Test event',
        email: 'test@example.org',
        date: '2022-01-12',
        address: 'Uni-mail, Geneva, CH',
        uuid: '00000000-0000-0000-0000-000000000000',
        waitingList: expect.any(Array),
      })
    );
    expect(result).toEqual(
      expect.not.objectContaining({
        created_by: expect.any(String),
        users: expect.any(Array),
      })
    );
  });

  test('sends bad request if user does not exist', async () => {
    const ctx = getContext();
    ctx.setParams({
      uuid: 'does not exist',
    });
    await controller.findOne(ctx);
    expect(ctx.badRequest).toHaveBeenCalled();
  });
});

describe('controller.event.create', () => {
  test('creates new event', async () => {
    const event = {
      name: 'New event',
      email: 'test@test.com',
      address: 'Event address',
      date: '2022-12-12',
    };
    const ctx = getContext();
    ctx.setBody(event);
    const result = await controller.create(ctx);
    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        uuid: expect.any(String),
        email: event.email,
        address: event.address,
        date: event.date,
      })
    );
  });
});

describe('controller.event.update', () => {
  test('updates event', async () => {
    const uuid = '00000000-0000-0000-0000-000000000000';
    const eventUpdate = {
      name: 'Updated event',
      email: 'test+update@test.com',
      address: 'New event address',
    };
    const ctx = getContext();
    ctx.setParams({uuid});
    ctx.setBody(eventUpdate);

    const result = await controller.update(ctx);
    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        uuid: uuid,
        email: eventUpdate.email,
        address: eventUpdate.address,
      })
    );
  });

  test('sends bad request if user does not exist', async () => {
    const ctx = getContext();
    ctx.setParams({
      uuid: 'does not exist',
    });
    await controller.update(ctx);
    expect(ctx.badRequest).toHaveBeenCalled();
  });
});
