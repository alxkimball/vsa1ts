/// <binding BeforeBuild='clean' />
/* File: gulpfile.js */

var gulp = require('gulp'),
    del = require('del'),
    tsc = require('gulp-tsc');


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
