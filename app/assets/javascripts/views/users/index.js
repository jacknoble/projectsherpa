Sherpa.Views.EmployeeIndex = Backbone.View.extend({
	template: JST["users/index"],

	render: function() {
		console.log(this.model)
		this.$el.html(this.template({user: this.model}))
		this.$('.emp-name').draggable();
		return this;
	}
})