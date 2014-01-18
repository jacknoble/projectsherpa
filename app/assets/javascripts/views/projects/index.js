Sherpa.Views.ProjectIndex = Backbone.View.extend({
	template: JST["projects/list"],
	render: function() {
		this.$el.html(this.template({projects: this.collection}))
		return this
	}
})