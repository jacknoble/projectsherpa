Sherpa.Routers.Router = Backbone.Router.extend({

	initialize: function(options) {
		this.$rootEl = options.$rootEl;
	},

	routes: {
		'':'userShow',
		"projects/:id(/:tab)":"projectShow",
		"logout":"logout",
		"calendar":"calendar",
		"comments/:id":"commentShow"
	},

	commentShow: function(id) {
		var comment = new Sherpa.Models.Comment({id: id})
		var that = this
		comment.fetch({
			success: function() {
				var showView = new Sherpa.Views.ShowComment({model: comment})
				that._modalize(showView)
			}
		})
	},

	userShow: function() {
		var user = Sherpa.user
		var userView = new Sherpa.Views.UserShow({model: user})
		this._swapView(userView)
	},

	projectShow: function(id, tab) {
		var projects = Sherpa.user.get("projects")
		var project = Sherpa.currentProject = projects.get(id)
		var that = this
		project.fetch({
			success: function(){
				var projectView = new Sherpa.Views.ShowProject({model: project, tab: tab})
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
	},

	_modalize: function(view) {
		$modal = $('<div>').html(view.render().$el)
		this.$rootEl.append($modal)
		$('#myModal').modal();
		$('#myModal').on('hide.bs.modal', function(e) {
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
			window.history.back()
		})
	}

})