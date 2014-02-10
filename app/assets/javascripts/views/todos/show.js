Sherpa.Views.ShowTodo = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.model, 'change sync', this.render)
	},

	template: JST['todo_list_items/show'],

	discTemp: JST['todo_list_items/disc'],

	events: {
		"click #check-off":"completeTodo"
	},
	render: function (){
		var assignedUser = this.model.assignedUser();
		this.$el.html(this.template({todo: this.model, assigned: assignedUser}));
		this.$el.append(this.discTemp({todo: this.model}))
		this.$el.attr('data-order', this.model.escape('order'))
		return this
	},
	tagName: "li",

	attributes: function() {
		return {
			class: "sherpa-todo",
			style: "margin-top: 5px;",
			"data-id": this.model.id
		}
	},

	completeTodo: function(event) {
		event.preventDefault();
		id = $(event.target).data('id')
		var todo = Sherpa.Collections.todos.get(id)
		todo.save({completed: true}, {
			success: function() {

			}
		})
	}
})

