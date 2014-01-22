Sherpa.Models.Project = Backbone.Model.extend({
	initialize: function() {
		Sherpa.Collections.projects.add(this)
	},
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

		var comments = new Sherpa.Collections.Comments(data.comments, {parse: true})
		data.comments = comments
		return data;
	}
})

