Sherpa.Views.ShowCalendar = Backbone.View.extend({
	render: function() {
	  this.$el.fullCalendar({
			// put your options and callbacks here
		})
		return this;
	}
})