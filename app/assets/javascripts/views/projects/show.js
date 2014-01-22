Sherpa.Views.ShowProject = Backbone.View.extend({
	initialize: function(options) {
		this.tab = options.tab
	},

	template: JST["projects/show"],

	events: {
		"click a#todo-lists": "todos",
		"click a#discussion": "discussions",
		"click a#delete_project": "deleteProject"
	},

	render: function() {
		this.$el.html(this.template({
			project: this.model,
			members: this.model.get('team_members')
		}));

		if (this.tab) {
			this[this.tab]();
		}
		return this;
	},

	todos: function(event) {
		event && event.preventDefault();
		var todoListsIndex = new Sherpa.Views.TodoListIndex({
			collection: this.model.get('todo_lists'),
			team_members: this.model.get('team_members')
		});

		setTimeout(function() {
			this.$el.find('a#todo-lists').tab('show')
		}.bind(this), 0)

		this.$el.find('#todos').html(todoListsIndex.render().$el)
		Backbone.history.navigate("/projects/1/todos", {silent: true})
	},

	discussions: function(event) {
		event && event.preventDefault();
		var discIndex = new Sherpa.Views.CommentIndex({
			model: this.model,
			collection: this.model.get('comments')
		})
		this.$el.find('#discussions').html(discIndex.render().$el)
		setTimeout(function() {
			this.$el.find('a#discussion').tab('show')
		}.bind(this), 0)
		Backbone.history.navigate("/projects/1/discussions", {silent: true})
	},

	deleteProject: function(event) {
		event.preventDefault();
		this.model.destroy({
			success: Backbone.history.navigate("/", {trigger: true})
		})
	},


})