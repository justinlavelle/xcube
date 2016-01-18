Themes = new orion.collection('themes', {
  tabular: {
    columns: [
      { data: "title", title: "Title" },
      orion.attributeColumn('image','image','Thumbnail'),
      {data: 'vidFileUrl', title: 'Video file url'},
      orion.attributeColumn('createdBy','createdBy','Created by'),
      orion.attributeColumn('hasOne','category','Category')
    ]
  }
});
