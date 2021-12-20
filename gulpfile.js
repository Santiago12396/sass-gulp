const { src, dest, watch, series } = require('gulp');

// CSS - SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

// Images
const imagemin = require('gulp-imagemin');
const avif = require('gulp-avif');
const webp = require('gulp-webp');

function css(done) {    
    src('src/scss/app.scss')
        .pipe( sourcemaps.init() )
        .pipe ( sass() )
        .pipe( postcss([ autoprefixer, cssnano ]) )
        .pipe( sourcemaps.write('.') )
        .pipe( dest('build/css') );

    done();
}

function images() {
    return src('src/img/**/*')
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest('build/img') )
}

function imagesAvif() {
    return src('src/img/*.{png,jpg}')
        .pipe( avif({ quality: 50 }) )
        .pipe( dest('build/img') )
}

function imagesWebp() {
    return src('src/img/*.{png,jpg}') 
        .pipe( webp({ quality: 50 }) )
        .pipe( dest('build/img') )
}

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', images);
}

exports.css = css;
exports.images = images;  
exports.imgsAvif = imagesAvif;
exports.imgsWebp = imagesWebp;  
exports.dev = dev;  
exports.default = series(images, imagesAvif, imagesWebp, css, dev);