Sherpa.Views.UserShow = Backbone.View.extend({
	initialize: function() {
		this.collection = this.model.get('projects')
		this.listenTo(this.collection, "add remove change:title reset", this.render)
	},
	template: JST["users/show"],
	events: {
		"click button#new_project":"newProject",

	},
	render: function() {

		this.$el.html(this.template({user: this.model, projects: this.collection}))
		return this;
	},

	newProject: function() {
		var newProjView = new Sherpa.Views.NewProject
		this.$el.append(newProjView.render().$el)
	}
})