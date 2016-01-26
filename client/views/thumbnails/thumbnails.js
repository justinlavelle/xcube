var videos = [];

Template.thumbnails.onRendered( function() {

  videos = Videos.find({}, {sort: {created: -1}}).fetch();


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
});

Template.thumbnails.helpers(
{
  videos: function() {
    var videos = Videos.find({}, {sort: {created: -1}}).fetch();
    return videos;
  }
});

Template.plugs.helpers({
  plugs: function(){
    var plugs = Plugs.find({}, {sort: {created: -1}}).fetch();

    return plugs;
  }
});
