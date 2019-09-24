exports.pushData = () => {
  const algoliasearch = require('algoliasearch');
  const Firestore = require('@google-cloud/firestore');

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
  firestoreDb.collection('title').get().then((snapshot) => {
    const records = [];
    snapshot.forEach((doc) => {
      const meals = doc.get('meals')
      let numberOfMeals;
      if (meals) {
        numberOfMeals = meals.length;
      } else {
        numberOfMeals = 0;
      }
      const data = {
        objectID: doc.id, // set the Algolia objectID as the Firebase .key
        displayTitle: doc.get('display_title'),
        displayYear: doc.get('year'),
        numberOfMeals: numberOfMeals
      }
      console.log(data);

      // add object for indexing
      records.push(data);
    });

    // for now, empty the index before filling
    index.clearIndex().then(() => {
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
  })
    .catch((err) => {
      console.log('error: ', err);
    });

}

/**
 * Triggered by a change to a Firestore document.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.cloudExecute = (event, context) => {
  const resource = context.resource;
  // log out the resource string that triggered the function
  console.log('Function triggered by change to: ' + resource);
  // now log the full event object
  console.log(JSON.stringify(event));

  // TODO - only push new data
  this.pushData();
};
