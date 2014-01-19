Sherpa.Views.TodoForm = Backbone.View.extend({
	initialize: function() {
		this.members = Sherpa.currentProject.get("team_members")

	},

	events: {
		"submit":"submit"
	},

	template: JST['todo_list_items/form'],

	render: function(){
		this.$el.html(this.template({
			todo: this.model,
			members: Sherpa.currentProject.get("team_members")
		}));
		this.$el.data('id', this.model.id);
		return this;
	},

	submit: function(event) {
		event.preventDefault();
		var data = $(event.target).serializeJSON()
		var id = data.todo_list_item.todo_list_id
		var list = Sherpa.currentProject.get("todo_lists").get(id)
		list.get('todo_list_items').add(data)
		var newTodo = new Sherpa.Models.TodoListItem(data)
		newTodo.save({}, {
			success: function() {
				list.get('todo_list_items').add(newTodo)
			},

			error: function(){
				console.log("please tell me if there was an error")
			}
		})
	}

})