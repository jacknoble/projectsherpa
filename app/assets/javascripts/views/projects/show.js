Sherpa.Views.ShowProject = Backbone.View.extend({
	initialize: function(options) {
		this.tab = options.tab
	},

	template: JST["projects/show"],
	deleteTemplate: JST["projects/delete_confirmation"],

	events: {
		"click a#todo-lists-tab": "todos",
		"click a#discussions-tab": "discussions",
		"click a#delete_project": "confirmDelete",
		"click a#documents-tab":"documents",
		"click #btnYes":"deleteProject"
		// "click #description": "editDescription"
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
	//
	// editDescription: function(event) {
	// 	event.preventDefault
	// 	$form = $(<input)
	// },

	todos: function(event) {
		event && event.preventDefault();
		var todoListsIndex = new Sherpa.Views.TodoListIndex({
			collection: this.model.get('todo_lists'),
			team_members: this.model.get('team_members')
		});
		this.$el.find('#todos').html(todoListsIndex.render().$el)
		setTimeout(function() {
			this.$el.find('a#todo-lists-tab').tab('show')
		}.bind(this), 0)
		var path = "/projects/" + this.model.id +"/todos"
		Backbone.history.navigate(path, {silent: true})
	},

	discussions: function(event) {
		event && event.preventDefault();
		var discIndex = new Sherpa.Views.CommentIndex({
			model: this.model,
			collection: this.model.get('comments')
		})
		this.$el.find('#discussions').html(discIndex.render().$el)
		setTimeout(function() {
			this.$el.find('a#discussions-tab').tab('show')
		}.bind(this), 0)
		var path = "/projects/" + this.model.id +"/discussions"
		Backbone.history.navigate(path, {silent: true})
	},

	documents: function(event) {
		event && event.preventDefault();
		var docIndex = new Sherpa.Views.DocumentIndex({
			model: this.model,
			collection: this.model.get('documents')
		})
		this.$el.find('#documents').html(docIndex.render().$el)
		setTimeout(function() {
			this.$el.find('a#documents-tab').tab('show')
		}.bind(this), 0)
		var path = "/projects/" + this.model.id +"/documents"
		Backbone.history.navigate(path, {silent: true})
	},

	deleteProject: function(event) {
		event.preventDefault();

		this.model.destroy({
			success: function(){
				$('body').removeClass('modal-open');
				$('.modal-backdrop').remove();
				Backbone.history.navigate("/", {trigger: true})
			} 
		})
	},

	confirmDelete: function(event) {
		event.preventDefault();
		this.$el.append(this.deleteTemplate)
		this.$el.find("#modal-dialog").modal();
		this.$el.on('hide.bs.modal', function(e) {
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
		})
	}


})