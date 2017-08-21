const ObjectId = require('mongoose').Types.ObjectId;
const parseString = require('xml2js').parseString;
const fetch = require('node-fetch');
const User = require('../models/userModel');

function fetchAllPodcasts(ids) {
  const urls = ids.map(collectionId => `https://itunes.apple.com/lookup?id=${collectionId}&entity=podcast`);
  return Promise.all(urls.map(url => fetch(url)))
    .then(resp => Promise.all(resp.map(r => r.json())));
}

exports.get = (req, res) => {
  const userId = req.decoded._id;
  User.findOne({ _id: ObjectId(userId) })
    .then((modelInstance) => {
      fetchAllPodcasts(modelInstance.subscribedIds).then((results) => {
        const arr = results.map(result => result.results);
        const podcasts = arr.reduce((a, b) => a.concat(b), []);
        res.status(200).json({ podcasts });
      });
    });
};

function addIdToEpisodes(index, collectionIds, episodes) {
  return episodes.map((object) => {
    object.collectionId = collectionIds[index]; //eslint-disable-line
    return object;
  });
}

exports.getFeed = (req, res) => {
  const feedUrls = req.body.metaEpisodes.map(e => e.feedUrl);
  const collectionIds = req.body.metaEpisodes.map(e => e.collectionId);
  Promise.all(feedUrls.map(url => fetch(url)))
    .then(resp => Promise.all(resp.map(r => r.text())))
    .then((results) => {
      let episodes = [];
      results.forEach((xmlString, index) => {
        parseString(xmlString, (err, result) => {
          let episodesObjects = result.rss.channel[0].item.slice(1, 5);
          episodesObjects = addIdToEpisodes(index, collectionIds, episodesObjects);
          episodes = episodes.concat(episodesObjects);
        });
      });
      const sortedEpisodes = episodes.sort(e => Date.parse(e.pubDate[0]));
      res.status(200).json({ episodes: sortedEpisodes });
    });
};

exports.getEpisodes = (req, res) => {
  const collectionId = req.body.metaEpisode.collectionId;
  const feedUrl = req.body.metaEpisode.feedUrl;
  fetch(feedUrl)
    .then(resp => resp.text())
    .then((xmlString) => {
      parseString(xmlString, (err, result) => {
        let episodesObjects = result.rss.channel[0].item.slice(1, 5);
        episodesObjects = addIdToEpisodes(0, [collectionId], episodesObjects);
        res.status(200).json({ episodes: episodesObjects });
      });
    });
};
