# Configurando o Jest

<!-- TOC -->

- [Configurando o Jest](#configurando-o-jest)
  - [babel.config.js](#babelconfigjs)
  - [jest.config.js](#jestconfigjs)
  - [nodemon.json](#nodemonjson)
  - [eslintrc.js](#eslintrcjs)
  - [**tests**/example.test.js](#testsexampletestjs)

<!-- /TOC -->

> Essa config não é necessária pro React, pois já vem o Jest nele.

Instale o jest e também a lib `@types/jest` (ajuda na intellisense do vscode)
`yarn add jest @types/jest -D`

Inicie o jest:
`yarn jest --init`

Responda umas tetas. No curso as perguntas eram outras. Agora, tb perguntou se
uso Typescript, tbm sobre qual provider do code coverage (v8 ou babel). Escolhi
v8 sem motivo.

Nascerá o `jest.config.js`.

## babel.config.js

Na aula, o professor disse q o Jest não suporta ES6+, daí instala o
`@sucrase/jest-plugin`, mas o jest atualizou, e agora mudou um pouco a config. Em
vez do sucrase-jest, vc agora vai instalar outras libs:

`yarn add --dev babel-jest @babel/core @babel/preset-env`

```javascript
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
};
```

## jest.config.js

- Eu vou configurar pra testar apenas o que está dentro de app, que são os
  controllers, middlewares e models. Não vou cobrir o teste com as rotas e
  database, pois não é função do jest ficar testando eles.

- Se usar typescript, tem q colocar o `preset: 'ts-jest',`, e instalar esta lib.
  Na dúvida, veja a documentação.

```diff
/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // Stop running tests after `n` failures
-  // bail: 0,
+  bail: 1,

  // The directory where Jest should store its cached dependency information
  // cacheDirectory: "/tmp/jest_rs",

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
-  // collectCoverageFrom: undefined,
+  collectCoverageFrom: ['src/app/**/*.js'],

  // The directory where Jest should output its coverage files
-  coverageDirectory: "coverage",
+  coverageDirectory: '__tests__/coverage',

  // An array of regexp pattern strings used to skip coverage collection
  // coveragePathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A list of reporter names that Jest uses when writing coverage reports
-  // coverageReporters: [
-  //   "json",
-  //   "text",
-  //   "lcov",
-  //   "clover"
-  // ],
+  coverageReporters: ['text', 'lcov'],

  // An object that configures minimum threshold enforcement for coverage results
  // coverageThreshold: undefined,

  // A path to a custom dependency extractor
  // dependencyExtractor: undefined,

  // Make calling deprecated APIs throw helpful error messages
  // errorOnDeprecated: false,

  // Force coverage collection from ignored files using an array of glob patterns
  // forceCoverageMatch: [],

  // A path to a module which exports an async function that is triggered once before all test suites
  // globalSetup: undefined,

  // A path to a module which exports an async function that is triggered once after all test suites
  // globalTeardown: undefined,

  // A set of global variables that need to be available in all test environments
  // globals: {},

  // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
  // maxWorkers: "50%",

  // An array of directory names to be searched recursively up from the requiring module's location
  // moduleDirectories: [
  //   "node_modules"
  // ],

  // An array of file extensions your modules use
  // moduleFileExtensions: [
  //   "js",
  //   "jsx",
  //   "ts",
  //   "tsx",
  //   "json",
  //   "node"
  // ],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  // moduleNameMapper: {},

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  // modulePathIgnorePatterns: [],

  // Activates notifications for test results
  // notify: false,

  // An enum that specifies notification mode. Requires { notify: true }
  // notifyMode: "failure-change",

  // A preset that is used as a base for Jest's configuration
  // preset: undefined,

  // Run tests from one or more projects
  // projects: undefined,

  // Use this configuration option to add custom reporters to Jest
  // reporters: undefined,

  // Automatically reset mock state between every test
  // resetMocks: false,

  // Reset the module registry before running each individual test
  // resetModules: false,

  // A path to a custom resolver
  // resolver: undefined,

  // Automatically restore mock state between every test
  // restoreMocks: false,

  // The root directory that Jest should scan for tests and modules within
  // rootDir: undefined,

  // A list of paths to directories that Jest should use to search for files in
  // roots: [
  //   "<rootDir>"
  // ],

  // Allows you to use a custom runner instead of Jest's default test runner
  // runner: "jest-runner",

  // The paths to modules that run some code to configure or set up the testing environment before each test
  // setupFiles: [],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  // setupFilesAfterEnv: [],

  // The number of seconds after which a test is considered as slow and reported as such in the results.
  // slowTestThreshold: 5,

  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  // snapshotSerializers: [],

  // The test environment that will be used for testing
  // testEnvironment: "jest-environment-node",

  // Options that will be passed to the testEnvironment
  // testEnvironmentOptions: {},

  // Adds a location field to test results
  // testLocationInResults: false,

  // The glob patterns Jest uses to detect test files
-  // testMatch: [
-  //   "**/__tests__/**/*.[jt]s?(x)",
-  //   "**/?(*.)+(spec|test).[tj]s?(x)"
-  // ],
+  testMatch: ['**/__tests__/**/*.test.js'],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  // testPathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // The regexp pattern or array of patterns that Jest uses to detect test files
  // testRegex: [],

  // This option allows the use of a custom results processor
  // testResultsProcessor: undefined,

  // This option allows use of a custom test runner
  // testRunner: "jest-circus/runner",

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  // testURL: "http://localhost",

  // Setting this value to "fake" allows the use of fake timers for functions such as "setTimeout"
  // timers: "real",

  // A map from regular expressions to paths to transformers
  // transform: undefined,
+  transform: {
+    // '^.+\\.(ts|tsx)?$': 'ts-jest',
+    '^.+\\.(js|jsx)$': 'babel-jest',
+  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  // transformIgnorePatterns: [
  //   "/node_modules/",
  //   "\\.pnp\\.[^\\/]+$"
  // ],

  // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
  // unmockedModulePathPatterns: undefined,

  // Indicates whether each individual test should be reported during the run
  // verbose: undefined,

  // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
  // watchPathIgnorePatterns: [],

  // Whether to use watchman for file crawling
  // watchman: true,
};
```

## nodemon.json

Não é interessante o servidor restartar a cada vez q eu alterar um teste, pq os
testes não são o código do programa.

```diff
{
  "execMap": {
    "js": "node -r sucrase/register"
  },
+ "ignore": ["__tests__"]
}
```

## eslintrc.js

Instale uma lib:

`yarn add --dev eslint eslint-plugin-jest`

```diff
module.exports = {
  env: {
    es2021: true,
    node: true,
+    'jest/globals': true,
  },
-  extends: ['airbnb-base', 'prettier'],
+  extends: ['airbnb-base', 'prettier', 'plugin:jest/recommended'],
-  plugins: ['prettier'],
+  plugins: ['prettier', 'jest'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-params-reassign': 'off',
    camelcase: 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
};
```

## **tests**/example.test.js

Vou criar um exemplo de teste.

```javascript
function soma(a, b) {
  return a + b;
}

test('if i call the soma func with values 4 and 5, it should return 9', () => {
  const result = soma(4, 5);

  expect(result).toBe(9);
});
```

Para rodar os tests e ver se funciona:

`yarn test`
