Sherpa.Views.ShowTodo = Backbone.View.extend({
	template: JST['todo_list_items/show'],

	events: {
		"click check-off":"completeTodo"
	},
	render: function (){
		this.$el.html(this.template({todo: this.model}));
		this.$el.attr('data-id', this.model.id)
		return this
	},

	completeTodo: function(event) {
		event.preventDefault();
		var id = $(event.target).data('id')
		var todo = Sherpa.Collections.todos.grab(id)
		todo.save({completed: true}, {
			success: function() {

			}
		})
	}
})

