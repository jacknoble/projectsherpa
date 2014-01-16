Sherpa.Views.NewProject = Backbone.View.extend({

	events: {
		"submit form#new_project_form" : "submit"
	},
	template: JST['projects/new'],
	render: function() {
		this.$el.html(this.template())
		return this
	},
	submit: function(event) {
		event.preventDefault();
		var $parsedData = $(event.target).serializeJSON();
		var newProject = new Sherpa.Models.Project($parsedData)
		newProject.save({}, {
			success: function() {
				Sherpa.user.get("projects").add(newProject)
			}
		})
	}
})