'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/index',
        controller: IndexCtrl
      }).
      when('/addPost', {
        templateUrl: 'partials/addPost',
        controller: AddPostCtrl
      }).
      when('/readPost/:id', {
        templateUrl: 'partials/readPost',
        controller: ReadPostCtrl
      }).
      when('/editPost/:id', {
        templateUrl: 'partials/editPost',
        controller: EditPostCtrl
      }).
      when('/deletePost/:id', {
        templateUrl: 'partials/deletePost',
        controller: DeletePostCtrl
      }).
      when('/commentPost/:id', {
        templateUrl: 'partials/commentPost',
        controller: CommentPostCtrl
      }).
      when('/hidePost/:id',{
        templateUrl:'partials/hidePost',
        controller:hidePostCtrl
      }).
      when('/showPost/:id',{
        templateUrl:'partials/showPost',
        controller:showPostCtrl
      }).
      otherwise({
        redirectTo: '/home'
      });
    $locationProvider.html5Mode(true);
  }]);