Sherpa.Views.ShowComment = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.model.get('comments'), 'add remove reset', this.render)
	},
	template: JST['comments/show'],
	sub_template: JST['comments/sub'],
	events: {
		"hidden.bs.modal":"clearPath",
		"click #reply":"reply"
	},
	render: function(){
		this.$el.html(this.template({comment: this.model}))
		var that = this
		this.model.get('comments').each(function(comment) {
			that.$('#subs').append(that.sub_template({comment: comment}))
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
})