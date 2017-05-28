import request from 'request';

const getLatestPodcasts = () => { 
  request('https://itunes.apple.com/search?media=podcast&limit=30&entity=podcast&term="Podcast"', (error, response, body) => {
    let podcasts;
    if (!error && response.statusCode == 200) {
      const res = JSON.parse(body)
      podcasts = res.results.map((podcast) => {
        return {
          artistName: podcast.artistName,
          artistViewUrl: podcast.artistViewUrl,
          artworkUrl: podcast.artworkUrl100,
          genres: podcast.genres
        };
      });
    }
    
    podcasts.forEach((podcast) => {
      request.post({
        headers: {'content-type' : 'application/json'},
        json: true,
        url:     'http://localhost:8080/podcasts',
        body:    podcast
      }, (error, response, body) => {
        console.log(error, response, body);
      });
    })
  })
};

export { getLatestPodcasts };