Sherpa.Views.CommentIndex = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, "add remove reset", this.render)
	},
	template: JST['comments/index'],
	events: {
		"click #new_message":"newMessage"
	},
	render: function() {
		debugger
		this.$el.html(this.template({comments: this.collection}))
		return this;
	},

	newMessage: function(event) {
		event.preventDefault();
		var newView = new Sherpa.Views.NewComment({
			parentOb: "project", parentOb_id: this.model.id, collection: this.collection
		})
		$(event.currentTarget).remove();
		this.$el.prepend(newView.render().$el);
	}

})