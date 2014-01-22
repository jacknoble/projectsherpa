Sherpa.Models.Comment = Backbone.Model.extend({
	urlRoot: 'api/comments',

	parse: function(data) {
		var comments = new Sherpa.Collections.Comments(data.comments, {parse: true})
		data.comments = comments
		return data
	}

})