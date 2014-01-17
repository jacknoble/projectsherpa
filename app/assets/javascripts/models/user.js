Sherpa.Models.User = Backbone.Model.extend({
	urlRoot: "/api/users",

	parse: function(response) {
		var projects = new Sherpa.Collections.Projects(response.projects);
		var company = new Sherpa.Models.Company(response.company)
		response.projects = projects;
		response.company = company
		return response
	}
})