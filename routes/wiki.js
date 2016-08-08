var express = require('express')
var router = express.Router()
var models = require('../models')
var Page = models.Page;
var User = models.User;

router.get('/', function(req,res){
	res.redirect('/')
})

router.post('/', function(req,res){
	
	var page = Page.build({
		title: req.body.title,
		content: req.body.content,
		status: req.body.status
	})

	page.save()
	.then(function(send){
		res.redirect('/')
	})
	.catch(console.error)

})

router.get('/add', function(req,res){
	res.render('../views/addpage')
})



router.get('/')


module.exports = router;