Sherpa.Routers.Router = Backbone.Router.extend({

	initialize: function(options) {
		this.$rootEl = options.$rootEl;
	},

	routes: {
		'':'userShow'
	},

	userShow: function() {
		var user = Sherpa.user
		var projects = this._getProjects
		var userView = new Sherpa.Views.UserShow({model: user})
		this._swapView(userView)
	},

	_swapView: function(view) {
		this.$rootEl.empty();
		this.$rootEl.html(view.render().$el)
	},

	_getProjects function() {
		if(Sherpa.projects !== undefined) {
			return Sherpa.projects
		} else {
			Sherpa.projects = new Sherpa.Collections.Projects()
			Sherpa.projects.fetch({
				success: function() {
					return Sherpa.projects
				}
			})
		}
	}

})