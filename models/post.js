var mongodb = require('./db');

function Post(name, title, post) {
  this.name = name;
  this.title= title;
  this.text = post;
}

module.exports = Post;

Post.prototype.save = function(callback) {//存储一篇文章及其相关信息
  var date = new Date();
  //存储各种时间格式，方便以后扩展
  var time = {
      date: date,
      year : date.getFullYear(),
      month : date.getFullYear() + "-" + (date.getMonth()+1),
      day : date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate(),
      minute : date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes()
  }
  //要存入数据库的文档
  var post = {
      name: this.name,
      time: time,
      title:this.title,
      text: this.text,
      comments:[],
      hideNote:this.text
  };
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //读取 posts 集合
    db.collection('posts', function (err, collection) {

      if (err) {
        console.log("save 读取posts error");

        mongodb.close();
        return callback(err);
      }


      //将文档插入 posts 集合
      collection.insert(post, {
        safe: true
      }, function (err,post) {
        mongodb.close();
        callback(null);
      });
    });
  });
};

Post.get = function(callback) {//读取文章及其相关信息
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //读取 posts 集合
    db.collection('posts', function(err,collection) {
      if (err) {
        console.log("读取posts error");
        mongodb.close();
        return callback(err);
      }
      collection.find().sort({
        time: -1
      }).toArray(function (err, docs) {

        mongodb.close();
        if (err) {
          callback(err, null);//失败！返回 null
        }
          callback(null, docs);//成功！以数组形式返回查询的结果
      });
    });
  });
};

Post.remove = function(name,callback) {//读取文章及其相关信息
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //读取 posts 集合
    db.collection('posts', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      var query = {};
      if (name) {
        query.title = name;
      }
      console.log(query);
  
      collection.remove(query,function(err){
        mongodb.close();
        if(err){
          callback(err);
        }else{
          callback(null);
        }
      });
    });
  });
};
Post.update=function(name,object,callback){
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //读取 posts 集合
    db.collection('posts', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      var query = {};
      if (name) {
        query.title = name;
      }
      collection.update(query,{
        $set:{
          text:object.text,
          comments:object.comments
        }
      },function(err){
        mongodb.close();
        if(err){
          callback(err);
        }else{
          callback(null);
        }
      });
    });
  });
}