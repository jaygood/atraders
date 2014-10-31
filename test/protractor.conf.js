// conf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['e2e/*.js'],
  capabilities: {
    browserName: 'chrome'
  },
  baseUrl: 'http://localhost:9000/site/app/#/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 10000
  }
}
