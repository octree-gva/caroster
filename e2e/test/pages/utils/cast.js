/**
 *
 * @param {string} value
 * @return {string|undefined}
 */
export const cast = function (value) {
  const num = x => (x < 10 ? `0${x}` : `${x}`);
  let month;
  let day;
  let year;
  switch (value) {
    case 'my email':
      return global.SCENE.actor.email;
    case 'my event address':
      return global.SCENE.event.address;
    case 'my event date':
      month = global.SCENE.event.date.getMonth();
      day = global.SCENE.event.date.getDate();
      year = global.SCENE.event.date.getYear();
      return `${num(day)}.${num(month)}.${year}`;
    case 'my event name':
      return global.SCENE.event.name;
    case 'my car name':
      return global.SCENE.car.name;
    case 'my car seats':
      return '' + global.SCENE.car.seats;
    case 'my car meeting':
      return '' + global.SCENE.car.meeting;
    case 'my car event date':
      month = global.SCENE.car.meeting_date.getMonth();
      day = global.SCENE.car.meeting_date.getDate();
      year = global.SCENE.car.meeting_date.getYear();
      return `${num(day)}.${num(month)}.${year}`;
    case 'my phone':
      return global.SCENE.actor.phone;
    case 'my car infos':
      return global.SCENE.actor.phone;
  }

  return value;
};
