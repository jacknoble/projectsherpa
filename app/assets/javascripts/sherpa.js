window.Sherpa = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	initialize: function() {
		var $root = $('#content')
		var user = Sherpa.user = new Sherpa.Models.User()
		user.fetch({
			success: function() {
				var router = Sherpa.router = new Sherpa.Router.Router({$rootEl: $root});
				Backbone.history.start();
			}
		})
	}
}

$(function(){
	Sherpa.initialize();
});