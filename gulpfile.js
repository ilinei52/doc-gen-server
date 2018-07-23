var gulp = require('gulp-help')(require('gulp'));
const apiDoc = require('gulp-apidoc');

gulp.task('refDoc', 'Rebuild the API documentation.', (done) => {
    apiDoc({
        src: "routes/",
        dest: "docs/api/",        
        debug: true
    },done);
});