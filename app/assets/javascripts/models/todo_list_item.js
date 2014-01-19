Sherpa.Models.TodoListItem = Backbone.Model.extend({
	sync: function(method, model, options) {
		options = options || {};
		options.url = model.methodToURL(method.toLowerCase());
		return Backbone.sync.apply(this, arguments)
	},

	methodToURL: function(method) {
		if (method === 'create') {
			return "/api/projects/" + Sherpa.currentProject.id + "/todo_lists"
		} else {
			return "/api/todo_lists/" + this.get('id')
		}

	},
})