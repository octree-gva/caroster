import React from 'react';
import renderer from 'react-test-renderer';
import SignUp from './SignUp';

describe('SignUp', () => {
  const signUpNode = renderer.create(<SignUp />);
  it('match snapshot without props', () => {
    expect(signUpNode.toJSON()).toMatchSnapshot();
  });

  it('can not submit the form until email and password is set', () => {});
});
