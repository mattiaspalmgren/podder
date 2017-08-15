const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/userModel');

function setUserInfo(request) {
  return {
    _id: request._id,
    email: request.email,
    subscribedIds: request.subscribedIds,
  };
}

function accknowledge(res, modelInstance) {
  res.status(200).json({ user: setUserInfo(modelInstance) });
}

function updateValue(prevValue, nextValue) {
  if (typeof prevValue === typeof []) {
    return prevValue.includes(nextValue) ?
      prevValue.filter(v => v !== nextValue) :
      prevValue.concat([nextValue]);
  }
  return nextValue;
}

exports.update = (req, res) => {
  const data = req.body.data;
  const userId = req.decoded._id;
  const isNotCollectionKey = key => key !== '_id';
  User.findOne({ _id: ObjectId(userId) })
  .then((modelInstance) => {
    Object.keys(data).filter(isNotCollectionKey).forEach((key) => {
      modelInstance[key] = updateValue(modelInstance[key], data[key]); // eslint-disable-line
    });
    return modelInstance.save();
  })
  .then(modelInstance => accknowledge(res, modelInstance));
};

exports.get = (req, res) => {
  const userId = req.decoded._id;
  User.findOne({ _id: ObjectId(userId) })
  .then(modelInstance => accknowledge(res, modelInstance));
};
