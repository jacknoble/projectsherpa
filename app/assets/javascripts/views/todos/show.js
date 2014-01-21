Sherpa.Views.ShowTodo = Backbone.View.extend({
	template: JST['todo_list_items/show'],

	events: {
		"click #check-off":"completeTodo"
	},
	render: function (){
		var assignedUser = this.model.assignedUser();
		this.$el.html(this.template({todo: this.model, assigned: assignedUser}));
		return this
	},

	completeTodo: function(event) {
		event.preventDefault();
		var id = $(event.target).data('id')
		var todo = Sherpa.Collections.todos.get(id)
		todo.save({completed: true}, {
			success: function() {

			}
		})
	}
})

