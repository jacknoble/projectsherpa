Sherpa.Views.EmployeeIndex = Backbone.View.extend({
	template: JST["users/index"],

	render: function() {
		this.$el.html(this.template({user: this.model}))
		this.$('.emp-name').draggable();
		return this;
	}
})