import requests
import gzip
import csv
import os
from google.cloud import firestore
from io import TextIOWrapper

titles = [
    {
        'display_title': 'Goodfellas',
        'imdb_id': 'tt0099685',
        'netflix_id': '70002022',
        'meals': [
            {
                'meal_id': 'yyy',
                'meal_name': 'Prison Sauce',
                'time_seconds': 4234,
                'babish_youtube_id': 'foo'                
            },
            {
                'meal_id': 'zzzz',
                'meal_name': 'Ragu',
                'time_seconds': 1856,
                'babish_youtube_id': 'foo'
            },
        ]
    },
    {
        'display_title': 'The Grand Budapest Hotel',
        'imdb_id': 'tt2278388',
        'netflix_id': '70295915',
        'meals': [
            {
                'meal_id': 'vvv',
                'meal_name': 'Courtesan au Chocolat',
                'time_seconds': 720,
                'babish_youtube_id': 'foo'
            },
        ]
    },
]

meals = [
    {
        'document_id': 'zzzz',
        'displayTitle': 'Ragu',
        'recipe_links': [
            {
                'website': 'BBC Good Food',
                'href': 'https://foo',
            },
        ]
    },
    {
        'document_id': 'vvv',
        'displayTitle': 'Macaroon',
        'recipe_links': [
            {
                'website': 'BBC Good Food',
                'href': 'https://foo',
            },
        ]
    },
]

TITLES_COLLECTION = 'title'
MEALS_COLLECTION = 'meal'

def insert_data():
    db = firestore.Client()

    # Delete all titles and meals
    batch = db.batch()
    all_titles = db.collection(TITLES_COLLECTION).list_documents()
    for title in all_titles:
        batch.delete(title)
    all_meals = db.collection(MEALS_COLLECTION).list_documents()
    for meal in all_meals:
        batch.delete(meal)
    batch.commit()

    # Insert title data
    for title in titles:
        result = db.collection(TITLES_COLLECTION).add(title)
        print('Inserted new title with ID: {0}'.format(result[1].id))

    for meal in meals:
        id = meal.pop('document_id', None)
        if id:
            result = db.collection(MEALS_COLLECTION).add(meal, document_id=id)
            print('Inserted new meal with ID: {0}'.format(result[1].id))

    

insert_data()