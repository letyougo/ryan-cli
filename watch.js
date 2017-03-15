/**
 * Created by xiaoxiaosu on 17/3/10.
 */
var express =require('express'),
    bodyParser = require('body-parser'),
    jsonfile = require('jsonfile'),
    url = require('url'),
    cors = require('cors')

function wathch(dbname,port) {
    var app = express()
    var database = jsonfile.readFileSync(dbname)
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cors())
    app.all('*',function (req, res) {


        var pathname = url.parse(req.originalUrl).pathname.replace(/^\//,'').replace(/$\//,'').split('/')
        var query = req.query
        var method = req.method

        console.log(req.originalUrl,req.method)

        var table = pathname[0],
            get = req.method == 'GET',
            post = req.method == 'POST',
            patch = req.method == 'PATCH',
            put = req.method == 'PUT',
            Delete = req.method == 'DELETE'
            getAll = pathname.length == 1,
            getOne = pathname.length == 2,
            itemId = pathname.length >1 ? pathname[1] : 0

        console.log(getOne,getAll,pathname)

        if(itemId == 0 && !getAll){
            if(getOne || patch || Delete || put){
                return res.send({'error':'this request metod need a itemid'})
            }

        }



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

        if(patch){
            var o
            database[table] = database[table].map(function (obj) {
                if(obj.id == itemId){
                    o = Object.assign({},obj,req.body)
                    return o
                }else {
                    return obj
                }
            })
            jsonfile.writeFileSync(dbname,database,{spaces: 4})
            res.send(o)

        }

        if(put){
            var o
            database[table] = database[table].map(function (obj) {
                if(obj.id == itemId){
                    o = req.body
                    o.id = obj.id
                    return o
                }else {
                    return obj
                }
            })
            jsonfile.writeFileSync(dbname,database,{spaces: 4})
            res.send(o)
        }
        if(Delete){
            var o = database[table].find(function (obj) {
                return obj.id == itemId
            })
            if(o){
                database[table] = database[table].filter(function (obj) {
                    return obj.id != itemId
                })
                jsonfile.writeFileSync(dbname,database,{spaces: 4})
                res.send(o)

            }else {
                res.send({error:'item not found'})
            }



        }

    })
    app.listen(port,function () {
        console.log('server start')
    })
}

module.exports = wathch