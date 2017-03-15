/**
 * Created by xiaoxiaosu on 17/3/10.
 */


var chalk = require('chalk')
var fs = require('fs');
var path = require('path');

var log = function (txt) {
    console.log(chalk.magenta.bold(txt))
}

function createProject(name,type) {

    var p  = process.cwd();
    cd(p)

    if(fs.existsSync(name)){
        log('project exists,please rename it')
        process.exit()
    }


    var np = path.join(__dirname,'projects',type)
    cp('-R',np+'/',name)
    log('复制'+type+'项目原文件成功!')

    cd(name)
    log('设置淘宝镜像----npm config set registry http://registry.npm.taobao.org')
    exec('npm config set registry http://registry.npm.taobao.org')
    log('安装模块---npm install')
    log('安装模块时间较长，请耐心等候，您也可以CRTL+C停止安装，手动npm install安装')
    log('安装模块中....')
    exec('npm install')


    if(type != 'jquery' ){
        log('正在启动项目...')
        exec('npm start')
    }
}

module.exports = createProject