cd .\web_frontend
npm run build
cd ..
mv .\web_frontend\build .\web_api\frontend
cd .\web_api 
gcloud config set project spry-bus-252723
gcloud app deploy
