const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/userModel');

exports.update = (req, res) => {
  const id = req.body.collectionId;
  const updateQuery = User.findOneAndUpdate(
      { _id: ObjectId(req.decoded._id) },
      { $addToSet: { subscribedIds: id } },
      { new: true }).exec();
  updateQuery.then((record) => {
    res.status(201).json({ message: `Subscriptions updated to ${record.subscribedIds}` });
  });
  updateQuery.catch(reason => console.log(reason));
};
