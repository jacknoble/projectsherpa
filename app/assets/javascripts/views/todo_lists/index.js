Sherpa.Views.TodoListIndex = Backbone.View.extend({
	initialize: function(options) {
		this.listenTo(this.collection, "add remove change:title reset", this.render)
	},
	attributes: {
		class: ""
	},
	template: JST["todo_lists/index"],
	events: {
		"click button.new_todo_list":"newTodoListForm",
		"mouseover .toggleable":"toggleEdit",
		"mouseout .toggleable":"toggleShow"
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
		this.$el.prepend(newListView.render().$el)
	}
})