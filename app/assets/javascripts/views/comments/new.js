Sherpa.Views.NewComment = Backbone.View.extend({
	initialize: function(options) {
		this.parentOb = options.parentOb
		this.parentOb_id = options.parentOb_id
	},
	events: {
		"submit":"submitComment",
	},
	template: JST['comments/new'],
	render: function() {
		this.$el.html(this.template({
			parentOb: this.parentOb, parentOb_id: this.parentOb_id
		}))
		return this;
	},

	submitComment: function(event) {
		event.preventDefault();
		var commentData = $(event.target).serializeJSON();
		var comment = new Sherpa.Models.Comment(commentData.comment)
		var that = this
		comment.save({},{
			success: function() {
				that.collection.add(comment)
			},
			error: function() {
				console.log(arguments)
			}
		})
	}
})