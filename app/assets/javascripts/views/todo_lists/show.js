Sherpa.Views.ShowTodoList = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.model, "change:title", this.render)
		this.collection = this.model.get('todo_list_items')
		this.listenTo(
			this.collection, "add remove", this.render
		)
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
		style: "margin-left: 15px; margin-top: 10px",
	},

	template: JST['todo_lists/show'],

	editTemp: JST['todo_lists/edit'],

	render : function() {
		this.$el.html(this.template({list: this.model}))
		var items = this.collection;
		var that = this;
		items.each(function (item) {
			if (!item.get('completed')) {
				var showTodo = new Sherpa.Views.ShowTodo({model: item});
				$(that.$el.find('#todo_index'))
					.append(showTodo.render().$el)
			}
		})
		this.sortable()
		return this;
	},

	sortable: function() {
		var that = this;
		this.$el.find('#todo_index').sortable({
			update: function(event, ui) {
				var item = ui.item
				that.updateOrder(item);
			},
			forcePlaceholderSize: true,
			revert: 100,
		})
	},

	

	setOrder: function(item, order) {
		$(item).data('order', order)
		var bbItem = Sherpa.Collections.todos.get($(item).data('id'));
		bbItem.save({order: order}, {
			success: function(data){
			}
		})
	},

	updateOrder: function(item) {
		var index = item.index();
		if (index === -1) {
			$item.parent.sortable( "cancel" )
		}
		var list = item.parent().children()
		var length = item.siblings().length + 1;
		var itemToReset = false;
		if (index === 0){
			this.setOrder(item, 0.0);
			if (length === 2) {
				this.setOrder(list.get(1), 1.0)
			} else if (length > 2) {
				itemToReset = list.get(index + 1)
			}
		} else if (index === length-1) {
			this.setOrder(item, 1.0)
			if (length === 2) {
				this.setOrder(list.get(0), 0.0)
			} else if (length > 2) {
				itemToReset = list.get(index-1)
			}
		} else {
			itemToReset = item;
		}

		if (itemToReset) {
			this.resetItemOrder(itemToReset)
		}
		
	},

	resetItemOrder: function(item) {
		var index = $(item).index()
		var list = $(item).parent().children()
		var lastOrder = $(list.get(index-1)).data('order');
		var nextOrder = $(list.get(index+1)).data('order');
		var newOrder = (lastOrder + nextOrder) / 2.0;
		this.setOrder(item, newOrder)
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
