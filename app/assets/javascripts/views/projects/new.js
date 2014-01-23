Sherpa.Views.NewProject = Backbone.View.extend({

	events: {
		"submit form#new_project_form" : "submit",
		"focus .member_form": "checkIfFilled",
		"keyup .member_form": "checkForNameMatch"
	},

	template: JST['projects/new'],
	tm_template: JST['projects/new_tm'],

	render: function() {
		this.$el.html(this.template())
		var that = this
		_(3).times(function(){
			that.newMemberInput();
		})
		return this
	},

	submit: function(event) {
		event.preventDefault();
		var $parsedData = $(event.target).serializeJSON();
		var newProject = new Sherpa.Models.Project($parsedData)
		newProject.set('team_members')
		newProject.save({}, {
			success: function(model) {
				Sherpa.user.get("projects").add(newProject)
				Sherpa.currentProject = model
				Backbone.history.navigate('projects/' + newProject.get("id"),
					{trigger: true}
				)
			}
		})
	},

	newMemberInput: function() {
		var memberForms = this.$('.member_form')
		if (memberForms.length === 0){
			var count = 0
		} else {
			var count = $(memberForms.last()).data('id') + 1
		}
		var $tmForm = $(this.tm_template({
			memberCount: count, employees: this.collection
		}))
		var $submitButton = this.$('#submit_button');
		$tmForm.insertBefore($submitButton);
		$tmForm.droppable({
			drop: function(event, ui) {
				var $member = $(ui.draggable)
				var value = $member.text()
				var $input = $(event.target)
				$input.val(value)
				var id = $member.data('id')
				var $id_field = $("#project_member_" + $input.data('id')+ "_id")
				$id_field.val(id)
				$input.focus()
				$(ui.draggable).remove()
			}
		})
	},

	checkIfFilled: function(event){
		var allFilled = true
		var inputId = $(event.target).data('id')
		var memberInputs = $('.member_form')
		memberInputs.each(function(index) {
			var $membInput = $(memberInputs[index])
			if ($membInput.val() === '' && $membInput.data('id') !== inputId) {
				allFilled = false;
			}
		})

		return (allFilled) ? this.newMemberInput() : null
	},

	checkForNameMatch: function(event) {
		var nameRE = /^\s*([a-zA-Z]*)\s*([a-zA-Z]*)/
		var $memberInput = $(event.target)
		var name = $memberInput.val().match(nameRE)
		this.collection.forEach(function(employee) {
			if (employee.get('fname') === name[1] && employee.get('lname') ===name[2]) {
				var $id_field = $("#project_member_" + $memberInput.data('id')+ "_id")
				$id_field.val(employee.get('id'))
			}
		})
	}
})