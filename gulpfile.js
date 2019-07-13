const gulp = require('gulp')
const rename = require('gulp-rename')
const uglify = require('gulp-terser')
const htmlreplace = require('gulp-html-replace')
const sass = require('gulp-sass')

const htmlSources = 'src/**/*.htm*'
const htmlDestination = 'dist'

const scriptsSources = 'src/assets/scripts/math.js'
const scriptsDestination = 'dist/scripts'
const scriptsFinalFile = 'script.min.js'

const stylesSources = 'src/assets/styles/**/*.scss'
const stylesDestination = 'src/assets/styles/css/'
const stylesDeployDestination = 'dist/styles/'

const uglifyJS = () => {
    return gulp.src(scriptsSources)
        .pipe(rename(scriptsFinalFile))
        .pipe(uglify())
        .pipe(gulp.dest(scriptsDestination))
}

const buildHTML = () => {
    return gulp.src(htmlSources)
        .pipe(htmlreplace({
            'js':'scripts/' + scriptsFinalFile
        }))
        .pipe(gulp.dest(htmlDestination))
}

const buildCSS = () => {
    return gulp.src(stylesSources)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(stylesDestination))
        .pipe(gulp.dest(stylesDeployDestination))
}

const watchCSS = () => {
    return gulp.watch(stylesSources, gulp.series(buildCSS))
}

exports.build = gulp.series(
    uglifyJS,
    buildHTML,
    buildCSS
)

exports.default = gulp.series(
    watchCSS
)
