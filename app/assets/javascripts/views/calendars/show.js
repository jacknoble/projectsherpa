Sherpa.Views.ShowCalendar = Backbone.View.extend({
	render: function() {
	  this.$el.fullCalendar({
			events: '/api/events',
			editable: true,
			eventStartEditable: true,
			eventDrop: function(eventData) {
				console.log(eventData.id)
				var event = Sherpa.Collections.todos.get(eventData.id);
				event.save({deadline: eventData.start}, {
					success: function(){
						console.log("success!")
					}
				})
			}
		})
		return this;
	}
})