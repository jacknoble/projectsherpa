Sherpa.Views.NewProject = Backbone.View.extend({

	events: {
		"submit form#new_project_form" : "submit",
		"focus .member_form": "checkIfFilled"
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
		newProject.save({}, {
			success: function() {
				Sherpa.user.get("projects").add(newProject)
			}
		})
	},

	getEmployeeNames: function() {
		var names = []
		this.collection.each (function (employee) {
			var name = employee.get('fname') + " " + employee.get('lname')
			names.push(name)
		})
		this.employeeNames = names
		return names
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
		var $submitButton = this.$('#submit_button')
		$tmForm.insertBefore($submitButton)
		this.$('.member_form').last().autocomplete({
			source: this.employeeNames || this.getEmployeeNames(),
		  messages: { noResults: '', results: function() {} }
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
	}
})