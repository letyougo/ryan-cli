#!/usr/bin/env node
var program = require('commander')
var co = require('co');
var prompt = require('co-prompt');
var chalk = require('chalk')
var fs = require('fs');
var path = require('path');
require('shelljs/global');
var name = chalk.cyan.bold.underline('hello iam ryan')
var age = chalk.magenta.bold('hello i am 26 years old')
var position = chalk.grey('hello i am front end engineer')

var log = function (txt) {
    console.log(chalk.magenta.bold(txt))
}


log('欢迎使用ryan-cli')
log('ryan -r -n -a -p -s查看作者简介')
log('ryan create project_name -t project_type 创建项目')
var projecttype
program
    .version('0.0.1')
    .option('-n, --name','my name',function(val){
        log(name)
    })
    .option('-a --age','my age',function(){
        log(age)
    })
    .option('-p --position','my position',function(){
        log(position)
    })
    .option('-s --single','single dog?',function () {
        log('我可不是一个单身狗哦')
    })
    .option('-r --resume','my total resume',function(){
        log(name)
        log(age)
        log(position)
    })

    .option('-t --type <type>','project type',function(type){
        projecttype = type
    })


program

    .command('create <name>')
    .action(function(name){

        if(!projecttype){
            log('create project_name -t project_type','jquery','react','vue')
            return
        }
        var projectlist= ['jquery','vue','react']

        if(projectlist.indexOf(projecttype) == -1){
            log('对不起目前只支持三种项目类型,jquery,react,vue')
            return
        }
        createProject(name,projecttype)
    })


function createProject(name,type) {

    var p  = process.cwd();
    cd(p)

    if(fs.existsSync(name)){
        log('project exists,please rename it')
        process.exit()
    }
    mkdir(name)

    cp('-R','./projects/'+type+'/*',name)
    log('复制'+type+'项目原文件成功!')

    cd(name)
    log('设置淘宝镜像----npm config set registry http://registry.npm.taobao.org')
    exec('npm config set registry http://registry.npm.taobao.org')
    log('安装模块---npm install')
    log('安装模块时间较长，请耐心等候，您也可以CRTL+C停止安装，手动npm install安装')
    log('安装模块中....')
    exec('npm install')
    log('使用npm start或者npm run dev测试项目')
}
//npm config set registry http://registry.npmjs.org
program.parse(process.argv);