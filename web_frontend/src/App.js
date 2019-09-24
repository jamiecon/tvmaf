import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTitle: null,
      search: null,
      searchQuery: "",
      loading: false,
    }

    this.titleClick = this.titleClick.bind(this);
    this.handleBackToResults = this.handleBackToResults.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  titleClick(titleId) {
    this.setState({
      loading: true
    });

    fetch('/title/' + titleId)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json.title);
        this.setState({
          currentTitle: json.title,
          loading: false,
        });
      });
  }

  handleBackToResults(event) {
    this.setState({
      currentTitle: null,
    })
  }

  handleQueryChange(query) {
    this.setState({
      searchQuery: query,
      loading: true,
      currentTitle: null,
    });

    if (query) {
      fetch('/search?q=' + query)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          this.setState({
            search: json,
            loading: false,
          });
        })
    } else {
      this.setState({
        search: null,
        loading: false,
      })
    }
  }

  render() {
    let content;

    if (this.state.loading) {
      content = <LoadingIndicator />
    } else if (this.state.currentTitle) {
      content = (
        <div>
          <button onClick={this.handleBackToResults}>Back to results</button>
          <TitleInfo title={this.state.currentTitle} />
        </div>

      )
    } else if (this.state.search) {
      content = (
        <SearchResultsList
          results={this.state.search.results.hits}
          onTitleClick={this.titleClick}
        />
      )
    }
    return (
      <div className="App" >
        <HeaderBar />
        <main role="main">
          <div class="jumbotron">
            <div class="container">
              <h1 class="display-3">tv, movies and food!</h1>
              <p>Yes, this incredibly useful web site does exactly what it says on the tin. A comprehensive database
            of food served in your favourite TV shows and movies.</p>
              <SearchField
                query={this.props.searchQuery}
                onChange={this.handleQueryChange}
              />
            </div>
          </div>

          <div class="container">
            <div class="row">
              <div class="col">
                {content}
              </div>
            </div>
          </div>
        </main>

      </div>
    );
  }
}

function HeaderBar(props) {
  return (
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a class="navbar-brand" href="/">tvmaf</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">About</a>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="https://github.com/jamiecon/tvmaf/">GitHub</a>
          </li>
        </ul>
      </div>
    </nav>

  )
}

class TitleInfo extends React.Component {
  render() {
    const title = this.props.title;
    return (
      <>
        <h3>
          {title.display_title} ({title.year})
        </h3>
        {title.meals && title.meals.length > 0 &&
          <Meals meals={title.meals} />
        }
      </>
    )
  }
}

class Meals extends React.Component {
  render() {
    return (
      <>
        <h4>Meals</h4>
        <ul>
          {
            this.props.meals.map(meal => (
              <MealInfo meal={meal} />
            ))
          }
        </ul>
      </>
    )
  }
}

class MealInfo extends React.Component {
  render() {
    const meal = this.props.meal;

    return (
      <li>
        {meal.meal_name}
        <a href="https://www.netflix.com/title/">See on Netflix</a>
      </li>
    );
  }
}

class SearchField extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          class="form-control"
          placeholder="Search for TV shows, movies or foods"
          aria-label="Search"
          name="query"
          id="query"
          value={this.props.query}
          onChange={this.handleChange}
        ></input>
      </form>
    );
  }
}

class SearchResultsList extends React.Component {
  render() {
    const results = this.props.results.map((result) => {
      return (
        <SearchResult
          key={result.objectID}
          titleId={result.objectID}
          titleName={result.displayTitle}
          onTitleClick={this.props.onTitleClick}
        />
      );
    });

    return (
      <ul class="list-group search-results">{results}</ul>
    );
  }
}

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(event) {
    this.props.onTitleClick(this.props.titleId);
  }

  render() {
    return (
      <li class="list-group-item">
        <button class="btn btn-link" onClick={this.handleButtonClick}>
          {this.props.titleName}
        </button>
      </li>
    );
  }
}

function LoadingIndicator(props) {
  return (
    <div class="col-sm text-center">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default App;
