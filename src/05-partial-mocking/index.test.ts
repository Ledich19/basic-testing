// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    mockOne();
    mockTwo();
    mockThree();

    expect(mockOne).toHaveBeenCalled();
    expect(consoleLogSpy).not.toHaveBeenCalledWith('foo');
    expect(mockTwo).toHaveBeenCalled();
    expect(consoleLogSpy).not.toHaveBeenCalledWith('baz');
    expect(mockThree).toHaveBeenCalled();
    expect(consoleLogSpy).not.toHaveBeenCalledWith('baz');
    // Write your test here
  });

  test('unmockedFunction should log into console', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    unmockedFunction();
    expect(consoleLogSpy).toHaveBeenCalledWith('I am not mocked');
    consoleLogSpy.mockRestore();
  });
});
