Sherpa.Models.Project = Backbone.Model.extend({
	urlRoot: "/api/projects",

	parse: function(data) {
		var parsedTeam = new Sherpa.Collections.Employees(
			data.team_members, {parse: true}
		);
		data.team_members = parsedTeam;
		var parsedTodoLists = new Sherpa.Collections.TodoLists(
			data.todo_lists, {parse: true}
		)
		data.todo_lists = parsedTodoLists;
		return data;
	}
})