require('dotenv').config();
const { MongoClient } = require('mongodb');

let client;

async function connectToDatabase(){
  try {

    const uri = process.env.MONGODB_URI;
    
    client = new MongoClient(uri);
    await client.connect();
    console.log("Connected to the database");
    return client;
  } catch (e) {
    console.error("Error Connecting to MongoDB", e);
    throw e;
  }

}

module.exports = {connectToDatabase, getDb: (dbName) => client.db(dbName)};