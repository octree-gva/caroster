import React, {createRef} from 'react';
import EventBar from './EventBar';
import renderer from 'react-test-renderer';

describe('EventBar', () => {
  const EventBarDOM = renderer.create(
    <EventBar anchorEl={() => <div></div>} />
  );
  it('should match snapshot without props', () => {
    expect(EventBarDOM.toJSON()).toMatchSnapshot();
  });
});
