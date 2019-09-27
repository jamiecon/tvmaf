gcloud functions deploy imdb_ingest `
--runtime python37 `
--entry-point cloud_execute `
--trigger-http `
--region europe-west1 `
--memory 512MB `
--timeout 540s `
--project $env:FIRESTORE_PROJECT_ID