const app = require('../lib/add.js');

describe('Addition', () => {
  it('The function should add 2 numbers', () => {
    const value = app.addNumber(5, 6);

    expect(value).toBe(11);
  });
});
