Themes.attachSchema(new SimpleSchema({
  url: {
    type: String,
    label: 'External url',
    optional: false
  },
  vidFileUrl: {
    type: String,
    defaultValue: 'This is auto generated',
    autoValue: function(){
      var externalUrl = this.field("url");
      var _vidFileUrl = '';
      Meteor.call('videoUrl', externalUrl.value, function(err, res){
        if ( !err ) {
          _vidFileUrl = res.split('&')[0];
        }
      });
      return _vidFileUrl;
    }
  },
  title: {
    type: String
  },
  canonicalName: {
    type: String,
    label: 'Canonical name',
    optional: false
  },
  image: orion.attribute('image', {
    label: 'Image',
    optional: true
  }),
  description: orion.attribute('summernote', {
    type: 'Text',
    label: 'Description',
    optional: false
  }),
  category : orion.attribute('hasOne',{
    label: 'Category'
  },{
    collection: Categories,
    titleField: 'name',
    publicationName: 'theme-has-one-category'
  }),

  createdBy: orion.attribute('createdBy')
}));
