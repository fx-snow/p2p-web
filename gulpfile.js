// 导入模块

const { src, dest, parallel,watch } = require('gulp');
const less=require("gulp-less");//编译less插件
const rename=require('gulp-rename');//重命名插件
const clearCss=require("gulp-clean-css");//压缩css插件
const uglify = require("gulp-uglify"); //压缩js
const  browserSync = require("browser-sync").create();//启动服务器插件
const reload = browserSync.reload;//热加载

//1.css任务
function css(){
    return src("./less/*.less")//要处理的文件源
        .pipe(less())//编译
        .pipe(clearCss())//压缩 
        .pipe(
            rename({
                suffix:".min"
            })
        )
        .pipe(dest("./dist/css"))//输出
}

//2.js任务
function js(){
    return src("./js/*.js")//处理的文件源
    .pipe(uglify())//压缩处理
    .pipe(
        rename({
            suffix:".min"
        })
        
    )
    //重命名
    .pipe(dest("./dist/js"));//输出
}
//3.服务器
function serve() {
      browserSync.init({
        server: {
          baseDir: "./"
        },
        port: 3033
      });
    }

//观察者
function auto(){
    watch('./less/*.less',css).on("change",reload);//css
    watch('./js/*.js').on("change",reload);//js
    watch('**/*.html').on("change",reload);//html
}
//暴露
exports.css=css;
exports.js=js;
exports.serve=serve;
exports.default=parallel(js,css,serve,auto)//默认任务