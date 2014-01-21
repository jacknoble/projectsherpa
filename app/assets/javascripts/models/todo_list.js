Sherpa.Models.TodoList = Backbone.Model.extend({
	initialize: function() {
		Sherpa.Collections.lists.add(this);
	},
	sync: function(method, model, options) {
		options = options || {};
		options.url = model.methodToURL(method.toLowerCase());
		return Backbone.sync.apply(this, arguments);
	},

	methodToURL: function(method) {
		if (method === 'create') {
			return "/api/projects/" + Sherpa.currentProject.id + "/todo_lists";
		} else {
			return "/api/todo_lists/" + this.get('id');
		}
	},

	parse: function(data) {
		var items = new Sherpa.Collections.TodoListItems(
			data.todo_list_items, {parse: true}
		)
		data.todo_list_items = items;
		return data;
	}

})