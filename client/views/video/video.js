Template.video.helpers({
	video: function()
	{
		var cat = Categories.findOne({canonicalName: FlowRouter.current().params.category});

		if(!cat)
		{
			return FlowRouter.go('/404');
		}

		var video = Videos.findOne({category: cat._id, canonicalName: FlowRouter.current().params.name});

		if(!video)
		{
			return FlowRouter.go('/404');
		}

		var seoTitle = video.title + ' video for ' + cat.name;
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
	}
});

Template.video.onCreated(function()
{
	this.subscribe('categories');
	this.subscribe('videos');
	console.log('created');
	// Meteor.call('vidUrlChecker', 'http://vida.lsw.redtubefiles.com/videos/0001427/_mp4/1427621.mp4?st=YOLUwNb-34B8-d0OBAlKQQ&e=1453307364', function( err, res){
	// 	if (err) {
	// 		console.log(err);
	// 	}else{
	// 		console.log(res);
	// 	}
	// });
	Meteor.call('vidUrlChecker', 'http://vida.lsw.redtubefiles.com/videos/0001427/_mp4/1427621.mp4?st=DQhtebVOtDa5eNpphdWrVw&e=1453308153', function( err, res){
		if (err) {
			console.log(err);
		}else{
			console.log(res);
		}
	});
});

function errorVid(ele){
	console.log('ele');
}
