// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import './i18n';

// FROM https://github.com/akiran/react-slick/blob/master/test-setup.js
window.matchMedia =
  window.matchMedia ||
  (() => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  }));

window.requestAnimationFrame =
  window.requestAnimationFrame || (callback => setTimeout(callback, 0));
