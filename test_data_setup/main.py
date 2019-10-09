import requests
import gzip
import csv
import os
from google.cloud import firestore
from io import TextIOWrapper

titles_to_insert = [
    {
        'display_title': 'Goodfellas',
        'year': '1990',
        'imdb_id': 'tt0099685',
        'netflix_id': '70002022',
        'description': 'Goodfellas is full of delicious Italian food!',
    },
    {
        'display_title': 'The Grand Budapest Hotel',
        'year': '2014',
        'imdb_id': 'tt2278388',
        'netflix_id': '70295915',
    },
    {
        'display_title': 'Ad Astra',
        'year': '2019',
        'imdb_id': 'tt2935510',
    },
    {
        'display_title': 'The Rock',
        'year': '1996',
        'imdb_id': 'tt0117500',
    },
]

meals = [
    {
        'title_imdb_id': 'tt0099685',
        'meal_name': 'Prison Sauce',
        'time_seconds': 4234,
        'recipes': [
            {
                'type': 'youtube',
                'title': 'Binging with Babish - Goodfellas Prison Sauce',
                'id': 'uEjMyHccX8U'
            }
        ],
    },
    {
        'title_imdb_id': 'tt0099685',
        'meal_name': 'Ragu',
        'time_seconds': 7200,
        'youtube_videos': [],
    },
    {
        'title_imdb_id': 'tt2278388',
        'meal_name': 'Courtesan au Chocolat',
        'time_seconds': 720,
        'recipes': [
            {
                'type': 'youtube',
                'title': 'Binging with Babish - Courtesan au Chocolat',
                'id': 'GO5P3fLTwA0'
            }
        ],
    },
]

TITLES_COLLECTION = 'title'
MEALS_COLLECTION = 'meal'
RECIPES_COLLECTION = 'recipes'

def insert_data():
    db = firestore.Client()

    # Delete all titles and meals
    batch = db.batch()
    all_titles = db.collection(TITLES_COLLECTION).list_documents()
    for title in all_titles:
        batch.delete(title)
        for meal in title.collection(MEALS_COLLECTION).list_documents():
            batch.delete(meal)
            for recipe in meal.collection(RECIPES_COLLECTION).list_documents():
                batch.delete(recipe)
    batch.commit()

    # Insert title data
    for title in titles_to_insert:
        result = db.collection(TITLES_COLLECTION).add(title)
        print('Inserted new title with ID: {0}'.format(result[1].id))

    for meal in meals:
        title_imdb_id = meal.pop('title_imdb_id', None)
        recipes = meal.pop('recipes', None)
        if title_imdb_id:
            matching_titles = db.collection(TITLES_COLLECTION).where('imdb_id', '==', title_imdb_id).stream()
            for title_doc in matching_titles:
                title_ref = title_doc.reference
                meals_collection = title_ref.collection(MEALS_COLLECTION)
                result = meals_collection.add(meal)
                if recipes:
                    meal_ref = result[1]
                    for recipe in recipes:
                        meal_ref.collection(RECIPES_COLLECTION).add(recipe)

def delete_data():
    db = firestore.Client()
    all_titles = db.collection(TITLES_COLLECTION).list_documents()
    for title in all_titles:
        title.delete()
        break                

insert_data()
# delete_data()
