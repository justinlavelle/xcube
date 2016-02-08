var pageSession = new ReactiveDict();

Template.video.onRendered( function() {

	this.subscribe('categories');
	this.subscribe('videos');

	var video = Videos.findOne({canonicalName: FlowRouter.current().params.name});

	pageSession.set('video', video);

	if(!video)
	{
		return FlowRouter.go('/404');
	}

	pageSession.set('vidFileUrl', video.vidFileUrl);

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
Template.video.helpers({
	video: function() {
		return pageSession.get('video');
	},
	vidFileUrl: function(){
		return Videos.findOne({canonicalName: FlowRouter.current().params.name}).vidFileUrl;
	}
});

Template.video.onCreated(function()
{
	this.subscribe('categories');
	this.subscribe('videos');
});

function vidUrlResponse(video) {

	Meteor.call('vidUrlChecker', video._id, video.vidFileUrl, function(err, res){
	});
}
