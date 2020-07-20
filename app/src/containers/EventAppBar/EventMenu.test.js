import React, {createRef} from 'react';
import EventMenu from './EventMenu';
import renderer from 'react-test-renderer';

describe('EventMenu', () => {
  const EventMenuDOM = renderer.create(
    <EventMenu anchorEl={() => <div></div>} />
  );
  it('should match snapshot without props', () => {
    expect(EventMenuDOM.toJSON()).toMatchSnapshot();
  });
});
