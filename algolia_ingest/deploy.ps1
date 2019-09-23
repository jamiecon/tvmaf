gcloud functions deploy algolia_push `
--runtime nodejs10 `
--entry-point cloudExecute `
--region europe-west1 `
--memory 256MB `
--timeout 60s `
--project spry-bus-252723 `
--set-env-vars ALGOLIA_APP_ID=9JZ8KBSETQ,ALGOLIA_API_KEY=ad297cac926002b5dc094ef1be2ec656,ALGOLIA_INDEX_NAME=dev_titles,FIRESTORE_PROJECT_ID=spry-bus-252723 `
--trigger-event providers/cloud.firestore/eventTypes/document.write `
--trigger-resource "projects/spry-bus-252723/databases/(default)/documents/title/{id}"