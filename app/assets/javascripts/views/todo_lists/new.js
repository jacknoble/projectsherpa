Sherpa.Views.NewTodoList = Backbone.View.extend({
	template: JST["todo_lists/new"],
	events: {
		"submit":"submit"
	},
	tagName: "form",
	render: function() {
		this.$el.html(this.template({members: this.collection}));
		return this;
	},
	submit: function(event) {
		console.log("getting here")
		event.preventDefault();
		var todoData = $(event.target).serializeJSON();
		var newTodo = new Sherpa.Models.TodoList(todoData)
		newTodo.save({}, {
			success: function() {
				Sherpa.currentProject.get('todo_lists').add(newTodo)
			}
		})
	}
})