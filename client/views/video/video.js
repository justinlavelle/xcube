Template.video.helpers({
	video: function()
	{

		var video = Videos.findOne({canonicalName: FlowRouter.current().params.name});

		if(!video)
		{
			return FlowRouter.go('/404');
		}

		Session.set('vidFileUrl', video.vidFileUrl);

		vidUrlResponse(video);

		var seoTitle = video.title + ' video for ' + video.name;
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

		return video;
	},
	vidFileUrl: function(){
		return Session.get('vidFileUrl');
	}
});

Template.video.onCreated(function()
{
	this.subscribe('categories');
	this.subscribe('videos');
});

function vidUrlResponse(video) {
	Meteor.call('vidUrlChecker', video.vidFileUrl, function(err, res){
		if (err) {
			console.log(err);
			return false;
		}
	var sc = res.response.statusCode;

	// video file url is forbidden, lets get a new one
	if ( sc == 403 ) {
		getNewvidUrl(video._id, video.url)
	}

	});
}

// get new video url
function getNewvidUrl(_id, url) {
	console.log(url);
		Meteor.call('videoUrl', url, function(err, res){
			if ( err ) {
				console.log(err);
				return false;
			}

			Session.set('vidFileUrl', res);
			updateVidUrl(_id, res);

		});
}

// Update video url on db
function updateVidUrl(_id, url) {
	Videos.update(_id, {$set : {'vidFileUrl': url}});
}
