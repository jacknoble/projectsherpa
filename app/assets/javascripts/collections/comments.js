Sherpa.Collections.Comments = Backbone.Collection.extend({
	model: Sherpa.Models.Comment,

	url: function () {
		return "api/todo_list_items/" + commentable_id
	}
})

Sherpa.Collections.TodoComments = Backbone.Collection.extend({
	model: Sherpa.Models.Comment,

	initialize: function (models, options) {
		this.todoId = options.todoId;
	},

	url: function () {
		return "api/todo_list_items/" + this.todoId + "/comments"
	}
});
