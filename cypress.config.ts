import { defineConfig } from "cypress";
const webpackPreprocessor = require('@cypress/webpack-preprocessor')

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: require('./webpack.config'),
        watchOptions: {},
      }

      on('file:preprocessor', webpackPreprocessor(options))

      return config
    },
    "baseUrl": "http://localhost:8080",
    "fileServerFolder": "src/main/test/cypress/e2e/",
    "specPattern": "src/main/test/cypress/e2e/**/*.spec.{js,jsx,ts,tsx}",
    supportFile: false
  },
});
