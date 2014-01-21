Sherpa.Models.TodoListItem = Backbone.Model.extend({

	initialize: function() {
		Sherpa.Collections.todos.add(this)
	},
	sync: function(method, model, options) {
		options = options || {};
		options.url = model.methodToURL(method.toLowerCase());
		return Backbone.sync.apply(this, arguments);
	},

	assignedUser: function () {
		if(!this._assignedUser) {
			var id = this.get('assigned_user_id')
			if (id) {
				this._assignedUser = Sherpa.Collections.users.get(id)
			} else {
				this._assignedUser = null
			}
		}
		return this._assignedUser
	},

	methodToURL: function(method) {
		if (method === 'create') {
			return "/api/todo_lists/" + this.get('todo_list_id') + "/todo_list_items";
		} else {
			return "/api/todo_list_items/" + this.get('id');
		}
	},
})