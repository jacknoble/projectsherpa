Sherpa.Views.ShowTodoList = Backbone.View.extend({
	events: {
		"click #add_todo":"newTodo"
	},

	template: JST['todo_lists/show'],

	render : function() {
		this.$el.html(this.template({list: this.model}))
		return this;
	},

	newTodo: function(event) {
		event.preventDefault();
		var newTodo = new Sherpa.Models.TodoListItem()
		var newTodoView = new Sherpa.Views.TodoFormShow({model: newTodo})
		this.$el.append(newTodoView.render().$el)
	}
})