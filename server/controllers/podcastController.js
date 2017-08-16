const ObjectId = require('mongoose').Types.ObjectId;
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
