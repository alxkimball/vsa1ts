/// <binding BeforeBuild='clean' AfterBuild='build:App' />
/* File: gulpfile.js */

var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    gulpSequence = require("gulp-sequence").use(gulp),
    cache = require('gulp-cached'),
    shell = require('gulp-shell'),
    del = require('del'),
    sass = require("gulp-sass"),
    autoprefixer = require('gulp-autoprefixer'),
    tsc = require('gulp-tsc'),
    Server = require('karma').Server,
    vinylPaths = require('vinyl-paths');


var env = 'dev';
var isDeploy = env === 'deploy';

var paths = {
    webroot: isDeploy ? './dist/wwwroot/' : './wwwroot/'
};

paths.app = paths.webroot + 'app/';
paths.tests = 'tests/';
paths.dist = 'dist/wwwroot/';
paths.stylesheets = paths.webroot + 'assets/stylesheets/';
paths.typescript = paths.webroot + 'typings/app/**/*.ts';

var config = {
    js: {
        src: paths.app + 'app.js',
        outputDir: paths.webroot + './build/',
        mapDir: paths.webroot + './maps/',
        outputFile: 'bundle.js'
    }
};

/***********************************************
  Build scripts here
************************************************/
// Watch for changes in TypeScript files.  On save, clean and compile and build to App folders.
gulp.task('default',
    function () {
        return gulp.watch(paths.app + '**/*.ts', ['clean','build:App']);
    });

gulp.task('build:App',
    function (cb) {
        console.log('Build source files to \'App\' folder');

        return gulp.src([
                paths.app + "**/*.ts"
            ])
            .pipe(tsc({
                module: 'CommonJS',
                sourcemap: true,
                emitError: false,
                typeRoots: [
                    "./node_modules/@types"
                ]
            }))
            .pipe(gulp.dest(paths.app), cb);

    });

gulp.task('build:Dist',
    function (cb) {
        console.log('Build deploy files to \'dist\' folder');

        return gulp.src([
                paths.app + "**/*.ts"
            ])
            .pipe(tsc({
                module: 'CommonJS',
                sourcemap: false,
                emitError: false,
                typeRoots: [
                    "./node_modules/@types"
                ]
            }))
            .pipe(gulp.dest(paths.dist), cb);
    });

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

// Build - Compile tests to JS for CI build
gulp.task('build:Tests',
    function (cb) {
        console.log('Build unit test files in \'tests\' folder');

        return gulp.src([
                paths.tests + "**/*.spec.ts"
            ])
            .pipe(tsc({
                module: 'CommonJS',
                sourcemap: true,
                emitError: false,
                typeRoots: [
                    "./node_modules/@types"
                ]
            }))
            .pipe(gulp.dest(paths.tests),cb);
    });


/***********************************************
  Utility Scripts
************************************************/
// remove all .js and .map files, remove all Dist folders
gulp.task('clean',
    function (cb) {
        console.log('Clean all compiled files');
        del([
            paths.app + "**/*.{js,map}",
            paths.dist + "**/*",
            paths.tests + "**/*.{js,map}"
        ],cb);
    });

// Compile SCSS to CSS
gulp.task('buildCSS',
    function (cb) {
        return gulp.src(paths.stylesheets + "*.scss")
            .pipe(autoprefixer({
                browsers: ['last 4 versions'],
                cascade: false
            }))
            .pipe(sass({ outputStyle: 'expanded' }))
            .pipe(gulp.dest(paths.stylesheets), cb);
    });


/***********************************************
  Karma unit tests setup
************************************************/
gulp.task('server', ['node', 'karma']);

gulp.task('node', shell.task('node app.js'));
gulp.task('karma', shell.task(['powershell -Command "./karma.ps1"']));
