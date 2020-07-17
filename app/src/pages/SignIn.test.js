import React from 'react';
import renderer from 'react-test-renderer';
jest.mock('../containers/SignIn/index', () => ({
  __esModule: true,
  default: () => <span>/containers/SignIn component</span>,
}));
import SignIn from './SignIn';
describe('SignIn page', () => {
  const SignInPage = renderer.create(<SignIn />);
  it('match snapshot', () => {
    expect(SignInPage.toJSON()).toMatchSnapshot();
  });
});
