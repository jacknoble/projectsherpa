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
		var that = this
		project.fetch({
			success: function(){
				var projectView = new Sherpa.Views.ShowProject({model: project})
				that._swapView(projectView);
			}
		})
	},

	calendar: function() {
		var todos = new Sherpa.Collections.TodoListItems();
		var that = this;
		todos.fetch({
			success: function() {
				var calView = new Sherpa.Views.ShowCalendar({collection: todos})
				that._swapView(calView)
			}
		})
	},

	_swapView: function(view) {
		this.$rootEl.empty();
		this.$rootEl.html(view.render().$el)
	}

})