Template.thumbnails.helpers(
{
  videos: function()
  {
    var videos = Videos.find({});

    SEO.set(
    {
      title: orion.dictionary.get('seo.title'),
      description: orion.dictionary.get('seo.description'),
      meta:
      {
        'property="og:type"': 'website',
        'property="og:title"': orion.dictionary.get('seo.title'),
        'property="og:description"': orion.dictionary.get('seo.description'),
        'property="og:url"': FlowRouter.url(''),
        'property="og:image"': FlowRouter.url('themia-og.png') //OG IMAGE HERE
      }
    });

    return videos;
  },
  'videoDescription': function(Id)
  {
    var video = Videos.findOne(Id);
    var desc = $('<p>').html(video.description).text(); //Removing all HTML tags
    return desc.slice(0, 100) + '...';
  }
});

Template.thumbnails.onCreated(function()
{
  this.subscribe('videos');
  this.subscribe('categories');
});
