module.exports = ()=>
    $.gulp.task('font',()=>
        $.gulp.src($.path.src.font)
            .pipe($.gulp.dest($.path.build.font)).on('end', $.bs.reload)
    )