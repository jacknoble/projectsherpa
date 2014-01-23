Sherpa.Views.ProjectIndex = Backbone.View.extend({
	template: JST["projects/list"],
	render: function() {
		this.$el.html(this.template({projects: this.collection}))
		this.$el.find('.project-square').droppable({
			drop: function(event, ui) {
				var $member = $(ui.draggable)
				var value = $member.text().replace(/\t*/, '')
				var $input = $(event.target)
				$input.val(value)
				var id = $member.data('id')
				var $id_field = $("#project_member_" + $input.data('id')+ "_id")
				$id_field.val(id)
				$input.focus()
				$(ui.draggable).remove()
			}
		})
		return this
	},

})