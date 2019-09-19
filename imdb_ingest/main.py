import requests
import gzip
import csv
import os
from google.cloud import firestore
from io import TextIOWrapper

BASE_URL = 'https://datasets.imdbws.com/'
TSV_GZ_EXTENSION = '.tsv.gz'
TSV_EXTENSION = '.tsv'

# Each record is a tuple of (file name, primary key field)
IMDB_DATA_FILES = [
    ('name.basics', 'nconst'),
    # ('title.akas', None),
    # ('title.basics', 'tconst'),
    # ('title.crew', None),
    # ('title.episode', None),
    ('title.principals', None),
    # ('title.ratings', 'tconst')
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
            tsv_reader = csv.DictReader(wrapper, delimiter='\t', quoting=csv.QUOTE_NONE)

            db = firestore.Client()
            rowcount = 0

            for row in tsv_reader:
                if 'titleType' in row and row['titleType'] != 'movie':
                    continue

                rowcount = rowcount + 1

                exists = False
                # Only check for existence if we have a key to check with
                if imdb_data_file[1]:
                    documents = db.collection(imdb_data_file[0]).where(imdb_data_file[1], '==', row[imdb_data_file[1]]).select({imdb_data_file[1]}).stream()
                    for _ in documents:
                        print('Record with ID {0} was already present.'.format(row[imdb_data_file[1]]))
                        exists = True
                        break

                if not exists:
                    db.collection(imdb_data_file[0]).document().set(dict(row))
                    print('Inserted new record: {0}'.format(row))

                if rowcount > 20:
                    break

    return 'Success'

def cloud_execute(request):
    ingest(data_dir='/tmp/')
