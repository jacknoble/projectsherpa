Sherpa.Views.TodoFormShow = Backbone.View.extend({
	events: {
		"mouseover .toggleable":"toggleEditShow"
	},
	form_template: JST['todo_list_items/form'],
	show_template: JST['todo_list_items/show'],
	render: function(){
		if (this.model.id) {
			console.log(this.model.id)
			this.$el.html(this.form_template({
				todo: this.model,
				members: Sherpa.currentProject.get("team_members")
			}))
		} else {
			this.$el.html(this.show_template({
				todo: this.model,
				members: Sherpa.currentProject.get("team_members")
			}))
		}
		return this;
	}

})