Sherpa.Views.ShowTodoList = Backbone.View.extend({
	initialize: function() {
		this.listenTo(
			this.model.get('todo_list_items'), "add reset change remove", this.render
		);

		this.listenTo(this.model, "sync", this.render)
	},
	events: {
		"click #add_todo":"newTodo",
		"click .toggle-edit":"toggleEdit",
		"click #cancel":"toggleShow",
		"click #todo_title":"changeTitle",
		"blur #todo_list_title":"updateTitle",
		"click #update_list":"updateTitle",
		"click #cancel_list_edit": "cancelEdit",
		"click #delete":"deleteList"
	},

	attributes: {
		class: "sherpa-list",
		style: "margin-left: 15px; margin-top: 10px"
	},

	template: JST['todo_lists/show'],

	editTemp: JST['todo_lists/edit'],

	render : function() {
		this.$el.html(this.template({list: this.model}))
		var items = this.model.get("todo_list_items");
		var that = this;
		items.each(function (item) {
			if (!item.get('completed')) {
				var showTodo = new Sherpa.Views.ShowTodo({model: item});
				$(that.$el.find('#todo_index'))
					.append(showTodo.render().$el)
			}
		})
	// 	this.$el.find('#todo_index').sortable({
// 			// update: function(event, ui) {
// // 				var movedId = ui.item.data('id')
// // 				var reorderdId
// // 				var last = ui.item.last();
// // 				var next = ui.item.next();
// // 				if (last.data('id') === movedId) {
// // 					moved.set('order', 0)
// // 					reorderedId = next.data('id')
// // 				} else if (next.data('id') === movedId) {
// // 					moved.set('order', 1)
// // 					reorderedId = last.data('id')
// // 				} else {
// // 					reorderedId = movedId
// // 				}
// // 				var reordered = that.model.get('todo_list_items').get(reorderedId)
// // 				var nextOrder reordered.next().data('order')
// // 				var lastOrder reordered.last().data('order')
// // 				var avg = nextOrdre / lastOrder
// // 				reordrered
// 			}
// 		})
		return this;
	},

	newTodo: function(event) {
		event.preventDefault();
		var newTodo = new Sherpa.Models.TodoListItem({todo_list_id: this.model.id});
		var newTodoView = new Sherpa.Views.TodoForm({model: newTodo});
		this.$el.append(newTodoView.render().$el);
	},

	toggleEdit: function(event) {
		event.preventDefault();
		var id = $(event.currentTarget).data('id');
		var todo = this.model.get("todo_list_items").get(id);
		var view = new Sherpa.Views.TodoForm({model: todo});

		$(event.currentTarget).parent().replaceWith(
			view.render().$el
		)
	},

	toggleShow: function(event) {
		event.preventDefault();
		var id = $(event.currentTarget).data('id');
		if (id === "") {
			$(event.currentTarget).parent().remove();
		} else {
			var todo = this.model.get("todo_list_items").get(id);
			var view = new Sherpa.Views.ShowTodo({model: todo});
			$(event.currentTarget).parent().replaceWith(
				view.render().$el
			);
		}
	},

	changeTitle: function (event){
		event.preventDefault();
		var id = $(event.currentTarget).data('id');
		var list = Sherpa.Collections.lists.get(id);
		var titleForm = $(this.editTemp({list: list}));
		$(event.currentTarget).replaceWith(titleForm)
	},

	updateTitle: function(event) {
		event.preventDefault();
		var data = $(event.currentTarget).serializeJSON()
		var id = $(event.currentTarget).data('id')
		var list = Sherpa.Collections.lists.get(id);
		list.save(data.todo_list, {
			success: function(){

			}
		})
	},

	cancelEdit: function(event) {
		event.preventDefault();
		this.render();
	},

	deleteList: function(event) {
		event.preventDefault();
		var id = $(event.currentTarget).data('id')
		var list = Sherpa.Collections.lists.get(id)
		list.destroy({
			success: function () {
			}
		})
	}

})
