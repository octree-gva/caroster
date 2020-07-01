import {Given} from 'cucumber';

Given(/^I am vistor$/, () => {
  console.log('hello visitor');
});

Given(/^I have created an event$/, async () => {
  await SCENE.createEvent();
});
