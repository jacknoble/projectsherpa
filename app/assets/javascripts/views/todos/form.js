Sherpa.Views.TodoForm = Backbone.View.extend({
	initialize: function() {
		this.members = Sherpa.currentProject.get("team_members")
		var lists =  Sherpa.currentProject.get("todo_lists")
		var thisList = lists.get(this.model.get('todo_list_id'))
		this.collection = thisList.get("todo_list_items")
	},

	events: {
		"submit":"submit",
		"click button#delete":"delete"
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
		var todoData = data.todo_list_item
		var id = todoData.id
		var existingTodo = this.collection.get(id)
		var todo = (existingTodo || new Sherpa.Models.TodoListItem())
		var collection = this.collection;
		//bug, this doesn't immediately update todo
		todo.save(data.todo_list_item, {
			success: function(data) {
				collection.add(todo, {merge: true});
			},

			error: function(){
				console.log("please tell me if there was an error");
			}
		})
	},

	delete: function(event) {
		event.preventDefault();
		var todoId = $(event.currentTarget).data('id')
		var todo = this.collection.get(todoId)
		todo.destroy({
			success: function() {

			},

			error: function() {
				console.log("error in delete")
			}
		})
	}

})