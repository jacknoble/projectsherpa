Sherpa.Collections.Projects = Backbone.Collection.extend({
	url: function() {
		return "/api/users/" + Sherpa.user.id + "/projects"
	}
})