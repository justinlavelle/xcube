var cheerio = Npm.require('cheerio');
Meteor.methods({
videoUrl: function(url) {
  result = Meteor.http.get(url);
  $ = cheerio.load(result.content);
  _body = $('.popup-embed-code').find('iframe').attr('src');
  return _body;
    }
});

// var cheerio = Npm.require('cheerio');
//
// var Xhamster = function(url) {
//  this.url = url;
//
//  try {
//    this.content = HTTP.get(url).content;
//
//    this.$ = cheerio.load(this.content);
//  } catch (error) {
//    console.log(error);
//    throw error;
//    //throw new Meteor.Error(errorObject.error_code, errorObject.error_message);
//  }
// };
//
// Xhamster.prototype.getData = function() {
//  var data = {
//    title: this.$('title').text(),
//    description: this.$('meta[name=description]').attr('content'),
//    videoUrl: this.$('video').attr('file'),
//    thumbnailUrl: this.$('video').attr('poster'),
//  };
//
//  return data;
// };
