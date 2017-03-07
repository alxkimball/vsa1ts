/// <binding BeforeBuild='clean' />
/* File: gulpfile.js */

var gulp = require('gulp'),
    shell = require('gulp-shell'),
    del = require('del'),
    sass = require("gulp-sass"),
    autoprefixer = require('gulp-autoprefixer'),
    tsc = require('gulp-tsc');


var env = 'dev';
var isDeploy = env === 'deploy';

var paths = {
    webroot: isDeploy ? './dist/' : './wwwroot/'
};

paths.app = paths.webroot + 'app/';
paths.dist = './dist/';
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


// Watch for changes in TypeScript files.  On save, compile and build JavaScript to output folders.
gulp.task('default',
    function () {
        return gulp.watch(paths.app + '**/*.ts', ['buildTS']);
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


gulp.task('buildTS',
    function (cb) {
        console.log('paths.app: ' + paths.app);

        return gulp.src([paths.app + "**/*.ts"])
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

gulp.task('clean',
    function (cb) {
        console.log('paths.dist: ' + paths.dist);
        del([
            paths.app + "**/*.{js,map}",
            paths.dist + "**/*.{js,map}"
        ]);
        cb();
    });

/***********************************************
  Setup and run unit tests via karma here
************************************************/
// Build - Compile tests to JS for CI build
gulp.task('BuildTests', function () {
    gulp.src([paths.app + "**/*.spec.ts"])
        .pipe(tsc({
            module: "CommonJS",
            sourcemap: true,
            emitError: false
        }))
        .pipe(gulp.dest(paths.app));
});

/***********************************************
  Karma unit tests setup
************************************************/
gulp.task('server', ['node', 'karma']);

gulp.task('node', shell.task('node app.js'));
gulp.task('karma', shell.task('powershell -Command "./karma.ps1"'));