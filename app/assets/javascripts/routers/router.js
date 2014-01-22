Sherpa.Routers.Router = Backbone.Router.extend({

	initialize: function(options) {
		this.$rootEl = options.$rootEl;
	},

	routes: {
		'':'userShow',
		"projects/:id(/:tab)":"projectShow",
		"logout":"logout",
		"calendar":"calendar",
		"comments/:id":"commentShow",
		"todos/:id/discussion":"todoDiscussion"
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

	todoDiscussion: function(id){
		var comments = new Sherpa.Collections.TodoComments({},{todoId: id})
		var todo = Sherpa.Collections.todos.get(id)
		var that = this
		comments.fetch({
			success: function(){
				var discView = new Sherpa.Views.DiscussTodo({
					collection: comments,
					model: todo
				})
				that._modalize(discView)
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
		view.render();
		this.$rootEl.append(view.$el)
		view.$el.modal();
		view.$el.on('hide.bs.modal', function(e) {
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
			window.history.back()
		})
	}

})