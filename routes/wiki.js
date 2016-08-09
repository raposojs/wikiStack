var express = require('express')
var router = express.Router()
var models = require('../models')
var Page = models.Page;
var User = models.User;

router.get('/', function(req,res){
	res.render('index')
	//res.render('index', {pages: Page})
})

router.post('/', function(req,res){

	var page = Page.build({
		title: req.body.title,
		content: req.body.content,
		status: req.body.status
	})

	page.save()
	.then(function(savedPage){
		res.redirect(savedPage.route)
	})
	.catch(console.error)

})


router.get('/add', function(req,res){
	res.render('addpage')
})


router.get('/:url', function(req,res,next){
  Page.findOne({ 
	    where: { 
	      urlTitle: req.params.url 
	    } 
	  })
	  .then(function(foundPage){
	    //res.json(foundPage);
	    // res.render("addpage")
	    // res.json(foundPage.id)
	    // var locals = {
	    // 	title: foundPage.title

	    // }
	    res.render('wikipage', {title: foundPage.title, content: foundPage.content})
	  })
	  .catch(next);

})




module.exports = router;