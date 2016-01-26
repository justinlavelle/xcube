//
// Template.plug.onRendered( function (){
// 	this.subscribe('categories');
// 	this.subscribe('plugs');
// });
//
// Template.plug.helpers({
// 	plug: function() {
// 		var cat = Categories.findOne({name: FlowRouter.current().params.category});
// 		if(!cat)
// 		{
// 			return FlowRouter.go('/404');
// 		}
//
// 		var plug = Plugs.findOne({category: cat._id, title: FlowRouter.current().params.title});
// 		console.log(plug);
// 		if(!plug)
// 		{
// 			return FlowRouter.go('/404');
// 		}
//
// 		return plug;
// 	}
// });
