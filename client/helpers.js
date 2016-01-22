UI.registerHelper('getCategoryFromId', function(_id)
{
	if(!_id)
		return;

	var cat = Categories.findOne(_id);

	if(!cat)
		return;

	return cat.name;
});

UI.registerHelper('pageUrl', function()
{
	return FlowRouter.url(FlowRouter.current().path);
});

shorterText = function(text)
{
    text = $('<p>').html(text).text(); //Removing all HTML tags
    return text.slice(0, 100) + '...';
}

UI.registerHelper('shorterText', function(text)
{
	return shorterText(text);
});

UI.registerHelper('videoDescription', function(Id, slice)
{
	var video = Videos.findOne(Id);
	var desc = $('<p>').html(video.description).text(); //Removing all HTML tags
	return (slice) ? desc.slice(0, 100) + '...' : desc;
});
