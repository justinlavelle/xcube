Videos.attachSchema(new SimpleSchema({
  url: {
    type: String,
    label: 'External url',
    optional: true
  },
  vidFileUrl: {
    type: String,
    defaultValue: 'This is auto generated',
    autoValue: function(){

      var _vidFileUrl = 'This is auto generated',
          externalUrl = this.field('url');

      if ( this.value === _vidFileUrl) {
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
    publicationName: 'theme-has-one-category'
  }),
  created: {
   type: String,
   defaultValue: Date.now()
 },
  createdBy: orion.attribute('createdBy')
}));
