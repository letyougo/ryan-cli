#!/usr/bin/env node
var program = require('commander')
var co = require('co');
var prompt = require('co-prompt');
var chalk = require('chalk')
var fs = require('fs');
var path = require('path');
require('shelljs/global');


var log = function (txt) {
    console.log(chalk.magenta.bold(txt))
}

var createProject = require('./func/create'),
    watchJson = require('./func/watch');

// log('欢迎使用ryan-cli')
// log('ryan -r -n -a -p -s查看作者简介')
// log('ryan create project_name -t project_type 创建项目')
var projecttype
program
    .version('0.0.1')

    .option('-r --resume','my total resume',function(){
        log('我是来自动脑学院的前端老师')
        log('我26岁了')
        log('我是个前端工程师')
    })
    .option('-p, --port <port>','wathch port')
    .option('-t, --type <type>','project type')


program

    .command('create <name>')
    .action(function(name){
        var projecttype = program.type
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


program
    .command('watch <db>')
    .action(function (dbname) {
        watchJson(dbname,program.port)
    })




log('模块工作目录'+__dirname)
//npm config set registry http://registry.npmjs.org
program.parse(process.argv);