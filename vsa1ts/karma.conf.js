// Karma configuration
// Generated on Thu Mar 02 2017 11:54:32 GMT-0600 (Central Standard Time)

var webroot = "wwwroot/";    // uncomment for check-in
var testroot = "tests/";    // uncomment for check-in


module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            webroot + 'app/app.js',
            webroot + 'app/**/*.module.js',
            webroot + 'app/**/*.js',
            testroot + '**/*.spec.js'
        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },


        // notify karma of the available plugins
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine-html-reporter',      // kjhtml below
            'karma-html-detailed-reporter'      // htmlDetailed below
        ],


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['kjhtml','htmlDetailed'],
        //        reporters: ['progress','htmlDetailed'],


        // configure the HTML-Detailed-Reporter to put all results in one file    
        htmlDetailed: {
            splitResults: false
        },

        // web server port
        port: 9876,     // karma default


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        // leave false if you want to debug
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity

    });
}
