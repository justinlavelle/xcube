function replaceAll(str, find, replace)
{
  return str.replace(new RegExp(find, 'g'), replace);
}

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
		video.vidFileUrl = replaceAll(video.vidFileUrl, '&', '&amp;');
		//var video.vidFileUrl = replaceAll(video.vidFileUrl, '?', '&#63;'); Is that really needed ?

		var o =
		{
			page: '/p/' + video.canonicalName,
			videos: [
			{
				loc: video.vidFileUrl ? video.vidFileUrl : '',
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
