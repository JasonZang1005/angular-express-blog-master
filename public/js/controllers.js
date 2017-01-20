'use strict';

/* Controllers */

function IndexCtrl($scope, $http) {
  console.log("IndexCtrl"); 
  $http.get('/api/posts').
    success(function(data, status, headers, config) {
      $scope.posts = data.posts;
      $scope.isAdmin=data.isAdmin;
      $scope.username=data.username;
      console.log($scope.username);
    });
}
function appCtrl($scope, $http){
  $scope.username;
  $http.get('/api/posts').
    success(function(data, status, headers, config) {
      $scope.username=data.username;
    });
}
function isUserCtrl($scope){
  if($scope.username==$scope.post.author){
    $scope.isUser=true;
  }else{
     $scope.isUser=false;
  }

}
function CommentPostCtrl($scope,$http,$location, $routeParams){

  $scope.comment={};

  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      console.log(data);
      $scope.post = data.post;
    });
  $scope.submitComment=function(){
         $http.post('/api/post/' + $routeParams.id, $scope.comment).
             success(function(data) {
            console.log("submit");
             console.log(data);
             $scope.post.comments.push(data);
            $location.path('/readPost/'+$routeParams.id);
        });
     
  };
    
}

function AddPostCtrl($scope, $http, $location) {
  console.log("AddPostCtrl");
  $scope.form = {};
  $scope.submitPost = function () {
    $http.post('/api/post', $scope.form).
      success(function(data) {
        console.log(data);
        $location.path('/home');
      });
  };
}

function ReadPostCtrl($scope, $http, $routeParams,$location) {
  console.log("ReadPostCtrl");

  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      console.log(data);
      $scope.post = data.post;
    });
   $scope.hideComment=function(index){
      $scope.post.comments[index].text="该评论已被隐藏";
      $http.put('/api/post/' + $routeParams.id, $scope.post).
      success(function(data) {

        $location.url('/readPost/'+$routeParams.id);
      });
  }
  $scope.showComment=function(index){
    var text=$scope.post.comments[index].hideNote;
      $scope.post.comments[index].text=text;
      $http.put('/api/post/' + $routeParams.id, $scope.post).
      success(function(data) {

        $location.url('/readPost/'+$routeParams.id);
      });
  }
}

function EditPostCtrl($scope, $http, $location, $routeParams) {
  console.log("EditPostCtrl");
  $scope.form = {};
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.form = data.post;
    });

  $scope.editPost = function () {
    $http.put('/api/post/' + $routeParams.id, $scope.form).
      success(function(data) {
        $location.url('/readPost/' + $routeParams.id);
      });
  };
}
  
function DeletePostCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });

  $scope.deletePost = function () {
    $http.delete('/api/post/' + $routeParams.id).
      success(function(data) {
        $location.url('/');
      });
  };

  $scope.home = function () {
    $location.url('/home');
  };
}
function hidePostCtrl($scope, $http, $location, $routeParams){
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });
    $scope.hidePost=function(){
      $scope.post.text="该博客已被隐藏";
      $http.put('/api/post/' + $routeParams.id, $scope.post).
      success(function(data) {
        console.log("hidePost: "+data);
        $location.url('/home');
      }); 
     
    }
     $scope.home = function () {
    $location.url('/home');
  };
}

function showPostCtrl($scope, $http, $location, $routeParams){
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });
    $scope.showPost=function(){
      var hidenote=$scope.post.hideNote;
      $scope.post.text=hidenote;
      $http.put('/api/post/' + $routeParams.id, $scope.post).
      success(function(data) {
        $location.url('/home');
      }); 
      
    }
     $scope.home = function () {
    $location.url('/home');
  };
}