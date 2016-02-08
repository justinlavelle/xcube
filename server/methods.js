function videoUrl(url)
{
    if (!ValidURL(url))
    {
      return false;
    }

    Meteor.http.get(url, function(err, response)
    {
      $ = cheerio.load(response.content);
      _body = $('.redtube-flv-player').find('video').find('source').attr('src');
      return _body;
    });
}

function getNewvidUrl(_id) 
{
  var vid = Videos.findOne(_id);
  var body = request.getSync(vid.url);
    
  $ = cheerio.load(body.body);
  _body = $('.redtube-flv-player').find('video').find('source').attr('src');
  Videos.update(_id, {$set: { vidFileUrl: _body}});
}

Meteor.methods({
  videoUrl: videoUrl,
  vidUrlChecker: function(_id, url)
  {
    console.log(url);

    if(ValidURL(url))
      var res = request.headSync(url);
    
    if(!res || !(res.response.statusCode === 200))
    {
      getNewvidUrl(_id);
    }
    else
    {
      console.log('video still exist');
      console.log(res.response.statusCode);
    }
  },
  updateVidUrl: function(_id, val){
    if(_id)
      Videos.update(_id, {$set : val});
  },
  getRedtubeVidUrl: function(url)
  {
    var body = request.getSync(url);
    
    $ = cheerio.load(body.body);
    _body = $('.redtube-flv-player').find('video').find('source').attr('src');
    return _body;
  }
});