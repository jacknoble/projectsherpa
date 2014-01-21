Sherpa.Views.ShowCalendar = Backbone.View.extend({
	render: function() {
	  this.$el.fullCalendar({
			events: '/api/events'
		})
		return this;
	}
})