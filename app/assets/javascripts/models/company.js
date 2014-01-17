Sherpa.Models.Company = Backbone.Model.extend({
	parse: function(data) {
		console.log(data.employees)
		var employees = new Sherpa.Collections.Employees(data.employees)
		data.employees = employees
		console.log(employees)
		return data
	}
})