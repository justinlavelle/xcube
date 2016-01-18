var cheerio = Npm.require('cheerio');
Meteor.methods({
  videoUrl: function(url) {
    result = Meteor.http.get(url);
    $ = cheerio.load(result.content);
    _body = $('.popup-embed-code').find('iframe').attr('src');
    return _body;
  }
});
