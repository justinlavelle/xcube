Plugs.attachSchema(new SimpleSchema({

  title: {
    type: String
  },
  image: orion.attribute('image', {
    label: 'Image',
    optional: true
  }),
  url: {
    type: String,
    label: 'External url',
    optional: true
  },
  category : orion.attribute('hasOne',{
    label: 'Category'
  },{
    collection: Categories,
    titleField: 'name',
    publicationName: 'plug-has-one-category'
  }),
  created: {
   type: Date,
   defaultValue: new Date()
 },
  createdBy: orion.attribute('createdBy')
}));
