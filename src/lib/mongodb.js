/* eslint-disable no-multi-assign */
import mongoose from 'mongoose';

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_NAME } = process.env;

// Set up default mongoose connection
const MONGO_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_NAME}?retryWrites=true&w=majority`;

const dbConnect = async () => {
  if (!MONGODB_NAME) {
    throw new Error('Please define the MONGODB_NAME environment variable inside .env.local');
  }

  if (!MONGODB_HOST) {
    throw new Error('Please define the MONGODB_HOST environment variable inside .env.local');
  }

  if (!MONGODB_USER) {
    throw new Error('Please define the MONGODB_USER environment variable inside .env.local');
  }

  if (!MONGODB_PASSWORD) {
    throw new Error('Please define the MONGODB_PASSWORD environment variable inside .env.local');
  }

  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    return null;
  }

  return mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};

export default dbConnect;
