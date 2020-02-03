const mongoose = require('mongoose');

const MOGNODB_DEFAULT_PORT = 27017;

const connectDb = async () => {
  try {
    // const fullUri = `mongodb://${process.env.MONGO_URI}:${MOGNODB_DEFAULT_PORT}/CodeEngine`;
    const fullUri = `mongodb+srv://admin:${process.env.MONGOPASSWORD}@cluster0-v3li1.mongodb.net/AlgosApp?retryWrites=true&w=majority`;
    // console.log(fullUri);
    await mongoose.connect(fullUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log('Connnected to MongoDB...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDb;
