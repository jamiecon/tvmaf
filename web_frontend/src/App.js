import React from 'react';
import logo from './logo.svg';
import './App.css';

class TitleSearchWidget extends React.Component {
  render() {
    return (
      <div>
        <h1>Search for title</h1>
        <SearchBar query={this.props.search.query} />
        <SearchResultsList results={this.props.search.results.hits} />
      </div>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <div>
        <input type="text" name="query" id="query" value={this.props.query} />
      </div>
    );
  }
}

class SearchResultsList extends React.Component {
  render() {
    const results = this.props.results.map((result) => {
      return (
        <SearchResult
          key={result.tconst}
          titleName={result.originalTitle}
        />
      );
    });

    return (
      <ul>{results}</ul>
    );
  }
}

class SearchResult extends React.Component {
  render() {
    return (
      <li><button>{this.props.titleName}</button></li>
    );
  }
}

function App() {
  return (
    <div className="App">
      <TitleSearchWidget search={search} />
    </div>
  );
}

export default App;


var search = {
  "query": "movie",
  "results": {
    "exhaustiveNbHits": true,
    "hits": [
      {
        "_highlightResult": {
          "endYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "genres": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Documentary,News,Sport"
          },
          "isAdult": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "0"
          },
          "originalTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "The Corbett-Fitzsimmons Fight"
          },
          "primaryTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "The Corbett-Fitzsimmons Fight"
          },
          "runtimeMinutes": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "20"
          },
          "startYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "1897"
          },
          "tconst": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "tt0000147"
          },
          "titleType": {
            "fullyHighlighted": true,
            "matchLevel": "full",
            "matchedWords": [
              "movie"
            ],
            "value": "<em>movie</em>"
          }
        },
        "endYear": "\\N",
        "genres": "Documentary,News,Sport",
        "isAdult": "0",
        "objectID": "kGytKwxWEtG4fxbYIEeG",
        "originalTitle": "The Corbett-Fitzsimmons Fight",
        "primaryTitle": "The Corbett-Fitzsimmons Fight",
        "runtimeMinutes": "20",
        "startYear": "1897",
        "tconst": "tt0000147",
        "titleType": "movie"
      },
      {
        "_highlightResult": {
          "endYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "genres": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "isAdult": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "0"
          },
          "originalTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Fiesta de toros"
          },
          "primaryTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Fiesta de toros"
          },
          "runtimeMinutes": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "startYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "1909"
          },
          "tconst": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "tt0000867"
          },
          "titleType": {
            "fullyHighlighted": true,
            "matchLevel": "full",
            "matchedWords": [
              "movie"
            ],
            "value": "<em>movie</em>"
          }
        },
        "endYear": "\\N",
        "genres": "\\N",
        "isAdult": "0",
        "objectID": "YS3RGMMImy4SmLZEZtxp",
        "originalTitle": "Fiesta de toros",
        "primaryTitle": "Fiesta de toros",
        "runtimeMinutes": "\\N",
        "startYear": "1909",
        "tconst": "tt0000867",
        "titleType": "movie"
      },
      {
        "_highlightResult": {
          "endYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "genres": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Biography,Crime,Drama"
          },
          "isAdult": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "0"
          },
          "originalTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "The Story of the Kelly Gang"
          },
          "primaryTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "The Story of the Kelly Gang"
          },
          "runtimeMinutes": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "70"
          },
          "startYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "1906"
          },
          "tconst": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "tt0000574"
          },
          "titleType": {
            "fullyHighlighted": true,
            "matchLevel": "full",
            "matchedWords": [
              "movie"
            ],
            "value": "<em>movie</em>"
          }
        },
        "endYear": "\\N",
        "genres": "Biography,Crime,Drama",
        "isAdult": "0",
        "objectID": "YABSXidoTmbIIhYyTpT0",
        "originalTitle": "The Story of the Kelly Gang",
        "primaryTitle": "The Story of the Kelly Gang",
        "runtimeMinutes": "70",
        "startYear": "1906",
        "tconst": "tt0000574",
        "titleType": "movie"
      },
      {
        "_highlightResult": {
          "endYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "genres": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "isAdult": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "0"
          },
          "originalTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "La bocana de Mar Chica"
          },
          "primaryTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "La bocana de Mar Chica"
          },
          "runtimeMinutes": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "startYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "1909"
          },
          "tconst": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "tt0000814"
          },
          "titleType": {
            "fullyHighlighted": true,
            "matchLevel": "full",
            "matchedWords": [
              "movie"
            ],
            "value": "<em>movie</em>"
          }
        },
        "endYear": "\\N",
        "genres": "\\N",
        "isAdult": "0",
        "objectID": "OkYFBnqm76U4KbBkSlgP",
        "originalTitle": "La bocana de Mar Chica",
        "primaryTitle": "La bocana de Mar Chica",
        "runtimeMinutes": "\\N",
        "startYear": "1909",
        "tconst": "tt0000814",
        "titleType": "movie"
      },
      {
        "_highlightResult": {
          "endYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "genres": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "isAdult": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "0"
          },
          "originalTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Faldgruben"
          },
          "primaryTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Faldgruben"
          },
          "runtimeMinutes": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "startYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "1909"
          },
          "tconst": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "tt0000862"
          },
          "titleType": {
            "fullyHighlighted": true,
            "matchLevel": "full",
            "matchedWords": [
              "movie"
            ],
            "value": "<em>movie</em>"
          }
        },
        "endYear": "\\N",
        "genres": "\\N",
        "isAdult": "0",
        "objectID": "L6nk5WfB5pbF7sEAqtg7",
        "originalTitle": "Faldgruben",
        "primaryTitle": "Faldgruben",
        "runtimeMinutes": "\\N",
        "startYear": "1909",
        "tconst": "tt0000862",
        "titleType": "movie"
      },
      {
        "_highlightResult": {
          "endYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "genres": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "isAdult": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "0"
          },
          "originalTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "El blocao Velarde"
          },
          "primaryTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "El blocao Velarde"
          },
          "runtimeMinutes": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "startYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "1909"
          },
          "tconst": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "tt0000812"
          },
          "titleType": {
            "fullyHighlighted": true,
            "matchLevel": "full",
            "matchedWords": [
              "movie"
            ],
            "value": "<em>movie</em>"
          }
        },
        "endYear": "\\N",
        "genres": "\\N",
        "isAdult": "0",
        "objectID": "6ZS6Sh1pQqTz9acqh1D4",
        "originalTitle": "El blocao Velarde",
        "primaryTitle": "El blocao Velarde",
        "runtimeMinutes": "\\N",
        "startYear": "1909",
        "tconst": "tt0000812",
        "titleType": "movie"
      },
      {
        "_highlightResult": {
          "endYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "genres": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "isAdult": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "0"
          },
          "originalTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "A Cultura do Cacau"
          },
          "primaryTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "A Cultura do Cacau"
          },
          "runtimeMinutes": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "startYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "1909"
          },
          "tconst": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "tt0000838"
          },
          "titleType": {
            "fullyHighlighted": true,
            "matchLevel": "full",
            "matchedWords": [
              "movie"
            ],
            "value": "<em>movie</em>"
          }
        },
        "endYear": "\\N",
        "genres": "\\N",
        "isAdult": "0",
        "objectID": "1c153wZCsgK2QTnOQozh",
        "originalTitle": "A Cultura do Cacau",
        "primaryTitle": "A Cultura do Cacau",
        "runtimeMinutes": "\\N",
        "startYear": "1909",
        "tconst": "tt0000838",
        "titleType": "movie"
      },
      {
        "_highlightResult": {
          "endYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "genres": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "isAdult": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "0"
          },
          "originalTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Bohemios"
          },
          "primaryTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Bohemios"
          },
          "runtimeMinutes": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "100"
          },
          "startYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "1905"
          },
          "tconst": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "tt0000502"
          },
          "titleType": {
            "fullyHighlighted": true,
            "matchLevel": "full",
            "matchedWords": [
              "movie"
            ],
            "value": "<em>movie</em>"
          }
        },
        "endYear": "\\N",
        "genres": "\\N",
        "isAdult": "0",
        "objectID": "wD9u6EEWWBYt2qkA80fk",
        "originalTitle": "Bohemios",
        "primaryTitle": "Bohemios",
        "runtimeMinutes": "100",
        "startYear": "1905",
        "tconst": "tt0000502",
        "titleType": "movie"
      },
      {
        "_highlightResult": {
          "endYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "genres": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "isAdult": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "0"
          },
          "originalTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Un d\u00eda en Xochimilco"
          },
          "primaryTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Un d\u00eda en Xochimilco"
          },
          "runtimeMinutes": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "startYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "1909"
          },
          "tconst": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "tt0000846"
          },
          "titleType": {
            "fullyHighlighted": true,
            "matchLevel": "full",
            "matchedWords": [
              "movie"
            ],
            "value": "<em>movie</em>"
          }
        },
        "endYear": "\\N",
        "genres": "\\N",
        "isAdult": "0",
        "objectID": "k7aoAOrHYuV1MyD1rc4A",
        "originalTitle": "Un d\u00eda en Xochimilco",
        "primaryTitle": "Un d\u00eda en Xochimilco",
        "runtimeMinutes": "\\N",
        "startYear": "1909",
        "tconst": "tt0000846",
        "titleType": "movie"
      },
      {
        "_highlightResult": {
          "endYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "genres": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "isAdult": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "0"
          },
          "originalTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Los dos hermanos"
          },
          "primaryTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Los dos hermanos"
          },
          "runtimeMinutes": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "startYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "1909"
          },
          "tconst": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "tt0000850"
          },
          "titleType": {
            "fullyHighlighted": true,
            "matchLevel": "full",
            "matchedWords": [
              "movie"
            ],
            "value": "<em>movie</em>"
          }
        },
        "endYear": "\\N",
        "genres": "\\N",
        "isAdult": "0",
        "objectID": "NpV73DYLBjcJT0IpZ9F5",
        "originalTitle": "Los dos hermanos",
        "primaryTitle": "Los dos hermanos",
        "runtimeMinutes": "\\N",
        "startYear": "1909",
        "tconst": "tt0000850",
        "titleType": "movie"
      },
      {
        "_highlightResult": {
          "endYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "genres": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Drama"
          },
          "isAdult": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "0"
          },
          "originalTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Robbery Under Arms"
          },
          "primaryTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Robbery Under Arms"
          },
          "runtimeMinutes": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "startYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "1907"
          },
          "tconst": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "tt0000615"
          },
          "titleType": {
            "fullyHighlighted": true,
            "matchLevel": "full",
            "matchedWords": [
              "movie"
            ],
            "value": "<em>movie</em>"
          }
        },
        "endYear": "\\N",
        "genres": "Drama",
        "isAdult": "0",
        "objectID": "Gf1FuTw3iNDZpoy5gKPj",
        "originalTitle": "Robbery Under Arms",
        "primaryTitle": "Robbery Under Arms",
        "runtimeMinutes": "\\N",
        "startYear": "1907",
        "tconst": "tt0000615",
        "titleType": "movie"
      },
      {
        "_highlightResult": {
          "endYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "genres": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Drama"
          },
          "isAdult": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "0"
          },
          "originalTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Andreas Hofer"
          },
          "primaryTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Andreas Hofer"
          },
          "runtimeMinutes": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "startYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "1909"
          },
          "tconst": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "tt0000793"
          },
          "titleType": {
            "fullyHighlighted": true,
            "matchLevel": "full",
            "matchedWords": [
              "movie"
            ],
            "value": "<em>movie</em>"
          }
        },
        "endYear": "\\N",
        "genres": "Drama",
        "isAdult": "0",
        "objectID": "3iK2ii47BYp1lTrn3X8h",
        "originalTitle": "Andreas Hofer",
        "primaryTitle": "Andreas Hofer",
        "runtimeMinutes": "\\N",
        "startYear": "1909",
        "tconst": "tt0000793",
        "titleType": "movie"
      },
      {
        "_highlightResult": {
          "endYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "genres": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Drama"
          },
          "isAdult": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "0"
          },
          "originalTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Don Quijote"
          },
          "primaryTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Don Quijote"
          },
          "runtimeMinutes": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "startYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "1908"
          },
          "tconst": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "tt0000675"
          },
          "titleType": {
            "fullyHighlighted": true,
            "matchLevel": "full",
            "matchedWords": [
              "movie"
            ],
            "value": "<em>movie</em>"
          }
        },
        "endYear": "\\N",
        "genres": "Drama",
        "isAdult": "0",
        "objectID": "4sfW3JfE8gnTjES5749n",
        "originalTitle": "Don Quijote",
        "primaryTitle": "Don Quijote",
        "runtimeMinutes": "\\N",
        "startYear": "1908",
        "tconst": "tt0000675",
        "titleType": "movie"
      },
      {
        "_highlightResult": {
          "endYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "genres": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Romance"
          },
          "isAdult": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "0"
          },
          "originalTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Miss Jerry"
          },
          "primaryTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Miss Jerry"
          },
          "runtimeMinutes": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "45"
          },
          "startYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "1894"
          },
          "tconst": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "tt0000009"
          },
          "titleType": {
            "fullyHighlighted": true,
            "matchLevel": "full",
            "matchedWords": [
              "movie"
            ],
            "value": "<em>movie</em>"
          }
        },
        "endYear": "\\N",
        "genres": "Romance",
        "isAdult": "0",
        "objectID": "s0SHo6poVgha3q0MBek2",
        "originalTitle": "Miss Jerry",
        "primaryTitle": "Miss Jerry",
        "runtimeMinutes": "45",
        "startYear": "1894",
        "tconst": "tt0000009",
        "titleType": "movie"
      },
      {
        "_highlightResult": {
          "endYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "genres": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Biography,Drama"
          },
          "isAdult": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "0"
          },
          "originalTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Soldiers of the Cross"
          },
          "primaryTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Soldiers of the Cross"
          },
          "runtimeMinutes": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "startYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "1900"
          },
          "tconst": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "tt0000335"
          },
          "titleType": {
            "fullyHighlighted": true,
            "matchLevel": "full",
            "matchedWords": [
              "movie"
            ],
            "value": "<em>movie</em>"
          }
        },
        "endYear": "\\N",
        "genres": "Biography,Drama",
        "isAdult": "0",
        "objectID": "nWmmwLckWPlYL9YCwVe9",
        "originalTitle": "Soldiers of the Cross",
        "primaryTitle": "Soldiers of the Cross",
        "runtimeMinutes": "\\N",
        "startYear": "1900",
        "tconst": "tt0000335",
        "titleType": "movie"
      },
      {
        "_highlightResult": {
          "endYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "genres": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Drama"
          },
          "isAdult": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "0"
          },
          "originalTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Don \u00c1lvaro o la fuerza del sino"
          },
          "primaryTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Don \u00c1lvaro o la fuerza del sino"
          },
          "runtimeMinutes": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "startYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "1908"
          },
          "tconst": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "tt0000676"
          },
          "titleType": {
            "fullyHighlighted": true,
            "matchLevel": "full",
            "matchedWords": [
              "movie"
            ],
            "value": "<em>movie</em>"
          }
        },
        "endYear": "\\N",
        "genres": "Drama",
        "isAdult": "0",
        "objectID": "2uVtFqNDLUr74LHYQaa4",
        "originalTitle": "Don \u00c1lvaro o la fuerza del sino",
        "primaryTitle": "Don \u00c1lvaro o la fuerza del sino",
        "runtimeMinutes": "\\N",
        "startYear": "1908",
        "tconst": "tt0000676",
        "titleType": "movie"
      },
      {
        "_highlightResult": {
          "endYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "genres": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "isAdult": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "0"
          },
          "originalTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Fabricaci\u00f3n del corcho en Sant Feliu de Guixols"
          },
          "primaryTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Fabricaci\u00f3n del corcho en Sant Feliu de Guixols"
          },
          "runtimeMinutes": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "startYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "1909"
          },
          "tconst": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "tt0000859"
          },
          "titleType": {
            "fullyHighlighted": true,
            "matchLevel": "full",
            "matchedWords": [
              "movie"
            ],
            "value": "<em>movie</em>"
          }
        },
        "endYear": "\\N",
        "genres": "\\N",
        "isAdult": "0",
        "objectID": "hJKKXlNQgaYBKbiw2L0b",
        "originalTitle": "Fabricaci\u00f3n del corcho en Sant Feliu de Guixols",
        "primaryTitle": "Fabricaci\u00f3n del corcho en Sant Feliu de Guixols",
        "runtimeMinutes": "\\N",
        "startYear": "1909",
        "tconst": "tt0000859",
        "titleType": "movie"
      },
      {
        "_highlightResult": {
          "endYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "genres": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Drama"
          },
          "isAdult": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "0"
          },
          "originalTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Amleto"
          },
          "primaryTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Hamlet"
          },
          "runtimeMinutes": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "startYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "1908"
          },
          "tconst": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "tt0000630"
          },
          "titleType": {
            "fullyHighlighted": true,
            "matchLevel": "full",
            "matchedWords": [
              "movie"
            ],
            "value": "<em>movie</em>"
          }
        },
        "endYear": "\\N",
        "genres": "Drama",
        "isAdult": "0",
        "objectID": "Cv9Ii6pCTBqRJTtJLrEc",
        "originalTitle": "Amleto",
        "primaryTitle": "Hamlet",
        "runtimeMinutes": "\\N",
        "startYear": "1908",
        "tconst": "tt0000630",
        "titleType": "movie"
      },
      {
        "_highlightResult": {
          "endYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "genres": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "Drama"
          },
          "isAdult": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "0"
          },
          "originalTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "El pastorcito de Torrente"
          },
          "primaryTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "El pastorcito de Torrente"
          },
          "runtimeMinutes": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "startYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "1908"
          },
          "tconst": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "tt0000739"
          },
          "titleType": {
            "fullyHighlighted": true,
            "matchLevel": "full",
            "matchedWords": [
              "movie"
            ],
            "value": "<em>movie</em>"
          }
        },
        "endYear": "\\N",
        "genres": "Drama",
        "isAdult": "0",
        "objectID": "SIGRuKYoJg674sf0U4Gn",
        "originalTitle": "El pastorcito de Torrente",
        "primaryTitle": "El pastorcito de Torrente",
        "runtimeMinutes": "\\N",
        "startYear": "1908",
        "tconst": "tt0000739",
        "titleType": "movie"
      },
      {
        "_highlightResult": {
          "endYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "genres": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "isAdult": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "0"
          },
          "originalTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "De Garraf a Barcelona"
          },
          "primaryTitle": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "De Garraf a Barcelona"
          },
          "runtimeMinutes": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "\\N"
          },
          "startYear": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "1909"
          },
          "tconst": {
            "matchLevel": "none",
            "matchedWords": [],
            "value": "tt0000842"
          },
          "titleType": {
            "fullyHighlighted": true,
            "matchLevel": "full",
            "matchedWords": [
              "movie"
            ],
            "value": "<em>movie</em>"
          }
        },
        "endYear": "\\N",
        "genres": "\\N",
        "isAdult": "0",
        "objectID": "JCnlKiosX7y1K8fz1c5N",
        "originalTitle": "De Garraf a Barcelona",
        "primaryTitle": "De Garraf a Barcelona",
        "runtimeMinutes": "\\N",
        "startYear": "1909",
        "tconst": "tt0000842",
        "titleType": "movie"
      }
    ],
    "hitsPerPage": 20,
    "nbHits": 21,
    "nbPages": 2,
    "page": 0,
    "params": "query=movie",
    "processingTimeMS": 1,
    "query": "movie"
  }
}
