exports.config = {// to run, use 'protractor protractor.conf.js'
    allScriptsTimeout: 11000,

    specs: [
        'src/client/**/*.e2e.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },

    chromeOnly: true,

    baseUrl: 'http://localhost:8001/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};

