// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = {
      a: 2,
      b: 3,
      action: Action.Add,
    };
    expect(simpleCalculator(input)).toEqual(5);
  });

  test('should subtract two numbers', () => {
    const input = {
      a: 5,
      b: 2,
      action: Action.Subtract,
    };
    expect(simpleCalculator(input)).toEqual(3);
  });

  test('should multiply two numbers', () => {
    const input = {
      a: 2,
      b: 3,
      action: Action.Multiply,
    };
    expect(simpleCalculator(input)).toEqual(6);
  });

  test('should divide two numbers', () => {
    const input = {
      a: 6,
      b: 2,
      action: Action.Divide,
    };
    expect(simpleCalculator(input)).toEqual(3);
  });

  test('should exponentiate two numbers', () => {
    const input = {
      a: 3,
      b: 2,
      action: Action.Exponentiate,
    };
    expect(simpleCalculator(input)).toEqual(9);
  });

  test('should return null for invalid action', () => {
    const input = {
      a: 3,
      b: 2,
      action: 'invalid action',
    };
    expect(simpleCalculator(input)).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    const input = {
      a: 'invalid arguments',
      b: 3,
      action: Action.Add,
    };
    expect(simpleCalculator(input)).toEqual(null);
  });
});
