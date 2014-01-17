Sherpa.Models.Project = Backbone.Model.extend({
	urlRoot: "/api/projects",

	parse: function(data) {
		var parsedTeam = new Sherpa.Collections.Employees(data.team_members);
		data.team_members = parsedTeam;
		return data;
	}
})