Sherpa.Views.TodoListIndex = Backbone.View.extend({
	initialize: function(options) {
		this.listenTo(this.collection, "add remove", this.render)
	},
	attributes: {
		class: "col-md"
	},
	template: JST["todo_lists/index"],
	events: {
		"click button.new_todo_list":"newTodoListForm"
	},
	render: function () {
		this.$el.html(this.template())
		var that = this;
		this.collection.each( function (todo_list) {
			var listView = new Sherpa.Views.ShowTodoList({model: todo_list})
			that.$el.append(listView.render().$el)
			that.dropable(listView)
		})
		return this;
	},

	dropable: function(view) {
		var that = view
		var $rootEl = this.$el
		that.$el.droppable({
			drop: function(event, ui) {
				$item = $(ui.draggable)
				var todoId = $item.data('id')
				var todo = Sherpa.Collections.todos.get(todoId)
				if (todo.get('todo_list_id') !== that.model.id){
					$item.remove()
					that.$el.find('#todo_index').append($item)
					var oldList = Sherpa.Collections.lists.get(todo.get('todo_list_id'))
					last = that.collection.last()
					that.collection.add(todo);
					oldList.get('todo_list_items').remove(todo.id);
					todo.save({todo_list_id: that.model.id}, {
						success: function(data) {
							(typeof last !== 'undefined') ? last.fetch() : null
						}
					})
				}
			}
		})
	},

	newTodoListForm: function() {
		var newListView = new Sherpa.Views.NewTodoList({
			collection: this.team_members
		})
		this.$el.prepend(newListView.render().$el)
	}
})