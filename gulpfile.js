//    Copyright 2016 Yoshi Yamaguchi
// 
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
// 
//        http://www.apache.org/licenses/LICENSE-2.0
// 
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.
'use strict';

const gulp = require('gulp');
const del = require('del');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const jsmin = require('gulp-jsmin');

const paths = {
    auth: {
        dir: './auth',
        src: {
            dir: './auth/src',
            ts: ['./auth/src/ts/main.ts'],
            static: './auth/src/**/*.(html|css)',
        },
        dist: {
            dir: './auth/dist',
            js: './auth/dist/js'
        }
    }
};

const baseConfig = {
    browserify: {
        opts: {
            basedir: '.',
            entries: [''],
            cache: {},
            packageCache: {},
            debug: false
        }
    },
    source: {
        target: 'main.js'
    }
};

var browserifyOpts = function(entries) {
    var cfg = baseConfig;
    cfg.browserify.opts.entries = entries;
    return cfg.browserify.opts;
}

gulp.task('copy:auth', [], () => {
    return gulp.src(paths.auth.src.static)
        .pipe(gulp.dest(paths.auth.dist.dir));
});

gulp.task('build:auth', ['copy:auth'], () => {
    return browserify([], browserifyOpts(paths.auth.src.ts))
        .plugin(tsify)
        .bundle()
        .pipe(source(baseConfig.source.target))
        .pipe(gulp.dest(paths.auth.dist.js));
});

gulp.task('build', ['build:auth']);

gulp.task('minify:auth', ['build:auth'], () => {
    gulp.src(paths.auth.dist.js)
        .pipe(jsmin())
        .pipe(gulp.dest(paths.auth.dist.js));
});

gulp.task('minify', ['minify:auth']);

gulp.task('clean', [], () => {
    return del(paths.dist.dir);
});

gulp.task('default', ['minify']);