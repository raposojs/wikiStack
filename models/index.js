var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});
var urlTitleMaker = function(st){
	var newStr = ''
	if(st){
		newStr = st.replace(/\s+/g,"_").replace(/\W/g, "")
	} else {
		newStr = Math.random().toString(36).substring(2,7)
	}
	return newStr
}

var Page = db.define('page'/*<== model that will be trans. to table*/, {
	title: {
		type:Sequelize.STRING, 
		allowNull: false
	},
	urlTitle: {
		type:Sequelize.STRING, 
		allowNull: false,
	},
	content: {
		type:Sequelize.TEXT, 
		allowNull: false
	},
	status: {
		type:Sequelize.ENUM('open','closed')
	},
    date: {
	    type: Sequelize.DATE,
	    defaultValue: Sequelize.NOW
	}
}, 

{
	getterMethods: function(){
		var urlName = this.getDataValue('urlTitle')
		return "/wiki/" + urlName
	}, 
	
	hooks: {
		beforeValidate: function(page, options){
			page.urlName = urlTitleMaker(page.title)	
		} 

		}
	}
)

var User = db.define('user', {
	name: {
		type:Sequelize.STRING, 
		allowNull: false
	},
	email:{
		type:Sequelize.STRING, 
		allowNull: false
	}
})

module.exports = {
	Page: Page, 
	User: User
}