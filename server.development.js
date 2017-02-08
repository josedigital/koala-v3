var express = require('express')
var path = require('path')
var webpack = require('webpack')
var config = require('./webpack.config.development')
var app = express()
var compiler = webpack(config)
var bodyParser = require('body-parser')
var fs = require('fs')
var mongoose = require('mongoose')
mongoose.Promise = Promise;

var middleware = require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'src',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
});

app.use(middleware);
app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var controllers = require('./controllers/index');

// app.get('*', function response(req, res) {
//   res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
//   res.end();
// });
// app.use(express.static(path.join(__dirname, '/dist')))
app.use(middleware)
app.get(/^(?!.*(api))/, function response(req, res) {
  res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
  res.end()
})
app.use(express.static(path.join(__dirname, '/dist')))
app.use('/api/*', controllers);
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
    route = require('./controllers/' + file);
    app.use(route, controllers);
  }
});


mongoose.connect('mongodb://localhost/koalaV2');//origin changed for heroku test
var db = mongoose.connection;
db.on("error", function(err){
    console.log("Mongoose connection error", err);
});
db.once("open", function(){
    console.log("Mongoose connection Successful, check port 3000");
});

app.listen(config._hotPort, 'localhost', function (err) {
  if (err) {
    console.log(err)
  }
  console.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', config._hotPort, config._hotPort)
})
