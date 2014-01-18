Sherpa.Views.TodoListIndex = Backbone.View.extend({
	template: JST["todo_lists/index"],
	events: {
		"click button.new_todo_list":"newTodoListForm"
	}
	render: function () {
		this.$el.html(this.template({lists: this.collection}));
		return this;
	},

	newTodoListForm: function() {
		var newListView = new Sherpa.Views.NewTodoList()

	}
})