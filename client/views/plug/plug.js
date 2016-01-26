Template.plug.helpers({
	plug: function() {
		var cat = Categories.findOne({name: FlowRouter.current().params.category});

		if(!cat)
		{
			return FlowRouter.go('/404');
		}

		var plug = Plugs.findOne({category: cat._id, title: FlowRouter.current().params.title});

		if(!plug)
		{
			return FlowRouter.go('/404');
		}

		return plug;
	}
});
