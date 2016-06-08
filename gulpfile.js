"use strict";
var gulp = require('gulp');
var runSequence = require('run-sequence');
var config_1 = require('./tools/config');
var utils_1 = require('./tools/utils');
utils_1.loadTasks(config_1.SEED_TASKS_DIR);
utils_1.loadTasks(config_1.PROJECT_TASKS_DIR);
// --------------
// Build dev.
gulp.task('build.dev', function (done) {
    return runSequence(//'clean.dev',
    //              'tslint',
    //              'css-lint',
    'build.assets.dev', 'build.html_css', 'build.js.dev', 'build.index.dev', done);
});
// --------------
// Build dev watch.
gulp.task('build.dev.watch', function (done) {
    return runSequence('build.dev', 'watch.dev', done);
});
// --------------
// Build e2e.
gulp.task('build.e2e', function (done) {
    return runSequence('clean.dev', 'tslint', 'build.assets.dev', 'build.js.e2e', 'build.index.dev', done);
});
// --------------
// Build prod.
gulp.task('build.prod', function (done) {
    return runSequence('clean.prod', 
    // 'tslint',
    // 'css-lint',
    'build.assets.prod', 'build.html_css', 'copy.js.prod', 'build.js.prod', 'build.bundles', 'build.bundles.app', 'build.index.prod', done);
});
// --------------
// Build test.
gulp.task('build.test', function (done) {
    return runSequence('clean.dev', 'tslint', 'build.assets.dev', 'build.js.test', 'build.index.dev', done);
});
// --------------
// Build test watch.
gulp.task('build.test.watch', function (done) {
    return runSequence('build.test', 'watch.test', done);
});
// --------------
// Build tools.
gulp.task('build.tools', function (done) {
    return runSequence('clean.tools', 'build.js.tools', done);
});
// --------------
// Docs
// gulp.task('docs', (done: any) =>
//   runSequence('build.docs',
//               'serve.docs',
//               done));
// --------------
// Serve dev
gulp.task('serve.dev', function (done) {
    return runSequence('build.dev', 'server.start', 'watch.dev', done);
});
// --------------
// Serve e2e
gulp.task('serve.e2e', function (done) {
    return runSequence('build.e2e', 'server.start', 'watch.e2e', done);
});
// --------------
// Serve prod
gulp.task('serve.prod', function (done) {
    return runSequence('build.prod', 'server.prod', done);
});
// --------------
// Test.
gulp.task('test', function (done) {
    return runSequence('build.test', 'karma.start', done);
});
