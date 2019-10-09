const functions = require('firebase-functions');
const admin = require('firebase-admin')
const algoliasearch = require('algoliasearch');

// configure algolia
const algolia = algoliasearch(
    functions.config().algolia.appid,
    functions.config().algolia.apikey
);
const algoliaIndex = algolia.initIndex('dev_titles');

// initialise firebase
admin.initializeApp();
const db = admin.firestore();

exports.algolia_item_create = functions.firestore.document('title/{id}')
    .onCreate((snapshot, context) => {
        const id = snapshot.id;
        console.log('Adding search index entry with ID: ' + id);

        db.collection('title').doc(id).get()
            .then(result => {
                return algoliaIndex.saveObject({
                    objectID: result.id, // set the Algolia objectID as the Firebase .key
                    displayTitle: result.get('display_title'),
                    displayYear: result.get('year')
                });
            })
            .then(result => {
                console.log(result);
                return result;
            })
            .catch(error => {
                console.log(error);
            })

        return null;
    });

exports.algolia_item_delete = functions.firestore.document('title/{id}')
    .onDelete((snapshot, context) => {
        console.log('Deleting search index entry with ID ' + snapshot.id);
        algoliaIndex.deleteObject(snapshot.id)
            .then(result => {
                console.log(result);
                return result
            })
            .catch(error => {
                console.log(error);
            })

        return null;
    });

exports.algolia_item_update = functions.firestore.document('title/{id}')
    .onUpdate((change, context) => {
        const id = change.before.id;
        console.log('Updating search index entry with ID ' + id);
        const doc = change.after.data();
        algoliaIndex.partialUpdateObject({
            objectID: id,
            displayTitle: doc.display_title,
            displayYear: doc.year
        })
            .then(result => {
                console.log(result);
                return result;
            })
            .catch(error => {
                console.log(error);
            })

        return null;
    });

exports.algolia_full_update = functions.https
    .onRequest((req, resp) => {
        const records = [];
        console.log('Clearing index');
        algoliaIndex.clearIndex()
            .then(result => {
                console.log('Getting titles');
                return db.collection('title').get()
            })
            .then(result => {
                console.log('Building index');
                result.forEach((doc) => {
                    const data = {
                        objectID: doc.id, // set the Algolia objectID as the Firebase .key
                        displayTitle: doc.get('display_title'),
                        displayYear: doc.get('year')
                    }
                    records.push(data);
                });
                return algoliaIndex.saveObjects(records);
            })
            .then(result => {
                console.log(result);
                resp.send('OK');
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    });