Sherpa.Views.TodoListIndex = Backbone.View.extend({
	template: JST['todo_list/index'],

	render: function () {
		this.$el.html(this.template({lists: this.collection}));
		return this;
	}
})