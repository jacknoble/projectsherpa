Sherpa.Views.ShowCalendar = Backbone.View.extend({
	template: JST["calendar/show"],
	render: function() {
	  this.$el.html(this.template())
		return this;
	}
})