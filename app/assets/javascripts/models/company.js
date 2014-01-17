Sherpa.Models.Company = Backbone.Model.extend({
	parse: function(data) {
		var employees = new Sherpa.Collections.Employees(data.employees, {
			parse: true
		});
		data.employees = employees;
		return data
	}
})