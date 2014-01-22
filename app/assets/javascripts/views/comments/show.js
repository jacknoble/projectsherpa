Sherpa.Views.ShowComment = Backbone.View.extend({
	template: JST['comments/show'],
	sub_template: JST['comments/sub'],
	events: {
		"hidden.bs.modal":"clearPath",
		"click #reply":"reply"
	},
	render: function(){
		if (this.model.get('commentable') === "Comment") {
			this.$el.html(this.sub_template({comment: this.model}))
		} else {
			this.$el.html(this.template({comment: this.model}));
			this.$('.modal-body').append;
		}
		var that = this
		this.model.get('comments').each(function(comment) {
			var sub = new Sherpa.Views.ShowComment({model: comment})
			var subDiv = "#subs_" + that.model.id
			that.$(subDiv).append(sub.render().$el)
		})
		return this;
	},

	reply: function(event){
		event.preventDefault();
		var replyView = new Sherpa.Views.NewComment({
			parentOb: "Comment",
			parentOb_id: this.model.id,
			collection: this.model.get('comments')
		})
		$(event.currentTarget).remove();
		this.$el.find('.modal-body').append(replyView.render().$el)
	},

	clearPath: function(event) {

	}
})