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
  console.log('a');
  _body = $('.redtube-flv-player').find('video').find('source').attr('src');
console.log('b');
  Videos.update(_id, {$set: { vidFileUrl: _body}});
  console.log('c');
  console.log('New URL set ! ' + _body);
}

Meteor.methods({
  videoUrl: videoUrl,
  vidUrlChecker: function(_id, url)
  {
    console.log(url);

    if (!ValidURL(url))
    {
      return false;
    }

    var res = request.headSync(url);
    
      if(!(res.response.statusCode === 200))
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
  }
});