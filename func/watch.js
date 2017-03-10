/**
 * Created by xiaoxiaosu on 17/3/10.
 */
var express =require('express'),
    bodyParser = require('body-parser'),
    jsonfile = require('jsonfile'),
    url = require('url');

function wathch(dbname) {
    var app = express()
    var database = jsonfile.readFileSync(dbname)
    app.use(bodyParser.urlencoded({ extended: false }))
    app.all('*',function (req, res,next) {
        var pathname = url.parse(req.originalUrl).pathname.replace(/^\//,'').replace(/$\//,'').split('/')
        var method = req.method

        console.log(req.originalUrl,req.method)

        var table = pathname[0],
            get = req.method == 'GET',
            post = req.method == 'POST',
            getAll = pathname.length == 1,
            getOne = pathname.length == 2,
            itemId = pathname.length >1 ? pathname[1] : 0





        if(get && getAll){
            if(database[table]){
                res.send(database[table])
            }else {
                res.send({
                    error:'table not exists'
                })
            }
        }


        if(get && getOne){

            var item = database[table].find(function (obj) {
                return obj.id == itemId
            })
            if(item){
                res.send(item)
            }else {
                res.send({
                    error:'item not exists'
                })
            }


        }
        if(post){
            if(database){
                req.body.id = database[table][database[table].length-1].id +1
                database[table].push(req.body)

                jsonfile.writeFileSync(dbname,database,{spaces: 4})

                database = jsonfile.readFileSync(dbname)
                res.send(database[table])
            }else {
                res.send({
                    error:'table not exists'
                })
            }
        }
        next()
    })
    app.listen(3000,function () {
        console.log('server start')
    })
}

module.exports = wathch