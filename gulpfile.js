const gulp = require('gulp'); 
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const del = require('del');
const imagemin = require('gulp-imagemin');


gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: "./dist/"
		}
	});
	gulp.watch("./dist/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
	return gulp.src('./src/sass/**/*.+(scss|sass)')
		.pipe( plumber({
			errorHandler: notify.onError(function(err){
				return {
					title: 'Styles',
			        sound: false,
			        message: err.message
				}
			})
		}))
		.pipe( sourcemaps.init() )
		.pipe( sass({outputStyle: 'compressed'}).on('error', sass.logError)) 
		.pipe(rename({suffix: '.min', prefix: ''}))
		.pipe( autoprefixer({
			overrideBrowserslist: ['last 4 versions']
		}) )
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest('./dist/css/') )
		.pipe( browserSync.stream() )
});

gulp.task('html', function () {
    return gulp.src("./src/*.html")
        .pipe(gulp.dest("./dist/"))
});

gulp.task('watch', function() {
	gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
	gulp.watch("src/css/**/*.*").on('all', gulp.parallel('copy-css'));
    gulp.watch("src/js/**/*.*").on('change', gulp.parallel('scripts'));
    gulp.watch("src/img/**/*.*").on('all', gulp.parallel('images'));

    gulp.watch(
		["./dist/js/**/*.*", "./dist/css/**/*.*", "./dist/img/**/*.*"] 
	).on('all', browserSync.reload);
});

gulp.task('images', function() {
	return gulp.src('./src/img/**/*.*')
	  .pipe(imagemin())
	  .pipe(gulp.dest('./dist/img/'))
});

gulp.task('scripts', function() {
	return gulp.src('./src/js/**/*.*')
	  .pipe(gulp.dest('./dist/js/'))
});

gulp.task('copy-css', function() {
	return gulp.src('./src/css/**/*.*')
	  .pipe(gulp.dest('./dist/css/'))
});

gulp.task('clean-dist', function() {
	return del('./dist')
});

gulp.task(
		'default', 
		gulp.series( 
			gulp.parallel('clean-dist'),
			gulp.parallel('styles', 'html', 'copy-css', 'images', 'scripts'), 
			gulp.parallel('server', 'watch'), 
			)
	);
