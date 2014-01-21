Sherpa.Collections.TodoListItems = Backbone.Collection.extend({
	model: Sherpa.Models.TodoListItem,
	url: "api/todo_list_items"

});

Sherpa.Collections.todos = new Sherpa.Collections.TodoListItems();