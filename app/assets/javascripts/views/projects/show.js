Sherpa.Views.ShowProject = Backbone.View.extend({
	template: JST["projects/show"],

	events: {
		"click a#todo-lists": "showTodos",
	},

	render: function() {
		this.$el.html(this.template({
			project: this.model,
			members: this.model.get('team_members')
		}));
		return this
	},

	showTodos: function(event) {
		event.preventDefault()
		var todoLists = this.model.get('todo_lists')
		var todoListsIndex = new Sherpa.Views.TodoListIndex({collection: todoLists});
		this.$('#todos').html(todoListsIndex.render().$el)
	}


})