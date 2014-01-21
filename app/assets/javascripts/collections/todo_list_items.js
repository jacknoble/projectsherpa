Sherpa.Collections.TodoListItems = Backbone.Collection.extend({
	model: Sherpa.Models.TodoListItem,


});

Sherpa.Collections.todos = new Sherpa.Collections.TodoListItems();