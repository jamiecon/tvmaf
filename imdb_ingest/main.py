import datetime
import requests
import gzip
import csv
import os
from google.cloud import firestore
from io import TextIOWrapper

BASE_URL = 'https://datasets.imdbws.com/'
TSV_GZ_EXTENSION = '.tsv.gz'
TSV_EXTENSION = '.tsv'

def ingest_titles(utf8_tsv):
    TARGET_COLLECTION = 'imdb_title'
    TARGET_PRIMARY_KEY_FIELD = 'tconst'
    SOURCE_PRIMARY_KEY_FIELD = 'tconst'

    tsv_reader = csv.DictReader(utf8_tsv, delimiter='\t', quoting=csv.QUOTE_NONE)
    db = firestore.Client()

    # Pull IMDb ID of all previously imported titles into a list
    existing_titles = []
    imdb_titles_collection = db.collection(TARGET_COLLECTION).select([TARGET_PRIMARY_KEY_FIELD]).stream()
    for title in imdb_titles_collection:
        existing_titles.append(title.to_dict()[TARGET_PRIMARY_KEY_FIELD])
    print('Currently {0} titles in database'.format(len(existing_titles)))

    total_tsv_rows = 0
    valid_tsv_rows = 0
    new_rows = 0
    for row in tsv_reader:
        # print('Total rows: {0} Valid rows: {1} New rows: {2}'.format(total_tsv_rows, valid_tsv_rows, new_rows))
        
        total_tsv_rows += 1

        if row['titleType'] != 'movie' or row['isAdult'] == '1':
            continue

        try:
            year = int(row['startYear'])
            if year < 1980:
                continue
        except:
            continue

        valid_tsv_rows += 1

        if not row[SOURCE_PRIMARY_KEY_FIELD] in existing_titles:
            new_document = dict(row)
            new_document['imported_at'] = datetime.datetime.now()
            db.collection(TARGET_COLLECTION).add(new_document)
            new_rows += 1
            # print('Inserted new record with ID: {0} and data {1}'.format(row[SOURCE_PRIMARY_KEY_FIELD], new_document))
        # else:
        #     print('Record with ID: {0} already exists'.format(row[SOURCE_PRIMARY_KEY_FIELD]))

    print('Total rows: {0} Valid rows: {1} New rows: {2}'.format(total_tsv_rows, valid_tsv_rows, new_rows))

# Each record is a tuple of (file name, method for processing)
IMDB_DATA_FILES = [
    # ('name.basics', None),
    # ('title.akas', None),
    ('title.basics', ingest_titles),
    # ('title.crew', None),
    # ('title.episode', None),
    # ('title.principals', None),
    # ('title.ratings', None)
    ]

def ingest(data_dir='tmp/', delete_temp_files=True):
    for imdb_data_file in IMDB_DATA_FILES:
        print()
        print('Processing {0}'.format(imdb_data_file[0]))

        tsv_gz_filename = data_dir + imdb_data_file[0] + TSV_GZ_EXTENSION

        url = BASE_URL + imdb_data_file[0] + TSV_GZ_EXTENSION
        try:
            r = requests.get(url)
            with open(tsv_gz_filename, mode='wb') as f:
                f.write(r.content)
        except:
            print('Error: Unable to download file')
            break

        print('Successfully downloaded from {0}'.format(url))

        with gzip.open(tsv_gz_filename, 'rb') as extracted_data:
            wrapper = TextIOWrapper(extracted_data, encoding='utf-8')
            imdb_data_file[1](wrapper)

        print('Finished executing')


    return 'Success'

def cloud_execute(request):
    ingest(data_dir='/tmp/')
