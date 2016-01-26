var cheerio = Npm.require('cheerio'),
    Future = Npm.require( 'fibers/future' );
Meteor.methods({
  videoUrl: function(url) {

    if ( !ValidURL (url)) {
      return false;
    }

    result = Meteor.http.get(url);
    $ = cheerio.load(result.content);
    _body = $('.redtube-flv-player').find('video').find('source').attr('src');
    return _body;

  },
  vidUrlChecker: function(url){

    if ( !ValidURL (url)) {
      return false;
    }
      var future = new Future();

      HTTP.get( url, {}, function( err, res ) {
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
