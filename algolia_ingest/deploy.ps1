gcloud functions deploy algolia_push `
--runtime nodejs10 `
--entry-point cloudExecute `
--region europe-west1 `
--memory 256MB `
--timeout 60s `
--project spry-bus-252723 `
--set-env-vars ALGOLIA_APP_ID=$env:ALGOLIA_APP_ID,ALGOLIA_API_KEY=$env:ALGOLIA_API_KEY,ALGOLIA_INDEX_NAME=$env:ALGOLIA_INDEX_NAME,FIRESTORE_PROJECT_ID=$env:FIRESTORE_PROJECT_ID `
--trigger-event providers/cloud.firestore/eventTypes/document.write `
--trigger-resource "projects/spry-bus-252723/databases/(default)/documents/title/{id}"