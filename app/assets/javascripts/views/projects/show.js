Sherpa.Views.ShowProject = Backbone.View.extend({
	template: JST["projects/show"],

	events: {
		"click a#todo-lists": "showTodos",
		"click a#delete_project": "deleteProject"
	},

	render: function() {
		this.$el.html(this.template({
			project: this.model,
			members: this.model.get('team_members')
		}));
		return this;
	},

	showTodos: function(event) {
		event.preventDefault();
		var todoListsIndex = new Sherpa.Views.TodoListIndex({
			collection: this.model.get('todo_lists'),
			team_members: this.model.get('team_members')
		});

		this.$el.find('#todos').html(todoListsIndex.render().$el)
	},

	deleteProject: function(event) {
		event.preventDefault();
		debugger
		this.model.destroy({
			success: Backbone.history.navigate("/", {trigger: true})
		})
	}


})