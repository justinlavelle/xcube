var cheerio = Npm.require('cheerio');
Meteor.methods({
  videoUrl: function(url) {
    result = Meteor.http.get(url);
    $ = cheerio.load(result.content);
    //_body = $('.redtube-flv-player').find('video').html();
    _body = $('.redtube-flv-player').find('video').find('source').attr('src');
    return _body;
  },
  vidUrlChecker: function(url){

    var convertAsyncToSync  = Meteor.wrapAsync( HTTP.get ),
        resultOfAsyncToSync = convertAsyncToSync(url , {} );

      return resultOfAsyncToSync;
  }
});
