Sherpa.Views.UserShow = Backbone.View.extend({
	template: JST["users/show"],
	render: function(){
		$el.html(this.template({user: this.model, projects: this.collection}))
	}
})