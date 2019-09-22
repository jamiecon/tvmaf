import os
from flask import Flask, render_template, request, jsonify
from google.cloud import firestore
from algoliasearch.search_client import SearchClient

app = Flask(__name__)

db = firestore.Client()


@app.route('/', methods=['GET'])
def index():
    """Home page"""
    home_data = {
        'titles': [],
    }

    titles = db.collection('title.basics').stream()
    for title in titles:
        home_data['titles'].append(title.to_dict())
    return render_template('index.jinja', **home_data)


@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('q', '')
    page_data = {
        'query': query,
    }

    # app.yaml env vars are not available for local testing yet, see
    # https://stackoverflow.com/questions/52999747/python-3-7-local-development-server-options-for-new-app-engine-apps
    # algolia_app_id = os.environ['algolia_app_id']
    # algolia_ro_api_key = os.environ['algolia_ro_api_key']

    client = SearchClient.create('9JZ8KBSETQ', '62beeb4c091e9e6d907d1556fd1eb4f9')
    index = client.init_index('dev_titles')
    results = index.search(query)
    print(results)
    page_data['results'] = results

    return jsonify(page_data)


@app.route('/movie/<title_id>')
def title(title_id):
    page_data = {}

    titles = db.collection('title.basics').where(
        'tconst', '==', title_id).limit(1).stream()
    for title in titles:
        page_data['title'] = title.to_dict()
        break
    else:
        return render_template('404.jinja')

    return render_template('title.jinja', **page_data)


if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
# [END gae_python37_app]
