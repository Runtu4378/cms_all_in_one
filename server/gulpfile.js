const gulp = require('gulp')
const sourceMaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const server = require('gulp-express')
const eslint = require('gulp-eslint')

gulp.task('eslint', () => {
  return gulp.src(['src/**/*.js'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    // .pipe(eslint.failAfterError())
})

gulp.task('babel', ['eslint'], function() {
  return gulp.src(['src/**/*.js'])
    .pipe(sourceMaps.init())
    .pipe(babel({
      presets: ['env', 'stage-0'],
      plugins: [
        ['transform-runtime', {
          'polyfill': false,
          'regenerator': true,
        }]
      ],
    }))
    .pipe(sourceMaps.write('.', {includeContent: false, sourceRoot: '../src'}))
    .pipe(gulp.dest('lib'))
})

gulp.task('watch', ['babel'], function() { 
  gulp.watch('src/**/*.js', ['babel'])
})

var watchFiles = ['index.js', 'src/**/*.js', 'node_modules/cms_builder/**/*']

gulp.task('server', ['babel'], function() {
  server.run(['index.js'])
  
  gulp.watch('src/**/*.js', ['babel'])
  gulp.watch(watchFiles, [server.run])
})

gulp.task('default', [
  // watch
  'server',
  // other
])
