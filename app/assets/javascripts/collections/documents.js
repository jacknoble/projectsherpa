Sherpa.Collections.Documents = Backbone.Collection.extend({
	initialize: function(models, options) {
		this.projectId = options.projectId;
	},
	model: Sherpa.Models.Document,
	url: function(){
		return 'api/'+ this.projectId + '/documents';
	}
})

