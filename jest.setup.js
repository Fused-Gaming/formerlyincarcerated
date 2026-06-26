// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Polyfill for setImmediate which is not available in jsdom
if (typeof global.setImmediate === 'undefined') {
  global.setImmediate = (callback) => setTimeout(callback, 0)
  global.clearImmediate = clearTimeout
}
