import mongoose from 'mongoose';
const Schema  = mongoose.Schema;

const podcastSchema = new Schema(
  {
    artistName: String,
    artistViewUrl: String,
    artworkUrl: String,
    genres: Array
  }
);

export default mongoose.model('Podcast', podcastSchema);