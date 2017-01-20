
// For a real app, you'd make database requests here.
// For this example, "data" acts like an in-memory "database"
var data_posts=[];

// GET
var Post=require('../models/post.js');
exports.posts = function (req, res) {
  data_posts.splice(0,data_posts.length);
  Post.get(function(err,posts){
  
      if(!posts){
        posts=new Array;
      }else
      {
        posts.forEach(function (post, i) {
        data_posts.push({
          id: i,
          author:post.name,
          title: post.title,
          text: post.text,
          time:post.time.minute,
          comments:post.comments,
          hideNote:post.hideNote
           });
      //console.log(posts);
        });
      }
       if(req.session.user["name"]=="administrator"){
        res.json({
         isAdmin:true,
         posts: data_posts,
         username:req.session.user["name"]
         });
       }else{
        res.json({
         isAdmin:false,
         posts: data_posts,
         username:req.session.user["name"]
         });
       }
       
  });
  
};

exports.post = function (req, res) {
//  console.log(req);
  var id = req.params.id;
  console.log(req.url);
  if (id >= 0 && id < data_posts.length) {
    res.json({
      post: data_posts[id]
    });
  } else {
    res.json(false);
  }
};

// POST

exports.addPost = function (req, res) {
  var newPost=new Post(req.session.user['name'],req.body.title,req.body.text);

  console.log("addPost: ");
  console.log(req.url);
  console.log(req.body);
  newPost.save(function(err){
    {
      data_posts.push(req.body);   
      res.json(req.body);
    }
  })
};

// PUT

exports.editPost = function (req, res) {
  var id = req.params.id;
 console.log("editPost: ");
  console.log(req.url);
  console.log(req.body);

  if (id >= 0 && id < data_posts.length) {
 
       Post.update(data_posts[id].title,req.body,function(err){
        if(err){
          console.log("update failed");
        }else{
          console.log("updated");
        }
      });
      data_posts.splice(id, 1);
      res.json(true);
  } else {
    res.json(false);
  }
};

// DELETE

exports.deletePost = function (req, res) {
  var id = req.params.id;
  var username=req.session.user["name"];
  
  if (id >= 0 && id < data_posts.length) {
    
    Post.remove(data_posts[id].title,function(err){
      if(err){
        console.log("delete failed");
      }else{
        console.log("deleted");
      }
    });
    data_posts.splice(id, 1);
    res.json(true);
    
  } else {
    res.json(false);
  }
};

exports.commentPost = function (req, res) {
  console.log("req.body");
  console.log(req.body);
  var comment={
    text:req.body.text,
    author:req.session.user["name"],
    hideNote:req.body.text
  }
   var id = req.params.id;

  if (id >= 0 && id < data_posts.length) {
    data_posts[id].comments.push(comment);
    Post.update(data_posts[id].title,data_posts[id],function(err){
      if(err){
        console.log("update failed");
      }else{
        console.log("updated");
      }
    });
    res.json(comment);}

};
