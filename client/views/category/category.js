Template.category.helpers(
{
	videos: function()
	{
		var cat = Categories.findOne({canonicalName: FlowRouter.current().params.category});

		if(!cat)
			return FlowRouter.go('/404');

		var videos = Videos.find({category: cat._id});
		return videos;
		console.log(videos);
	},
	categoryName: function()
	{
		return Categories.findOne({canonicalName: FlowRouter.current().params.category}).name;
	}
});

Template.category.onCreated(function()
{
	this.subscribe('Categories');
	this.subscribe('Videos');
});
