const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PodcastSchema = new Schema({
  artistName: String,
  artworkUrl100: String,
  artworkUrl30: String,
  artworkUrl60: String,
  artworkUrl600: String,
  collectionCensoredName: String,
  collectionExplicitness: String,
  collectionHdPrice: Number,
  collectionId: Number,
  collectionName: String,
  collectionPrice: Number,
  collectionViewUrl: String,
  contentAdvisoryRating: String,
  country: String,
  currency: String,
  feedUrl: String,
  genreIds: [Number],
  genres: [String],
  kind: String,
  primaryGenreName: String,
  releaseDate: String,
  trackCensoredName: String,
  trackCount: Number,
  trackExplicitness: String,
  trackHdPrice: Number,
  trackHdRentalPrice: Number,
  trackId: Number,
  trackName: String,
  trackPrice: Number,
  trackRentalPrice: Number,
  trackViewUrl: String,
  wrapperType: String });

module.exports = mongoose.model('Podcast', PodcastSchema);
