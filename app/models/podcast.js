import mongoose from 'mongoose';
const Schema  = mongoose.Schema;

const podcastSchema = new Schema(
  {
    name: String,
    description: String
  }
);

export default mongoose.model('Podcast', podcastSchema);