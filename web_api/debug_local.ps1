if (Test-Path env:VIRTUAL_ENV) {
    deactivate
}
env\Scripts\activate
$env:GOOGLE_APPLICATION_CREDENTIALS = "c:\users\jamie\code\credentials\tvmaf-f13f16990802.json"
python main.py