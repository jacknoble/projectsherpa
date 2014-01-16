window.Sherpa = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	initialize: function() {
		var $root = $('#content')
		if (CURRENT_USER !== null) {
			var user = Sherpa.user = new Sherpa.Models.User({id: CURRENT_USER})
			user.fetch({
				success: function(data) {
					var router = Sherpa.router = new Sherpa.Routers.Router({$rootEl: $root});
					Backbone.history.start();
				}
			})
		}
	}
}

$(function(){
	Sherpa.initialize();
});