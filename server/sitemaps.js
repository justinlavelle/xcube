// Each theme have a page
// Each category have a page

sitemaps.add('/sitemap.xml', function()
{
	var out = [];
	var categories = Categories.find().fetch();

	_.each(categories, function(category)
	{
		out.push(
		{
			page: category.canonicalName
		});
	});

	var videos = Videos.find().fetch();

	_.each(videos, function(video)
	{
		var category = Categories.findOne(video.category);

		out.push(
		{
			page: '/p/' + video.canonicalName,
			videos: [
			{
				loc: video.vidFileUrl ? video.vidFileUrl : '',
				title: video.title,
				description: video.description,
				thumbnail_loc: video.image ? video.image.url : ''
			}],
			changefreq: 'hourly'
		});
	});

	return out;
});
