from flask import Flask, render_template, request
from google.cloud import firestore

app = Flask(__name__)

db = firestore.Client()

@app.route('/')
def index():
    """Home page"""
    home_data = {
        'titles': [],
    }

    titles = db.collection('title.basics').stream()
    for title in titles:
        home_data['titles'].append(title.to_dict())
    return render_template('index.jinja', **home_data)


@app.route('/search', methods=['POST'])
def search():
    query = request.form['q']
    output = ''
    documents = db.collection('title.basics').stream()
    for doc in documents:
        title = doc.to_dict()
        output += '<br>{0}'.format(title['primaryTitle'])
    return jsonify(output)

@app.route('/movie/<title_id>')
def movie(title_id):
    page_data = {}

    titles = db.collection('title.basics').where('tconst', '==', title_id).limit(1).stream()
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
