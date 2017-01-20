
/*
 * GET home page.
 */
var express=require('express');
var app=express();
var User=require("../models/users");
var crypto = require('crypto');
exports.login=function(req,res){
//	console.log("login");
	res.render('login');
//	res.end("login");
}
exports.check=function(req,res,next){

	if(!req.session.user){
    	res.redirect("/login"); 
  }else{
    
    next();
  }
}
exports.logout=function(req,res){
	req.session.user=null;
 	res.render('login');
}
exports.loginCheck=function(req,res){

	var md5 = crypto.createHash('md5'),
    password = md5.update(req.body.password).digest('hex');

	User.get(req.body.username, function(err, user){
	    if(!user){
	      return res.redirect('/regist'); 
	    }

	    if(user.password != password){
	      return res.redirect('/login');
	    }
	    
	    req.session.user = user;//将用户信息存入session
	    res.redirect('/home');
	});
}
exports.regist=function(req,res){
	res.render("register");
}
exports.register=function(req,res){
	var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
	var newUser=new User({
		name:req.body.username,
		password:password,
		id:req.body.id,
		email:req.body.email,
		phone:req.body.phone
	});
	
	 User.get(newUser.name, function(err, user){
    	if(user){
    		console.log("用户已存在");
   	        err = '用户已存在!';
        }
        if(err){
        	console.log(err);
//            req.flash('error', err);
            return res.redirect('/regist');
        }
 //       console.log(req.body);

        newUser.save(function(err){//增加新的用户
            if(err){
                req.flash('error',err);
                return res.redirect('regist');
            }
            req.session.user = newUser;//用户信息存入session
            res.redirect('/home');
        });
      });
	
}
exports.index = function(req, res){

  res.render('index');
};

exports.partials = function (req, res) {

  var name = req.params.name;
  res.render('partials/' + name);
};