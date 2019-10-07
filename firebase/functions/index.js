const functions = require('firebase-functions');
const admin = require('firebase-admin')
const algoliasearch = require('algoliasearch');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// configure algolia
const algolia = algoliasearch(
    functions.config().algolia.appid,
    functions.config().algolia.apikey
);

// initialise firebase
admin.initializeApp();
const db = admin.firestore();

exports.algolia_triggered_update = functions.firestore.document('title/{id}')
    .onWrite((change, context) => {
        console.log(change);
        console.log(context);
        console.log(functions.config().algolia.appid);
        console.log(functions.config().algolia.apikey);

        return true;
    });

exports.algolia_full_update = functions.https.onRequest((req, resp) => {
    console.log('Clearing index');
    const algoliaIndex = algolia.initIndex('dev_titles');
    algoliaIndex.clearIndex().then((result) => {
        console.log('Index cleared');
        return null;
    }).catch(error => {
        console.log('Error clearing index: ' + error);
    });
    
    console.log('Inserting data');
    const records = [];
    db.collection('title').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const data = {
                objectID: doc.id, // set the Algolia objectID as the Firebase .key
                displayTitle: doc.get('display_title'),
                displayYear: doc.get('year')
            }
            records.push(data);
        });
        return algoliaIndex.saveObjects(records);
    }).then(() => {
        resp.send('OK');
        return null;
    }).catch(error => {
        console.log('Error inserting data: ' + error);
    });
});