Videos.attachSchema(new SimpleSchema({
  url: {
    type: String,
    label: 'External url',
    optional: true
  },
  vidFileUrl: {
    type: String,
    optional: true,
    autoValue: function(){

      var externalUrl = this.field('url'),
          _vidFileUrl = this.value;

      if ( typeof(_vidFileUrl) == 'undefined') {

        Meteor.call('videoUrl', externalUrl.value, function(err, res){
          if ( !err )
            _vidFileUrl = res;

        });
      }else{
        _vidFileUrl = this.value;
      }

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
    publicationName: 'video-has-one-category'
  }),
  created: {
   type: String,
   defaultValue: Date.now()
 },
  createdBy: orion.attribute('createdBy')
}));
