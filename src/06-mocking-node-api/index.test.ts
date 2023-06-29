// Uncomment the code below and write your tests
// import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';

type FsPromisesType = typeof fsp & {
  __setMockFiles: (
    newMockFiles: { [key: string]: string },
    dirname: string,
  ) => void;
};
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockFn = jest.fn();
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(mockFn, 4000);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(mockFn, 4000);
  });

  test('should call callback only after timeout', () => {
    const mockFn = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(mockFn, 4000);
    expect(mockFn).not.toBeCalled();
    jest.runAllTimers();
    expect(mockFn).toBeCalled();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const PROVIDED_TIME = 4000;
    const mockFn = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(mockFn, PROVIDED_TIME);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(mockFn, PROVIDED_TIME);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const PROVIDED_TIME = 4000;
    const INTERVALS = 5;
    const mockFn = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(mockFn, PROVIDED_TIME);

    for (let i = 0; i < INTERVALS; i++) {
      jest.advanceTimersByTime(PROVIDED_TIME);
    }
    expect(mockFn).toHaveBeenCalledTimes(INTERVALS);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinFnMock = jest.spyOn(path, 'join');
    const pathToFile = 'path/to/file.txt';
    await readFileAsynchronously(pathToFile);
    expect(joinFnMock).toHaveBeenCalledWith(__dirname, pathToFile);
    joinFnMock.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const MOCK_FILE_INFO = {
      '/path/to/file1.js': 'console.log("file1 contents");',
      '/path/to/file2.txt': 'file2 contents',
    };
    (fsp as FsPromisesType).__setMockFiles(MOCK_FILE_INFO, __dirname);
    const fileContent = await readFileAsynchronously('/path/to/no-exist.js');
    console.log('fileContent', fileContent);
    expect(fileContent).toBe(null);
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const MOCK_FILE_INFO = {
      '/path/to/file1.js': 'console.log("file1 contents");',
      '/path/to/file2.txt': 'file2 contents',
    };
    (fsp as FsPromisesType).__setMockFiles(MOCK_FILE_INFO, __dirname);
    const fileContent = await readFileAsynchronously('/path/to/file1.js');
    console.log('fileContent', fileContent);
    expect(fileContent).toBe('console.log("file1 contents");');
  });
});
