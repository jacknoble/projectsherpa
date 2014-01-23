Sherpa.Models.Document = Backbone.Model.extend({
	initialize: function() {
	},
	sync: function(method, model, options) {
		options = options || {};
		options.url = model.methodToURL(method.toLowerCase());
		return Backbone.sync.apply(this, arguments);
	},

	methodToURL: function(method) {
		if (method === 'create') {
			return "/api/projects/" + this.get('project_id') + "/documents";
		} else {
			return "/api/documents/" + this.get('id');
		}
	},

	parse: function(data) {
		var comments = new Sherpa.Collections.DocumentComments(
			data.comments,
			{docID: data.id}
		)
		data.comments = comments
		return data
	}
})