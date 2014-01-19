Sherpa.Models.TodoListItem = Backbone.Model.extend({
	sync: function(method, model, options) {
		options = options || {};
		options.url = model.methodToURL(method.toLowerCase());
		return Backbone.sync.apply(this, arguments)
	},

	methodToURL: function(method) {
		if (method === 'create') {
			return "/api/todo_lists/" + this.get('todo_list_id') + "/todo_list_items"
		} else {
			return "/api/todo_list_items/" + this.get('id')
		}

	},
})