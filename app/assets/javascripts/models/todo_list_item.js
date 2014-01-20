Sherpa.Models.TodoListItem = Backbone.Model.extend({
	sync: function(method, model, options) {
		options = options || {};
		options.url = model.methodToURL(method.toLowerCase());
		return Backbone.sync.apply(this, arguments);
	},

	assignedUser: function () {
		return ;
	},

	assigned_user: function () {
		if(!this._assigned_user) {
			var id = this.get('assigned_user_id')
			if (id) {
				this._assigned_user = Sherpa.Collections.users.grab(id)
			} else {
				this._assigned_user = null
			}
		}

		return this._assigned_user
	},

	methodToURL: function(method) {
		if (method === 'create') {
			return "/api/todo_lists/" + this.get('todo_list_id') + "/todo_list_items";
		} else {
			return "/api/todo_list_items/" + this.get('id');
		}
	},
})