Sherpa.Views.ShowTodoList = Backbone.View.extend({
	initialize: function() {
		this.listenTo(
			this.model.get('todo_list_items'), "add reset change:name remove", this.render
		)
	},
	events: {
		"click #add_todo":"newTodo",
		"click .toggle-edit":"toggleEdit",
		"click #cancel":"toggleShow"
	},

	template: JST['todo_lists/show'],

	render : function() {
		this.$el.html(this.template({list: this.model}))
		var items = this.model.get("todo_list_items")
		var that = this
		items.each(function (item) {
			var showTodo = new Sherpa.Views.ShowTodo({model: item})
			$(that.$el.find('#todo_index')).append(showTodo.render().$el)
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
		var id = $(event.currentTarget).data('id')
		var todo = this.model.get("todo_list_items").get(id)
		var view = new Sherpa.Views.TodoForm({model: todo})
		$(event.currentTarget).replaceWith(
			view.render().$el.addClass("toggle-show").removeClass("toggle-edit")
		)
	},

	toggleShow: function(event) {
		event.preventDefault();
		var id = $(event.currentTarget).data('id')
		var todo = this.model.get("todo_list_items").get(id)
		var view = new Sherpa.Views.ShowTodo({model: todo})
		$(event.currentTarget).parent().replaceWith(
			view.render().$el.addClass("toggle-edit").removeClass("toggle-show")
		);
	}

})