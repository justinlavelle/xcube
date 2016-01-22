Plugs = new orion.collection('plugs', {
  tabular: {
    columns: [
      { data: "title", title: "Title" },
      orion.attributeColumn('image','image','Thumbnail'),
      { data: "url", title: "Url" },
      orion.attributeColumn('createdBy','createdBy','Created by'),
      orion.attributeColumn('hasOne','category','Category')
    ]
  }
});
