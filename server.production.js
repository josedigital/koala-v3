var path = require('path')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var fs = require('fs')
var mongoose = require('mongoose')
mongoose.Promise = Promise;

app.set('port', (process.env.PORT || 3000));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var controllers = require('./controllers/index');



app.use(express.static(path.join(__dirname, '/dist')))
app.get(/^(?!.*(api))/, function response(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
})
app.use('/api/*', controllers);
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
    route = require('./controllers/' + file);
    app.use(route, controllers);
  }
});




mongoose.connect('mongodb prod link')
var db = mongoose.connection
db.on("error", function(err){
    console.log("Mongoose connection error", err)
})
db.once("open", function(){
    console.log("Mongoose connection Successful, check port 3000")
})




app.listen(app.get('port'), function (err) {
  if (err) {
    console.log(err)
  }
  console.info('==> Listening on port %s.', app.get('port'));
})
