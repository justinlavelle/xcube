var cheerio = Npm.require('cheerio'),
    Future = Npm.require( 'fibers/future' );
Meteor.methods({
  videoUrl: function(url) {
    result = Meteor.http.get(url);
    $ = cheerio.load(result.content);
    //_body = $('.redtube-flv-player').find('video').html();
    _body = $('.redtube-flv-player').find('video').find('source').attr('src');
    return _body;
  },
  vidUrlChecker: function(url){

    var future = new Future();

    HTTP.get( 'http://www.checkupdown.com/accounts/grpb/B1394343/', {}, function( err, res ) {
      if ( err ) {
        future.return( err );
      } else {
        future.return( res);
      }
    });

    return future.wait();

  },
  updateVidUrl: function(_id, val){
    if(_id)
      Videos.update(_id, {$set : val});
  }
});
