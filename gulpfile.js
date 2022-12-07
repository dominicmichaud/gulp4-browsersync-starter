const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();
const webP = require('gulp-webp');

function scssTask() {
    return src('./src/scss/**/*.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(prefix())
    .pipe(postcss([cssnano()]))
    .pipe(rename(function (path) {
        return {
            dirname: path.dirname + "",
            basename: path.basename + ".min",
            extname: ".css"
        }
    }))
    .pipe(dest('dist/css', { sourcemaps: '.' }))
}

function jsTask() {
    return src('./src/js/**/*.js', { sourcemaps: true })
    .pipe(terser())
    .pipe(rename(function (path) {
        return {
            dirname: path.dirname + "",
            basename: path.basename + ".min",
            extname: ".js"
        }
    }))
    .pipe(dest('dist/js', { sourcemaps: '.' }))
}

function browsersyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: './dist'
        }
    });
    cb();
}

function browsersyncReload(cb) {
    browsersync.reload();
    cb();
}

function imgToWebP() {
    return src('./src/assets/*.{png,jpeg,jpg}')
    .pipe(webP())
    .pipe(dest('dist/assets'))
}

// Watch Task
function watchTask() {
    watch('./dist/*.html', browsersyncReload);
    watch(['./src/scss/**/*.scss', './src/js/**/*.js'], series (scssTask, jsTask, browsersyncReload));
    watch('./src/assets/*.{png,jpeg,jpg}', imgToWebP)
}

exports.default = series(
    scssTask,
    jsTask,
    browsersyncServe,
    watchTask
)
