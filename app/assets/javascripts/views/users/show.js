Sherpa.Views.UserShow = Backbone.View.extend({
	initialize: function() {
		this.collection = this.model.get('projects');
		this.listenTo(this.collection, "add remove change:title reset", this.render);
		this._leftBumper = "index"
	},
	template: JST["users/show"],
	proj_list_temp: JST["projects/list"],
	events: {
		"click button#new_project":"toggleLeftBumper",
		"click button#cancel_project":"toggleLeftBumper"

	},
	render: function() {
		this.$el.html(this.template({user: this.model}))
		var indexView = new Sherpa.Views.ProjectIndex({
			collection: this.collection
		});
		this.renderRightBumper()
		this.$('#left_bumper').html(indexView.render().$el)
		return this;
	},


	toggleLeftBumper: function(event) {
		event.preventDefault();
		var $leftBumper = this.$('#left_bumper')
		if (this._leftBumper === "index") {
			var newProjView = new Sherpa.Views.NewProject({
				collection: this.model.get("company").get("employees")
			});
			this._leftBumper = "new_project"
			$leftBumper.html(newProjView.render().$el)
		} else {
			var indexView = new Sherpa.Views.ProjectIndex({
				collection: this.collection
			});
			this._leftBumper = "index"
			$leftBumper.html(indexView.render().$el)
			this.renderRightBumper()
		}
	},

	renderRightBumper: function() {
		var employeeIndex = new Sherpa.Views.EmployeeIndex({model: this.model})
		this.$('#right_bumper').html(employeeIndex.render().$el)
	}

})