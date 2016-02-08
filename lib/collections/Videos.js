Videos.attachSchema(new SimpleSchema({
  url: {
    type: String,
    label: 'External url',
    optional: true
  },
  vidFileUrl: {
    type: String,
    optional: true,
    autoValue: function() {

      var externalUrl = this.field('url');
      var _id = this.field('_id');

      if(!this.field('isRedtube'))
        return this.value;

      Meteor.call('getRedtubeVidUrl', externalUrl.value, function(err, res)
      {
        this.value = res;
        return res;
      });

      return this.value;
    }
  },
  isRedtube: {
    type: Boolean,
    label: 'It is an RedTube video ?'
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
