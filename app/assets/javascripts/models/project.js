Sherpa.Models.Project = Backbone.Model.extend({
	urlRoot: "/api/projects",

	parse: function(data) {
		var parsedTeam = new Sherpa.Collections.Employees(data.team_members);
		data.team_members = parsedTeam;
		var parsedTodoLists = new Sherpa.Collections.TodoLists(data.todo_lists)
		data.todo_lists = parsedTodoLists;
		return data;
	}
})