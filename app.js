var express = require('express')
var app = express()
var morgan = require('morgan')
var bodyParser = require('body-parser')
var swig = require('swig')
var wikiRouter = require('./routes/wiki')
var models = require('./models');

// MIDDLEWARE LOGGER
app.use(morgan('dev'))



// CHECK WHY NECESSARY
// app.get('/', function(req,res){
// 	res.send("LOL")
// })

// "ACTIVATING" BODY PARSER
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// STYLESHEETSSS
app.use(express.static('public'))

// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});

// PAY ATTENTION ON ORDER!!!!
app.use('/wiki/',wikiRouter)
	//      ^======User ^this router
	
models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3003, function () {
        console.log('Server is listening on port 3003!');
    });
})
.catch(console.error);

// PORT BEING USED + SERVER MSG
// app.listen(3003, function(){
// 	console.log("!!Server listening on port 3003")
// }) 