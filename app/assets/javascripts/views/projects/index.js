Sherpa.Views.ProjectIndex = Backbone.View.extend({
	template: JST["projects/list"],
	render: function() {
		this.$el.html(this.template({projects: this.collection}))
		var that = this;
		this.$el.find('.sherpa-square').droppable({
			drop: function(event, ui) {
				var memberId = $(ui.draggable).data('id')
				var projectId = $(event.target).data('id')
				project = that.collection.get(projectId)
				project.get('team_members').add({id: memberId})
				$(ui.draggable).remove()
				project.save({
					success: function() {
					}
				})
			}
		})
		return this;
	},

})