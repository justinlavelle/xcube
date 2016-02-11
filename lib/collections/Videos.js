Videos.attachSchema(new SimpleSchema({
  url: {
    type: String,
    label: 'External url',
    optional: true
  },
  vidFileUrl: {
    type: String,
    optional: true,
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
   type: Date,
   defaultValue: new Date()
 },
  createdBy: orion.attribute('createdBy')
}));
