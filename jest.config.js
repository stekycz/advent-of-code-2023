module.exports = {
  // https://jestjs.io/docs/configuration#clearmocks-boolean
  clearMocks: true,
  // https://jestjs.io/docs/configuration#resetmocks-boolean
  resetMocks: true,
  // https://jestjs.io/docs/configuration#restoremocks-boolean
  restoreMocks: true,

  // https://jestjs.io/docs/configuration#errorondeprecated-boolean
  errorOnDeprecated: true,

  // https://jestjs.io/docs/configuration#modulefileextensions-arraystring
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],

  reporters: [['default', { summaryThreshold: 0 }]],

  // https://jestjs.io/docs/configuration#setupfilesafterenv-array
  setupFilesAfterEnv: [require.resolve('jest-extended/all')],

  // https://jestjs.io/docs/configuration#testenvironment-string
  testEnvironment: 'node',

  // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        // As we have `isolatedModules: true` check enabled in our TSConfig, we can afford to skip expensive checks here.
        // https://kulshekhar.github.io/ts-jest/docs/getting-started/options/isolatedModules/
        isolatedModules: true,
        // Unfortunately we have to override module resolution from Node16 to Node in tests, otherwise they fail
        // Possibly related to https://github.com/kulshekhar/ts-jest/issues/4198
        tsconfig: {
          moduleResolution: 'Node',
        },
      },
    ],
  },

  // https://jestjs.io/docs/configuration#testmatch-arraystring
  testMatch: [`<rootDir>/src/**/__tests__/*.test.(ts|mts|cts|js|mjs|cjs)`],

  // https://jestjs.io/docs/configuration#verbose-boolean
  verbose: true,
};
