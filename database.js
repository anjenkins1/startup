const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');
const { query } = require('express');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const reactionCollection = db.collection('reaction');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
  console.log(`Connected to database`);
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
      email: email,
      password: passwordHash,
      token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

//add reaction
function addReaction(rxn) {
  reactionCollection.insertOne(rxn)
}

function getReactions(user) {
  const query = { user: user };
  const reactions = reactionCollection.find(query);
  return reactions.toArray();
}


module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addReaction,
  getReactions,
};