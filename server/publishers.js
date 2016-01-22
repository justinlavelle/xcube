Meteor.publish("videos", function(){
  return Videos.find({}, {sort: {created: -1}});
});

Meteor.publish("categories", function(){
	return Categories.find();
});

Meteor.publish("plugs", function(){
  return Plugs.find({}, {sort: {created: -1}});
});
