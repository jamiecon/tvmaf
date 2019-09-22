New-Item -ItemType directory "deployment"
Copy-Item ".\web_api\*" ".\deployment\" # currently only copies top level items
npm run --prefix .\web_frontend\ build
Move-Item .\web_frontend\build .\deployment\frontend
gcloud app deploy deployment/app.yaml --project=spry-bus-252723
Remove-Item -LiteralPath ".\deployment" -Force -Recurse