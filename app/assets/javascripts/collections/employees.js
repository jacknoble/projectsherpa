Sherpa.Collections.Employees = Backbone.Collection.extend({
	model: Sherpa.Models.User,


})

window.Sherpa.Collections.users = new Sherpa.Collections.Employees();