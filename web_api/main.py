import os
from flask import Flask, render_template, request, jsonify
from google.cloud import firestore
from algoliasearch.search_client import SearchClient

app = Flask(__name__)

db = firestore.Client()

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('q', '')
    result_data = {
        'query': query,
    }

    # app.yaml env vars are not available for local testing yet, see
    # https://stackoverflow.com/questions/52999747/python-3-7-local-development-server-options-for-new-app-engine-apps
    # algolia_app_id = os.environ['algolia_app_id']
    # algolia_ro_api_key = os.environ['algolia_ro_api_key']

    client = SearchClient.create('9JZ8KBSETQ', '62beeb4c091e9e6d907d1556fd1eb4f9')
    index = client.init_index('dev_titles')
    results = index.search(query)
    result_data['results'] = results

    return jsonify(result_data)


@app.route('/title/<title_id>')
def title(title_id):
    result_data = {}

    title_ref = db.collection(u'title').document(title_id)

    try:
        title = title_ref.get()
        result_data['title'] = title.to_dict()
    except google.cloud.exceptions.NotFound:
        return '404'

    return jsonify(result_data)


if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
# [END gae_python37_app]
