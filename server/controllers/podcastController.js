const Podcast = require('../models/podcastModel');

exports.add = (req, res, next) => {
  const podcastObj = req.body;
  const podcast = new Podcast(podcastObj);

  podcast.save((saveErr) => {
    if (saveErr) { return next(saveErr); }
    res.status(201).json({ message: 'Podcast saved' });
  });
};
