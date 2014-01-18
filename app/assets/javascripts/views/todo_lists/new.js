Sherpa.Views.NewTodoList = Backbone.View.extend({
	template: JST["todo_lists/new"],
	render: function() {
		this.$el.html(this.template());
		return this;
	}
})