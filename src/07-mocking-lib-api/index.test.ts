// Uncomment the code below and write your tests
import axios from 'axios';
//const { create } = jest.requireActual('node-fetch');
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    jest.useFakeTimers();
    const BASE_URL = 'https://jsonplaceholder.typicode.com';
    const TEST_PATH = '/test';
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: 'response data' }),
    });
    jest.runAllTimers();
    await throttledGetDataFromApi(TEST_PATH);
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: BASE_URL,
    });
  });

  test('should perform request to correct provided url', async () => {
    jest.useFakeTimers();
    const TEST_PATH = '/test';
    const mock = jest.fn().mockResolvedValue({ data: 'response data' });
    (axios.create as jest.Mock).mockReturnValue({
      get: mock,
    });
    await throttledGetDataFromApi(TEST_PATH);
    jest.runAllTimers();
    expect(mock).toHaveBeenCalledWith(TEST_PATH);
    // Write your test here
  });

  test('should return response data', async () => {
    // Write your test here
  });
});
