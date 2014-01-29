Sherpa.Views.DocumentDiscussion = Backbone.View.extend({
	initialize: function() {
		this.collection = this.model.get('comments')
		this.listenTo(this.collection, 'add remove reset', this.render)
	},
	attributes: {
		class: "modal fade"
	},
	template: JST['comments/doc_discuss'],
	sub_template: JST['comments/sub'],
	events: {
		"click #reply":"reply"
	},
	render: function(){
		var modal= this.template({doc: this.model})
		this.$el.html(modal)
		var that = this
		this.collection.each(function(comment) {
			that.$('#comments').append(that.sub_template({comment: comment}))
		})
		return this;
	},

	reply: function(event){
		event.preventDefault();
		var replyView = new Sherpa.Views.NewComment({
			parentOb: "document",
			parentOb_id: this.model.id,
			collection: this.collection
		})
		$(event.currentTarget).remove();
		this.$el.find('.modal-body').append(replyView.render().$el)
	},
})

