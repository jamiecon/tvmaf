const algoliasearch = require('algoliasearch');
const dotenv = require('dotenv');
const Firestore = require('@google-cloud/firestore');

// load values from the .env file in this directory into process.env
dotenv.config();

// configure firestore
const firestoreDb = new Firestore({
  projectId: process.env.FIRESTORE_PROJECT_ID,
  keyFilename: process.env.KEY_FILE_NAME,
})

// configure algolia
const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
const index = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME);

// get all movies from firestore
firestoreDb.collection('title.basics').get().then((snapshot) => {
  const records = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    // set the Algolia objectID as the Firebase .key
    data.objectID = doc.id;
    // add object for indexing
    records.push(data);
  });

  // add or update new objects
  index
    .saveObjects(records)
    .then(() => {
      console.log('Contacts imported into Algolia');
    })
    .catch(error => {
      console.error('Error when importing contact into Algolia', error);
      process.exit(1);
    });
})
  .catch((err) => {
    console.log('error: ', err);
  });