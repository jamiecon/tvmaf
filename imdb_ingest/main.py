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

    rowcount = 0
    for row in tsv_reader:
        if row['titleType'] != 'movie' or row['isAdult'] == '1':
            continue

        try:
            year = int(row['startYear'])
            if year < 1980:
                continue
        except:
            continue
        
        rowcount += 1

        new_document = dict(row)
        new_document['imported_at'] = datetime.datetime.now()

        exists = False
        documents = db.collection(TARGET_COLLECTION).where(TARGET_PRIMARY_KEY_FIELD, '==', row[SOURCE_PRIMARY_KEY_FIELD]).stream()
        for _ in documents:
            print('Record with ID {0} was already present.'.format(row[SOURCE_PRIMARY_KEY_FIELD]))
            exists = True
            break

        if not exists:
            db.collection(TARGET_COLLECTION).add(new_document)
            print('Inserted new record with ID: {0} and data {1}'.format(row[SOURCE_PRIMARY_KEY_FIELD], new_document))

    print('Processed {0} rows.'.format(rowcount))

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
