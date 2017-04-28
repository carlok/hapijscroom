const sep = require('path').sep;
const state = require(`..${sep}lib${sep}state`);

describe('State', () => {
  it('Counter should turn from 0 to 1', () => {
    expect(state.counter(0, { type: 'INCREMENT' })).toBe(1);
  });

  it('Counter should turn from 1 to 2', () => {
    expect(state.counter(1, { type: 'INCREMENT' })).toBe(2);
  });

  it('Counter should turn from 0 to 1-', () => {
    expect(state.counter(0, { type: 'DECREMENT' })).toBe(-1);
  });

  it('Counter should turn from 2 to 2', () => {
    expect(state.counter(2, {})).toBe(2);
  });

  it('Counter should turn from 2 to 2', () => {
    expect(state.counter()).toBe(0);
  });

  it('Counter should turn from 2 to 2', () => {
    expect(state.counter(undefined, {type: 'INCREMENT'})).toBe(1);
  });
});
