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
      const month = global.SCENE.event.date.getMonth();
      const day = global.SCENE.event.date.getDay();
      const year = global.SCENE.event.date.getYear();
      const num = x => (x < 10 ? `0${x}` : `${x}`);
      return `${num(day)}.${num(month)}.${year}`;
    case 'my event name':
      return global.SCENE.event.name;
  }

  return value;
};
