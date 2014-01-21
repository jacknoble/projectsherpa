window.Sherpa = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	initialize: function() {
		var $root = $('#content')
		if (CURRENT_USER !== null) {
			var user = Sherpa.user = new Sherpa.Models.User({id: CURRENT_USER})
			user.fetch({
				success: function(data) {
					var router = Sherpa.router = new Sherpa.Routers.Router({$rootEl: $root});
					Backbone.history.start();
				}
			})
		}
	}
}

$(function(){
	// Backbone.Collection.prototype.grab = function(id, callback) {
//
//     var collection = this;
// 		if (this.get(id)) {
//       var model = this.get(id).fetch({
// 				success: function() {
//
// 				}
// 			});
//       return model;
//     } else {
//     	model = new this.model({ id: id });
//       model.fetch({
//         success: function () { collection.add(model) }
//       });
//       return model;
//      }
// 	}

	Sherpa.initialize();
});