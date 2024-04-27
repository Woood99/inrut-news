const {
    src,
    dest,
    series,
    watch,
    parallel
} = require('gulp');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('sass');
const gulpSass = require('gulp-sass');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const fileInclude = require('gulp-file-include');
const gulpif = require('gulp-if');
const notify = require('gulp-notify');
const image = require('gulp-imagemin');
const webp = require('gulp-webp');
const mainSass = gulpSass(sass);
const webpackStream = require('webpack-stream');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');

const mapSources = require('gulp-sourcemaps');
const mediaQueries = require('gulp-group-css-media-queries')

// paths
const srcFolder = './src';
const buildFolder = './app';
const paths = {
    srcSvg: `${srcFolder}/img/svg/**.svg`,
    srcImgFolder: `${srcFolder}/img`,
    buildImgFolder: `${buildFolder}/img`,
    srcScss: `${srcFolder}/scss/**/*.scss`,
    buildCssFolder: `${buildFolder}/css`,
    srcFullJs: `${srcFolder}/js/**/*.js`,
    srcJs: `${srcFolder}/js/*.js`,
    buildJsFolder: `${buildFolder}/js`,
    srcPartialsFolder: `${srcFolder}/partials`,
    srcPopupsFolder: `${srcFolder}/popups`,
    resourcesFolder: `${srcFolder}/resources`,
};


let isProd = false; // dev by default

const clean = () => {
    return del([buildFolder])
}

//svg sprite
const svgSprites = () => {
    return src(paths.srcSvg)
        .pipe(
            svgmin({
                js2svg: {
                    pretty: true,
                },
            })
        )
        .pipe(
            cheerio({
                run: function ($) {
                    $('[fill]').removeAttr('fill');
                    $('[stroke]').removeAttr('stroke');
                    $('[style]').removeAttr('style');
                },
                parserOptions: {
                    xmlMode: true
                },
            })
        )
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "../sprite.svg"
                }
            },
        }))
        .pipe(dest(paths.buildImgFolder));
}

// scss styles
const stylesDev = () => {
    return src(paths.srcScss)
        .pipe(plumber(
            notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(mapSources.init())
        .pipe(mainSass())
        .pipe(mapSources.write())
        .pipe(dest(paths.buildCssFolder))
        .pipe(browserSync.stream());
};

const stylesProd = () => {
    return src(paths.srcScss)
        .pipe(plumber(
            notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(mainSass())
        .pipe(mediaQueries())
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(dest(paths.buildCssFolder))
};


const scriptsDev = () => {
    return src(paths.srcJs)
        .pipe(plumber(
            notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(webpackStream({
            mode: 'development',
            entry: {
                main: './src/js/main.js',
                'buy-apartment': './src/js/buy-apartment.js',
                'submit-app': './src/js/submit-app.js',
                object: './src/js/object.js',
                request: './src/js/request.js',
                'admin-script': './src/js/admin-script.js',
                ribbon: './src/js/ribbon.js',
                'chat-page': './src/js/chat-page.js',
                'service-moving': './src/js/service-moving.js',
                'service-repair': './src/js/service-repair.js',
                'app-verif': './src/js/app-verif.js',
                'mortgage-insur': './src/js/mortgage-insur.js',
                'create-policy': './src/js/create-policy.js',
                'calendar-page': './src/js/calendar-page.js',
                'profile': './src/js/profile.js',
                'faq': './src/js/faq.js',
                'mortgage-supp': './src/js/mortgage-supp.js',
                'documents': './src/js/documents.js',
                'comparison': './src/js/comparison.js',
                'investments': './src/js/investments.js',
                'program': './src/js/program.js',
                'quiz': './src/js/quiz.js',
            },
            output: {
                filename: '[name].js',
            },
            module: {
                rules: [{
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    targets: "defaults"
                                }]
                            ]
                        }
                    }
                }]
            },
        }))
        .on('error', function (err) {
            console.error('WEBPACK ERROR', err);
            this.emit('end');
        })
        .pipe(dest(paths.buildJsFolder))
        .pipe(browserSync.stream());
}

const scriptsProd = () => {
    return src(paths.srcJs)
        .pipe(plumber(
            notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(webpackStream({
            mode: 'production',
            entry: {
                main: './src/js/main.js',
                'buy-apartment': './src/js/buy-apartment.js',
                'submit-app': './src/js/submit-app.js',
                object: './src/js/object.js',
                request: './src/js/request.js',
                'admin-script': './src/js/admin-script.js',
                ribbon: './src/js/ribbon.js',
                'chat-page': './src/js/chat-page.js',
                'service-moving': './src/js/service-moving.js',
                'service-repair': './src/js/service-repair.js',
                'app-verif': './src/js/app-verif.js',
                'mortgage-insur': './src/js/mortgage-insur.js',
                'create-policy': './src/js/create-policy.js',
                'calendar-page': './src/js/calendar-page.js',
                'profile': './src/js/profile.js',
                'faq': './src/js/faq.js',
                'mortgage-supp': './src/js/mortgage-supp.js',
                'documents': './src/js/documents.js',
                'comparison': './src/js/comparison.js',
                'investments': './src/js/investments.js',
                'program': './src/js/program.js',
                'quiz': './src/js/quiz.js',
            },
            output: {
                filename: '[name].js',
            },
            module: {
                rules: [{
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    targets: "defaults"
                                }]
                            ]
                        }
                    }
                }]
            },
        }))
        .on('error', function (err) {
            console.error('WEBPACK ERROR', err);
            this.emit('end');
        })
        .pipe(dest(paths.buildJsFolder))
        .pipe(browserSync.stream());
}

const resources = () => {
    return src(`${paths.resourcesFolder}/**`)
        .pipe(dest(buildFolder))
}

const images = () => {
    return src([`${paths.srcImgFolder}/**/**.{jpg,jpeg,png,svg}`])
        .pipe(changed(paths.buildImgFolder))
        .pipe(gulpif(isProd, image([
            image.mozjpeg({
                quality: 80,
                progressive: true
            }),
            image.optipng({
                optimizationLevel: 2
            }),
        ])))
        .pipe(dest(paths.buildImgFolder))
};

const webpImages = () => {
    return src([`${paths.srcImgFolder}/**/**.{jpg,jpeg,png}`])
        .pipe(webp())
        .pipe(dest(paths.buildImgFolder))
};

const htmlInclude = () => {
    return src([`${srcFolder}/*.html`])
        .pipe(fileInclude({
            prefix: '@',
            basepath: '@file'
        }))
        .pipe(dest(buildFolder))
        .pipe(browserSync.stream());
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: `${buildFolder}`
        },
    });

    watch(paths.srcScss, stylesDev);
    watch(paths.srcFullJs, scriptsDev);
    watch(`${paths.srcPartialsFolder}/*.html`, htmlInclude);
    watch(`${paths.srcPopupsFolder}/*.html`, htmlInclude);
    watch(`${srcFolder}/*.html`, htmlInclude);
    watch(`${paths.resourcesFolder}/**`, resources);
    watch(`${paths.srcImgFolder}/**/**.{jpg,jpeg,png,svg}`, images);
    watch(`${paths.srcImgFolder}/**/**.{jpg,jpeg,png}`, webpImages);
    watch(paths.srcSvg, svgSprites);
}


const toProd = (done) => {
    isProd = true;
    done();
};

exports.default = series(
    clean,
    resources,
    parallel(htmlInclude, stylesDev, scriptsDev, images),
    parallel(webpImages,svgSprites),
    watchFiles
);
exports.build = series(toProd, clean, htmlInclude, scriptsProd, stylesProd, resources, images, webpImages, svgSprites);
