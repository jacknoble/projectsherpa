Sherpa.Views.TodoListIndex = Backbone.View.extend({
	initialize: function(options) {
		this.listenTo(this.collection, "add remove change:title reset", this.render)
	},

	template: JST["todo_lists/index"],
	events: {
		"click button.new_todo_list":"newTodoListForm",
	},
	render: function () {
		this.$el.html(this.template())
		var that = this;
		var lastId = this.collection.last().id
		var $div = $('<div>')
		var showEachList = function(list, callback){
		 	var listView = new Sherpa.Views.ShowTodoList({model: list})
		 	$div.append(listView.render().$el)
 			if (list.id === lastId){
 				return callback($div);
 			}
		}
		showEachList.bind(this)

		this.collection.each(function(list) {
			showEachList(list, function(div){
				this.$el = div;
			})
		});
	},

	newTodoListForm: function() {
		var newListView = new Sherpa.Views.NewTodoList({
			collection: this.team_members
		})
		this.$el.prepend(newListView.render().$el)
	}
})