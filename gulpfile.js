const gulp = require('gulp')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify-es').default
const htmlreplace = require('gulp-html-replace')
const sass = require('gulp-sass')
const concat = require('gulp-concat')

const htmlSources = 'src/**/*.htm*'
const htmlDestination = 'dist'

const modulesSources = 'src/assets/scripts/modules/*.mjs'
const modulesDestination = 'dist/scripts/modules'

const scriptsSources = ['src/assets/scripts/*.js', '!src/assets/scripts/dev.js']
const scriptsDestination = 'dist/scripts'
const scriptsFinalFile = 'script.min.js'
const scriptsDevDestination = 'src/assets/scripts/'
const scriptsDevFinalFile = 'dev.js'

const stylesSources = 'src/assets/styles/**/*.scss'
const stylesDestination = 'src/assets/styles/css/'
const stylesDeployDestination = 'dist/styles/'
const stylesDeployFile = 'styles/main.css'

const buildModules = () => {
  return gulp.src(modulesSources) 
    .pipe(uglify())
    .pipe(gulp.dest(modulesDestination))
}

const buildJS = () => {
  return gulp.src(scriptsSources)
    .pipe(concat(scriptsFinalFile))
    .pipe(uglify())
    .pipe(gulp.dest(scriptsDestination))
}

const buildJSDev = () => {
  return gulp.src(scriptsSources)
    .pipe(concat(scriptsDevFinalFile))
    .pipe(gulp.dest(scriptsDevDestination))
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
      'js': {
        src: 'scripts/' + scriptsFinalFile,
        tpl: '<script type="module" src="%s"></script>'
      },
      'css':stylesDeployFile
    }))
    .pipe(gulp.dest(htmlDestination))
}

const watchCSS = () => {
  return gulp.watch(stylesSources, gulp.series(buildCSS))
}

const watchJS = () => {
  return gulp.watch(scriptsSources, gulp.series(buildJSDev))
}

exports.build = gulp.series(
  buildModules,
  buildJS,
  buildCSS,
  buildHTML
)

exports.prepareDev = gulp.series(
  buildJSDev,
  buildCSS
)

exports.default = gulp.parallel(
  watchCSS,
  watchJS
)
