Sherpa.Views.ShowTodo = Backbone.View.extend({
	template: JST['todo_list_items/show'],
	attributes: {
		class: "toggle-edit",
	},
	render: function (){
		this.$el.html(this.template({todo: this.model}));
		this.$el.attr('data-id', this.model.id)
		return this
	}
})

