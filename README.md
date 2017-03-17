### 欢迎使用ryan-cli


---
这是个简单的项目脚手架，集成了react，vue,jquery三种脚手架

##### ryan -h查看我的个人信息
1. ryan -r
2. ryan -a
3. ryan -s

## （1）创建项目脚手架
#### ryan create <project-name> -t <project-type>
用脚手架创建项目，项目类型有三种jquery,react,vue
1. ryna create hello_react -t react
2. ryna create hello_vue -t vue
3. ryna create hello_jquery -t jquery
4. 
## （2）假数据服务
#### ryan watch db.json -p 5050
db.json是一个json文件
```
{
    "user": [
        {"name": "ryan", "age": "222", "sex": "man", "id": 1},
        {"name": "16", "age": "16", "sex": "man", "id": 2},
    ]
}
然后 ryan 就给你提供了以下rest服务
get localhost:5050/user   获取所有用户
get localhost:5050/user?name=ryan   获取name=ryan的用户
get localhost:5050/user/1 获取id为1的用户
post localhost:5050/user  {name:'star',sex:'man'} 提交了一条数据 id自增加
patch localhost:5050/user/1  {name:'vic')  修改了那条id为1的数据
put localhost:5050/user/2  {name:'vic')  修改了那条id为1的数据
delete  localhost:5050/user/2 删除id为2的数据
```
#### ryan watch db.js -p 5050
db.js是一个js文件用于提供动态的随机数据
```
function getBlogs() {
    var json = []
    for(var i=0;i<10;i++){
        json.push({id:i,name:'i am '+i})
    }
    return json
}


module.exports = function () {
    return {
        blogs:getBlogs()
    }
}
用法和上面一样
```
