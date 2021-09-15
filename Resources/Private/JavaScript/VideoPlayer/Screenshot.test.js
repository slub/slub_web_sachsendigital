const { renderScreenshot } = require('./Screenshot');

test('basic', () => {
  expect(renderScreenshot).toBeInstanceOf(Function);
});
