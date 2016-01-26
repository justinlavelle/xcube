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

	if (video) {
			vidUrlResponse(video);
	}

	var seoTitle = video.title;
	var seoDescription = $('<p>').html(video.description.slice(0, 155)).text();

	SEO.set(
	{
		title: seoTitle,
		description: seoDescription,
		meta:
		{
			'property="og:title"': seoTitle,
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
		return pageSession.get('vidFileUrl');
	}
});

Template.video.onCreated(function()
{
	this.subscribe('categories');
	this.subscribe('videos');
});

function vidUrlResponse(video) {

	Meteor.call('vidUrlChecker', video.vidFileUrl, function(err, res){
		if (res) {

			if (res.response.hasOwnProperty('statusCode')) {
				var sc = res.response.statusCode;

				// video file url is forbidden, lets get a new one
				if ( sc == 403 || sc == 400) {
					getNewvidUrl(video._id, video.url)
				}
			}
		}

	});
}

// get new video url
function getNewvidUrl(_id, url) {
		Meteor.call('videoUrl', url, function(err, res){
			if ( err ) {
				console.log(err);
				return false;
			}

			pageSession.set('vidFileUrl', res);
			updateVidUrl(_id, res);

		});
}

// Update video url on db
function updateVidUrl(_id, url) {
	Meteor.call('updateVidUrl', _id, {'vidFileUrl': url});
	//Videos.update(_id, {$set : {'vidFileUrl': url}});
}
