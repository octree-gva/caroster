import React from 'react';
import renderer from 'react-test-renderer';
import SignIn from './SignIn';

describe('SignIn', () => {
  const signIn = renderer.create(<SignIn />);
  it('match snapshot without props', () => {
    expect(signIn.toJSON()).toMatchSnapshot();
  });

  it('can not submit the form until email and password is set', () => {});
});
