import React from 'react';
import renderer from 'react-test-renderer';
jest.mock('../containers/SignUp/index', () => ({
  __esModule: true,
  default: () => <span>/containers/SignUp component</span>,
}));
import SignUp from './SignUp';
describe('SignUp page', () => {
  const SignUpPage = renderer.create(<SignUp />);
  it('match snapshot', () => {
    expect(SignUpPage.toJSON()).toMatchSnapshot();
  });
});
