import Podcast from '../models/podcast';

const getPodcasts = (req, res) => {
  Podcast.find(null, null, { sort: { name : 1 } }, (err, podcasts) => {
    if (err) {
      res.send(err);
    }
    res.json(podcasts);
  });
};

const postPodcast = (req, res) => {
  let podcast = Object.assign(new Podcast(), req.body);
  podcast.save(err => {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'podcast created' });
  });
};

export { getPodcasts, postPodcast };