Template.video.helpers(
{
	video: function()
	{
		var video = Videos.findOne({ canonicalName: FlowRouter.current().params.name });

		if(!video)
			return FlowRouter.go('/404');

		return video;
	},
	videoReady: function()
	{
		return Session.get('videoReady');
	}
});

Template.video.onRendered(function()
{
	var i = setInterval(function()
	{
		var player = $('#video-player');

		if(player.prop('networkState') > 0)
		{
			Session.set('videoReady', true);
			clearInterval(i);
			console.log('ok!');
		}
	}, 50);
});

Template.video.onCreated(function()
{
	Session.set('videoReady', false);
	var self = this;

	self.autorun(function()
	{
		self.subscribe('categories');
		self.subscribe('videos');
	});

	self.autorun(function()
	{

		if(!Template.instance().subscriptionsReady())
			return;

		var video = Videos.findOne({ canonicalName: FlowRouter.current().params.name });

		if(video.isRedtube)
			vidUrlResponse(video);

		var seoTitle = video.title;
		var seoDescription = $('<p>').html(video.description.slice(0, 155)).text();

		SEO.set(
		{
			title: seoTitle,
			description: seoDescription,
			meta:
			{
				'property="og:title"': seoTitle.slice(0, 54),
				'property="og:description"': seoDescription,
				'property="og:url"': FlowRouter.url(FlowRouter.current().path),
				'property="og:image"': video.image ? FlowRouter.url(video.image.url) : ''
			}
		});
	});
});

function vidUrlResponse(video) {

	Meteor.call('vidUrlChecker', video._id, video.vidFileUrl, function(err, res){
	});
}
