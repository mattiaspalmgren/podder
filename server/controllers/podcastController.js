const ObjectId = require('mongoose').Types.ObjectId;
const parseString = require('xml2js').parseString;
const fetch = require('node-fetch');

const User = require('../models/userModel');

function fetchAll(ids) {
  const urls = ids.map(collectionId => `https://itunes.apple.com/lookup?id=${collectionId}&entity=podcast`);
  return Promise.all(urls.map(url => fetch(url)))
    .then(resp => Promise.all(resp.map(r => r.json())));
}

exports.get = (req, res) => {
  const userId = req.decoded._id;
  User.findOne({ _id: ObjectId(userId) })
    .then((modelInstance) => {
      fetchAll(modelInstance.subscribedIds).then((results) => {
        const arr = results.map(result => result.results);
        const podcasts = arr.reduce((a, b) => a.concat(b), []);
        res.status(200).json({ podcasts });
      });
    });
};

exports.getFeed = (req, res) => {
  const feedUrls = req.body.feedUrls;
  Promise.all(feedUrls.map(url => fetch(url)))
    .then(resp => Promise.all(resp.map(r => r.text())))
    .then((results) => {
      let episodes = [];
      results.forEach((xmlString) => {
        parseString(xmlString, (err, result) => {
          const episodesObjects = result.rss.channel[0].item.slice(1, 5);
          episodes = episodes.concat(episodesObjects);
        });
      });
      const sortedEpisodes = episodes.sort(e => Date.parse(e.pubDate[0]));
      res.status(200).json({ episodes: sortedEpisodes });
    });
};
