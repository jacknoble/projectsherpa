Sherpa.Models.User = Backbone.Model.extend({
	urlRoot: "/api/users",

	parse: function(response) {
		var projects = new Sherpa.Collections.Projects(response.projects, {parse: true});
		var company = new Sherpa.Models.Company(response.company, {parse: true})
		response.projects = projects;
		response.company = company
		return response
	}
})