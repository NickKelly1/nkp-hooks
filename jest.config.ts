import { Config } from '@jest/types';

// eslint-disable-next-line no-undef
// eslint-disable-next-line import/no-anonymous-default-export
export default async (): Promise<Config.InitialOptions> => ({
  // verbose: true,

  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  // moduleFileExtensions: ['ts', 'js', 'jsx', 'tsx'],

  // https://stackoverflow.com/questions/50411719/shared-utils-functions-for-testing-with-jest/52910794
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
    },
  },

  // https://www.carlrippon.com/using-jest-and-rtl-with-react-typescript/
  setupFilesAfterEnv: [
    '<rootDir>/jest-setup.ts',
  ],

  modulePathIgnorePatterns: [
    '/node_modules/',
  ],
});
