// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage-istanbul-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
      require("karma-coverage")
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require("path").join(__dirname, "../coverage"),
      reports: ["html", "lcovonly", "text-summary"],
      fixWebpackSourcePaths: true,
      thresholds: {
        global: {
          // thresholds for all files
          statements: 80,
          lines: 80,
          branches: 80,
          functions: 80,
        },
        each: {
          // thresholds per file
          statements: 80,
          lines: 80,
          branches: 80,
          functions: 80,
        },
      },
    },
    reporters: ["progress", "kjhtml", "coverage"],
    preprocessors: {
      "src/app/**/*.ts": ["coverage"],
    },
    coverageReporter: {
      type: "lcov",
      dir: "coverage/",
    },
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"],
      },
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome", "ChromeHeadlessNoSandbox"],
    singleRun: false,
  });
};
