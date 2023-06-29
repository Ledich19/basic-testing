import path from 'path';

type MockFiles = { [key: string]: string };
export type FsPromisesType = {
  __setMockFiles: (newMockFiles: MockFiles, dirname: string) => void;
  readFile: (directoryPath: string) => string | null;
};

const promises: FsPromisesType = jest.createMockFromModule('fs/promises');

let mockFiles = Object.create(null);
const __setMockFiles = (newMockFiles: MockFiles, dirname: string) => {
  mockFiles = Object.create(null);
  for (const file in newMockFiles) {
    const fullPath = path.join(dirname, file);
    mockFiles[fullPath] = newMockFiles[file];
  }
};

const readFile = (directoryPath: string) => {
  return mockFiles[directoryPath] || null;
};

promises.__setMockFiles = __setMockFiles;
promises.readFile = readFile;

export default promises;
