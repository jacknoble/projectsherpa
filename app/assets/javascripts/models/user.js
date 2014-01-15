Sherpa.Models.User = Backbone.Model.extend({
	urlRoot: "/api/users",

	parse: function(response) {
		var projects = new Sherpa.Collections.Projects(response.projects);
		response.projects = projects;
		return response
	}
})