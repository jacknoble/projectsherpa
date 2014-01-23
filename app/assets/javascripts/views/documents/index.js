Sherpa.Views.DocumentIndex = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, "add remove reset", this.render);
	},
	template: JST['documents/index'],

	events: {
		"click button#delete":"deleteDoc"
	},

	render: function() {
		this.$el.html(this.template({
			documents: this.collection,
			project: this.model
		}))
		var that = this;
		this.$el.find('.dropzone').dropzone({
			dictDefaultMessage: "Drag your file here. Or click to upload.",
			paramName: "document[file]",
			sending: function(file, xhr, formData) {
				xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
			},

			success: function(file, resp) {
				that.collection.add(resp);
			}
		})
		return this;
	},

	deleteDoc: function(event) {
		event.preventDefault();
		var id = $(event.currentTarget).data('id')
		var doc = this.collection.get(id)
		doc.destroy({
			success: function(){

			}
		})
	}
})