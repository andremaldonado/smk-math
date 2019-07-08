const gulp = require('gulp')
const rename = require('gulp-rename')
const uglify = require('gulp-terser')
const htmlreplace = require('gulp-html-replace')

const jsSources = 'src/assets/scripts/math.js'
const jsDestinations = 'dist/scripts'

const htmlSources = 'src/**/*.htm*'
const htmlDestinations = 'dist'

const jsFinalFile = 'script.min.js'

function uglifyJS() {
    return gulp.src(jsSources)
        .pipe(rename(jsFinalFile))
        .pipe(uglify())
        .pipe(gulp.dest(jsDestinations))
}

function buildHTML() {
    return gulp.src(htmlSources)
        .pipe(htmlreplace({
            'js':jsDestinations + '/' + jsFinalFile
        }))
        .pipe(gulp.dest(htmlDestinations))
}

exports.default = gulp.series(
    uglifyJS,
    buildHTML
)
