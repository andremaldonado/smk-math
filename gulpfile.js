const gulp = require('gulp')
const rename = require('gulp-rename')
const uglify = require('gulp-terser')
const htmlreplace = require('gulp-html-replace')
const sass = require('gulp-sass')

const htmlSources = 'src/**/*.htm*'
const htmlDestination = 'dist'

const scriptsSources = 'src/assets/scripts/*.js'
const scriptsDestination = 'dist/scripts'
const scriptsFinalFile = 'script.min.js'

const stylesSources = 'src/assets/styles/**/*.scss'
const stylesDestination = 'src/assets/styles/css/'
const stylesDeployDestination = 'dist/styles/'
const stylesDeployFile = 'styles/main.css'

const uglifyJS = () => {
    return gulp.src(scriptsSources)
        .pipe(rename(scriptsFinalFile))
        .pipe(uglify())
        .pipe(gulp.dest(scriptsDestination))
}

const buildCSS = () => {
    return gulp.src(stylesSources)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(stylesDestination))
        .pipe(gulp.dest(stylesDeployDestination))
}

const buildHTML = () => {
    return gulp.src(htmlSources)
        .pipe(htmlreplace({
            'js':'scripts/' + scriptsFinalFile,
            'css':stylesDeployFile
        }))
        .pipe(gulp.dest(htmlDestination))
}

const watchCSS = () => {
    return gulp.watch(stylesSources, gulp.series(buildCSS))
}

exports.build = gulp.series(
    uglifyJS,
    buildCSS,
    buildHTML
)

exports.default = gulp.series(
    watchCSS
)
