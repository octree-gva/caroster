/**
 *
 * @param {string} value
 * @return {string|undefined}
 */
export const cast = function (value) {
  switch (value) {
    case 'my email':
      return global.SCENE.actor.email;
    case 'my event address':
      return global.SCENE.event.address;
    case 'my event date':
      return global.SCENE.event.date;
    case 'my event name':
      return global.SCENE.event.name;
    case 'my car name':
      return global.SCENE.car.name;
    case 'my car seats':
      return '' + global.SCENE.car.seats;
    case 'my car meeting':
      return '' + global.SCENE.car.meeting;
    case 'my car event date':
      return global.SCENE.car.meeting_date;
    case 'my phone':
      return global.SCENE.actor.phone;
    case 'my car infos':
      return global.SCENE.actor.phone;
  }

  return value;
};
