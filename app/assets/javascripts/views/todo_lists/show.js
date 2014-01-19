Sherpa.Views.ShowTodoList = Backbone.View.extend({
	initialize: function() {
		this.listenTo(
			this.model.get('todo_list_items'), "add reset remove", this.render
		)
	},
	events: {
		"click #add_todo":"newTodo",
		// "mouseover .toggle-edit":"toggleEdit",
		// "mouseout .toggle-show":"toggleShow"
	},

	template: JST['todo_lists/show'],

	render : function() {
		this.$el.html(this.template({list: this.model}))
		var items = this.model.get("todo_list_items")
		items.each(function (item) {
			var showTodo = new Sherpa.Views.ShowTodo({model: item})
			$(this.$.find('#todo_index')).append(showTodo.render().$el)
		})

		return this;
	},

	newTodo: function(event) {
		event.preventDefault();
		var newTodo = new Sherpa.Models.TodoListItem({todo_list_id: this.model.id})
		var newTodoView = new Sherpa.Views.TodoForm({model: newTodo})
		this.$el.append(newTodoView.render().$el)
	},

	toggleEdit: function(event) {
		event.preventDefault();
		var id = $(event.target).data('id')
		var todo = this.model.get("todo_list_items").get(id)
		var view = new Sherpa.Views.TodoForm({model: todo})
		$(event.target).replaceWith(view.render().$el.addClass("toggle-show"))
	}

})