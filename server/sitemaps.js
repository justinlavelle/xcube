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

		var o = {
			page: '/p/' + video.canonicalName,
			videos: [
			{
				loc: video.vidFileUrl ? video.vidFileUrl.replace('&', '&amp;').replace('?', '&#63;') : '',
				title: video.title,
				description: video.description.replace(/<(?:.|\n)*?>/gm, ''),
			}],
			changefreq: 'hourly'
		}

		if(video.image && video.image.url)
		{
			o.videos[0].thumbnail_loc = video.image.url;
		}

		out.push(o);

	});

	return out;
});
