import gulp from 'gulp';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import del from 'del';

const paths = {
  styles: {
    src: './assets/scss/style.scss',
    dest: './assets/css',
    watch: './assets/scss/**/*.scss'
  },
  bootstrap: {
    src: './node_modules/bootstrap/**/*',
    dest: './assets/bootstrap'
  },
};

export const clean = () => del([ 'assets/css' ]);

export function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.styles.dest));
}

export function bootstrap() {
  return gulp.src(paths.bootstrap.src)
    .pipe(gulp.dest(paths.bootstrap.dest));
}

function watch() {
  gulp.watch(paths.styles.watch, styles);
}

const build = gulp.series(clean, gulp.parallel(bootstrap), gulp.parallel(styles));
export default build;

const dev = gulp.series(build, gulp.parallel(watch));
export { dev }
