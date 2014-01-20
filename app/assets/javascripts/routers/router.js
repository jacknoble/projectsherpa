Sherpa.Routers.Router = Backbone.Router.extend({

	initialize: function(options) {
		this.$rootEl = options.$rootEl;
	},

	routes: {
		'':'userShow',
		"projects/:id":"projectShow",
		"logout":"logout",
		"calendar":"calendar"
	},

	userShow: function() {
		var user = Sherpa.user
		var userView = new Sherpa.Views.UserShow({model: user})
		this._swapView(userView)
	},

	projectShow: function(id) {
		var projects = Sherpa.user.get("projects")
		var project = Sherpa.currentProject = projects.get(id)
		var projectView = new Sherpa.Views.ShowProject({model: project})
		this._swapView(projectView);
	},

	calendar: function() {
		var calView = new Sherpa.Views.ShowCalendar()
		this._swapView(calView)
	},

	_swapView: function(view) {
		this.$rootEl.empty();
		this.$rootEl.html(view.render().$el)
	}

})