Sherpa.Collections.TodoLists = Backbone.Collection.extend({
	model: Sherpa.Models.TodoList,
	url: function () {
		return "/api/projects/" + Sherpa.currentProject + "todo_lists"
	}
})