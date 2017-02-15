/* File: gulpfile.js */

var gulp = require('gulp'),
    del = require('del'),
    tsc = require('gulp-tsc'),
    liveServer = require('live-server');


//var args = process.argv.slice(2);
//var env = args[1];

var env = 'dev';
var isDeploy = env === 'deploy';

var paths = {
    webroot: isDeploy ? './dist/' : './'
};

paths.app = paths.webroot + 'app/';
paths.stylesheets = paths.webroot + 'assets/stylesheets/';
paths.typescript = paths.webroot + 'typings/app/**/*.ts';

console.log('paths = ' + paths);

var config = {
    js: {
        src: paths.app + 'app.js',
        outputDir: paths.webroot + './build/',
        mapDir: paths.webroot + './maps/',
        outputFile: 'bundle.js'
    }
};


// Watch for changes in TypeScript files.  On save, compile and build JavaScript to output folders.
gulp.task('default',
    function () {
        return gulp.watch(paths.app + '**/*.ts', paths.stylesheets + '**/*.scss', ['buildTS']);
    });

gulp.task('buildTS',
    function (cb) {
        return gulp.src([paths.app + "**/*.ts"])
            .pipe(tsc({
                module: 'CommonJS',
                sourcemap: true,
                emitError: false,
                outDir: paths.app
            }))
            .pipe(gulp.dest(paths.app), cb);
    });

gulp.task('clean',
    function (cb) {
        del([paths.app + "**/*.{js,map}"]);
        cb();
    });

gulp.task('service_please', function(cb) {
    
    var params = {
        port: 8080, // Set the server port. Defaults to 8080.
        host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
        //root: "/", // Set root directory that's being served. Defaults to cwd.
        open: true, // When false, it won't load your browser by default.
        ignore: 'scss,my/templates', // comma-separated string for paths to ignore
        file: "index.html", // When set, serve this file for every 404 (useful for single-page applications)
        wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
        mount: [], // Mount a directory to a route.
        logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
        middleware: [function (req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
    };
    liveServer.start(params);

});
