var path = require('path');
var util = require('util');

var del = require('del');
var gulp = require('gulp-help')(require('gulp'));
var gulpShell = require('gulp-shell');
var gulpUtil = require('gulp-util');
var mergeStream = require('merge-stream');
var minimist = require('minimist');

gulp.task('clean', 'Clean built files.', function (cb) {
  del('dist', cb);
});

gulp.task('build', 'Build application.', function () {
  var build = gulp.src('')
    .pipe(gulpShell([
      'node_modules/.bin/webpack',
        '--colors',
        '--config webpack.config.prod.js',
        '--profile',
        '--progress'
    ].join(' '), {cwd: __dirname}));

  var copy = gulp
    .src('static/**')
    .pipe(gulp.dest('dist'));

  return mergeStream(build, copy);
});

gulp.task('dev', 'Run examples.', function () {
  var options = minimist(process.argv.slice(2), {
    alias: {
      p: 'port'
    },
    default: {
      port: 8080
    }
  });

  gulpUtil.log('[webpack-dev-server]', util.format('http://localhost:%d/', options.port));

  return gulp.src('')
    .pipe(gulpShell([
      'node_modules/.bin/webpack-dev-server',
        '--colors',
        '--config webpack.config.js',
        '--content-base src',
        '--hot',
        '--inline',
        util.format('--port %d', options.port),
        '--progress'
    ].join(' '), {cwd: __dirname}));
}, {
  options: {
    'port <port>': 'port (default: 8080)'
  }
});

gulp.task('default', false, ['help']);
