Sherpa.Views.TodoListIndex = Backbone.View.extend({
	initialize: function(options) {

	},
	attributes: {
		class: ""
	},
	template: JST["todo_lists/index"],
	events: {
		"click button.new_todo_list":"newTodoListForm",
	},
	render: function () {
		this.$el.html(this.template())
		var that = this;
		this.collection.each(function (todo_list) {
			var listView = new Sherpa.Views.ShowTodoList({model: todo_list})
			that.$el.append(listView.render().$el)
		})
		return this;
	},

	newTodoListForm: function() {
		var newListView = new Sherpa.Views.NewTodoList({
			collection: this.team_members
		})
		console.log(this)
		this.$el.prepend(newListView.render().$el)
	}
})