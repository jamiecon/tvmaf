if (Test-Path env:VIRTUAL_ENV) {
    deactivate
}
env\Scripts\activate
python main.py