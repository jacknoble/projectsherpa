Sherpa.Views.UserShow = Backbone.View.extend({
	initialize: function() {
		this.collection = this.model.get('projects');
		this.listenTo(this.collection, "add remove change:title reset", this.render);
		this.listenTo(this.model, 'change:photo_url', this.render)
		this._leftBumper = "index"
	},
	template: JST["users/show"],
	proj_list_temp: JST["projects/list"],
	events: {
		"click button#new_project":"toggleLeftBumper",
		"click button#cancel_project":"toggleLeftBumper"
	},
	render: function() {
		var that = this
		this.$el.html(this.template({user: this.model}))
		var msg;
		if (this.model.get('photo')) {
			msg = "drop or click to change your photo"
		} else {
			msg = "No photo, drop one here ... or click"
		}
		this.$el.find('.dropzone').dropzone({
			dictDefaultMessage: msg,
			paramName: "user[photo]",
			method: "put",
			sending: function(file, xhr, formData) {
				xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
			},

			success: function(file, resp) {
				that.model.set({photo: resp.photo_url})
				debugger
			}
		})
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