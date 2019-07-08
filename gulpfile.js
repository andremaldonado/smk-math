const gulp = require('gulp')
const rename = require('gulp-rename')
const uglify = require('gulp-terser')
const sourcemaps = require('gulp-sourcemaps')

const jsSources = 'src/assets/scripts/math.js'
const jsDestinations = 'dist/scripts'

const htmlSources = 'src/**/*.htm*'
const htmlDestinations = 'dist'

function uglifyJS() {
    return gulp.src(jsSources)
        .pipe(sourcemaps.init())
        .pipe(rename('script.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(jsDestinations))
}

function buildHTML() {
    return gulp.src(htmlSources)
        .pipe(gulp.dest(htmlDestinations))
}

exports.default =  gulp.series(
    uglifyJS,
    buildHTML
)
