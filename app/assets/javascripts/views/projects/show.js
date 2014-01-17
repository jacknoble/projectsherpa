Sherpa.Views.ShowProject = Backbone.View.extend({
	template: JST["projects/show"],

	render: function() {
		console.log(this.model)
		this.$el.html(this.template({
			project: this.model,
			members: this.model.get('team_members')
		}));
		console.log(this.$el)
		return this
	}

})