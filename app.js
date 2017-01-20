
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api');
var settings = require('./settings');
var session = require('express-session');
var MongoStore = require('connect-mongo')(express);
var flash = require('connect-flash');

var app = express();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser());
  app.use(express.session({
    secret: settings.cookieSecret,
    key: settings.db,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
    store: new MongoStore({
     /*  db: settings.db,
      host: settings.host,
      port: settings.port,*/
      url:"mongodb://localhost/"+settings.db,
       autoRemove:'native'
    })
    }))
});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/',routes.check);
app.get('/',routes.login);
app.get('/login',routes.login);
app.post('/loginForm',routes.loginCheck);
app.get('/regist',routes.regist);
app.post('/register',routes.register);
app.get('/home',routes.check);
app.get('/home', routes.index);
app.get('/partials/:name', routes.partials);
app.get('/logout',routes.logout);
// JSON API

app.get('/api/posts', api.posts);


app.get('/api/post/:id', api.post);
app.post('/api/post', api.addPost);
app.put('/api/post/:id', api.editPost);
app.delete('/api/post/:id', api.deletePost);
app.post('/api/post/:id',api.commentPost);

// redirect all others to the index (HTML5 history)


// Start server

app.listen(3000, function(){
  console.log("Express server listening on port 3000 in %s mode",  app.settings.env);
});
