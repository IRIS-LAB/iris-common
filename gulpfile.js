const path = require('path')
const gulp = require('gulp')
const clean = require('gulp-clean')
const ts = require('gulp-typescript')
const webpack = require('webpack-stream')
const concat = require('gulp-concat')

const options = {
  src: path.resolve(__dirname, 'src'),
  output: path.resolve(__dirname, 'dist'),
  tempOutput: path.resolve(__dirname, 'build_temp')
}

const tsProject = ts.createProject('tsconfig.build.json', {
  typescript: require('typescript'),
  declaration: true
})

gulp.task('clean', () => {
  return gulp.src([options.output, options.tempOutput], { read: false, allowEmpty: true })
    .pipe(clean())

})
gulp.task('build:typescript-typings', () => {
  return tsProject.src()
    .pipe(tsProject()).dts
    .pipe(gulp.dest(path.resolve(options.tempOutput, 'types')))

})
gulp.task('build:typescript', gulp.series(() => {
  return gulp.src(path.resolve(options.src, 'index.ts'))
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(options.output))
}))
// gulp.task('build:concat-typings', () => {
//   return gulp.src([path.resolve(options.output, 'types/index.d.ts'), path.resolve(__dirname, '@types', '**/*.d.ts')])
//     .pipe(concat('index.d.ts'))
//     .pipe(gulp.dest(path.resolve(options.output, 'types')))
// })
gulp.task('watch', () => {
  gulp.watch(tsProject.config.include, gulp.series('build'))
})
gulp.task('build', gulp.series('build:typescript-typings', 'build:typescript'))
gulp.task('default', gulp.series('clean', 'build'))
