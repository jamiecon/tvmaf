import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'home'
    }
    this.navigateHome = this.navigateHome.bind(this);
    this.navigateAbout = this.navigateAbout.bind(this);
  }

  navigateHome(event) {
    this.setState({
      page: 'home'
    });
    event.preventDefault();
  }

  navigateAbout(event) {
    this.setState({
      page: 'about'
    })
    event.preventDefault();
  }

  render() {
    let page
    if (this.state.page === 'home') {
      page = <Home />
    } else if (this.state.page === 'about') {
      page = <About />
    }

    return (
      <div>
        <HeaderBar
          navigateHome={this.navigateHome}
          navigateAbout={this.navigateAbout}
        />
        <main role="main">
          {page}
        </main>
      </div>
    );
  }
}

function HeaderBar(props) {
  return (
    <nav class="navbar navbar-expand-md navbar-dark static-top bg-dark">
      <a class="navbar-brand" href="/">tvmaf</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a
              onClick={props.navigateHome}
              class="nav-link"
              href="#"
            >
              Home
            </a>
          </li>
          <li class="nav-item">
            <a
              onClick={props.navigateAbout}
              class="nav-link"
              href="#"
            >
              About
            </a>
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

function About(props) {
  return (
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>About</h1>
          <p>Test application using the following services and technologies:</p>
          <dl>
            <dt>Front end</dt>
            <dd>React</dd>

            <dt>Back end</dt>
            <dd>Google App Engine, Flask</dd>

            <dt>Persistence</dt>
            <dd>Firestore</dd>

            <dt>Search</dt>
            <dd>Algolia</dd>

            <dt>Plumbing</dt>
            <dd>Google Cloud Functions</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}

class Home extends React.Component {
  baseState = {
    page: 'home',
    currentTitleId: null,
    searchQuery: "",
    loading: false,
  }

  constructor(props) {
    super(props);

    this.state = this.baseState;

    this.showTitle = this.showTitle.bind(this);
    this.handleShowResults = this.handleShowResults.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleClearQuery = this.handleClearQuery.bind(this);
  }

  showTitle(titleId) {
    this.setState({
      currentTitleId: titleId
    });
  }

  handleShowResults(event) {
    event.preventDefault();
    this.setState({
      currentTitleId: null,
    })
  }

  handleQueryChange(event) {
    event.preventDefault();
    this.setState({
      searchQuery: event.target.value,
      currentTitleId: null,
    });
  }

  handleClearQuery(event) {
    event.preventDefault();
    this.setState(this.baseState);
  }

  render() {
    let content;

    if (this.state.loading) {
      content = <LoadingIndicator />
    } else if (this.state.currentTitleId) {
      content = (
        <TitleCard
          handleBackToResults={this.handleShowResults}
          titleId={this.state.currentTitleId}
        />
      )
    } else if (this.state.searchQuery) {
      content = (
        <SearchResults
          query={this.state.searchQuery}
          showTitle={this.showTitle}
        />
      )
    }
    return (
      <>
        <div class="jumbotron pt-0">
          <div class="container">
            <h1 class="display-3">tv, movies and food!</h1>
            <p>Yes, this incredibly useful web site does exactly what it says on the tin. A comprehensive database
        of food served in your favourite TV shows and movies.</p>
            <SearchField
              query={this.state.searchQuery}
              handleQueryChange={this.handleQueryChange}
              handleClearQuery={this.handleClearQuery}
              handleShowResults={this.handleShowResults}
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
      </>
    );
  }
}

class TitleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      loading: true,
      title: null,
      titleDisplayTitle: null,
      titleDescription: null,
    }

    this.handleEditTitle = this.handleEditTitle.bind(this);
    this.handleSaveTitle = this.handleSaveTitle.bind(this);
    this.handleDisplayTitleChange = this.handleDisplayTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
  }

  componentDidMount() {
    fetch('/title/' + this.props.titleId)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          titleDisplayTitle: json.title.display_title,
          titleDescription: json.title.description,
          titleYear: json.title.year,
          loading: false,
        });
      });
  }

  handleEditTitle(event) {
    event.preventDefault();
    this.setState({
      editing: true
    })
  }

  handleSaveTitle(event) {
    event.preventDefault();
    this.setState({
      editing: false
    })

    
  }

  handleDisplayTitleChange(event) {
    event.preventDefault();
    this.setState({
      titleDisplayTitle: event.target.value
    });
  }

  handleDescriptionChange(event) {
    event.preventDefault();
    this.setState({
      titleDescription: event.target.value
    });
  }

  handleYearChange(event) {
    event.preventDefault();
    this.setState({
      titleYear: event.target.value
    });
  }

  render() {
    let card;
    if (this.state.loading) {
      card = <LoadingIndicator />
    }
    else if (this.state.editing) {
      card = <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            <input
              type="text"
              value={this.state.titleDisplayTitle}
              onChange={this.handleDisplayTitleChange}
            />
            <input
              type="text"
              value={this.state.titleYear}
              onChange={this.handleYearChange}
            />
          </h5>
          <p class="card-text">
            <textarea
              value={this.state.titleDescription}
              onChange={this.handleDescriptionChange}
            />
          </p>
          <button class="btn btn-success" onClick={this.handleSaveTitle}>Save</button>
        </div>
      </div>
    } else {
      card = <div class="card">
        <div class="card-body">
          <h5 class="card-title">{this.state.titleDisplayTitle} ({this.state.titleYear})</h5>
          <p class="card-text">{this.state.titleDescription}</p>
          <button class="btn btn-info" onClick={this.handleEditTitle}>Edit</button>
        </div>
      </div>
    }

    return (
      <div class="row">
        <div class="col">
          {card}
        </div>
      </div>
    )
  }
}

class Meals extends React.Component {
  render() {
    return (
      <>
        <h6>Meals</h6>
        <ul>
          {
            this.props.meals.map((meal, index) => (
              <MealInfo meal={meal} key={index} />
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
  render() {
    return (
      <form>
        <div class="row">
          <div class="col-sm-12 col-md-9">
            <input
              type="text"
              class="form-control"
              placeholder="Search for TV shows, movies or foods"
              aria-label="Search"
              name="query"
              id="query"
              value={this.props.query}
              onChange={this.props.handleQueryChange}
            ></input>
          </div>
          <div class="col-sm-12 col-md-3">
            <button class="btn btn-primary mr-1" onClick={this.props.handleShowResults}>
              Results
            </button>
            <button class="btn btn-secondary" onClick={this.props.handleClearQuery}>
              Clear
            </button>
          </div>
        </div>
      </form>
    );
  }
}

class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      results: null,
    }
  }

  fetchResults(query) {
    fetch('/search?q=' + query)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          results: json.results.hits,
          loading: false,
        });
      })
  }

  componentDidMount() {
    this.fetchResults(this.props.query);
  }

  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.fetchResults(this.props.query);
    }
  }

  render() {
    let content;
    if (this.state.loading) {
      content = <LoadingIndicator />
    } else if (this.state.results) {
      const results = this.state.results.map((result) => {
        return (
          <SearchResult
            key={result.objectID}
            titleId={result.objectID}
            titleName={result.displayTitle}
            showTitle={this.props.showTitle}
          />
        );
      });

      content = (
        <div class="list-group">{results}</div>
      )
    }
    return content;
  }
}

class SearchResult extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearchResultClick = this.handleSearchResultClick.bind(this);
  }

  handleSearchResultClick(event) {
    this.props.showTitle(this.props.titleId);
  }

  render() {
    return (
      <button
        class="list-group-item list-group-item-action"
        onClick={this.handleSearchResultClick}
      >
        {this.props.titleName}
      </button>
    );
  }
}

function LoadingIndicator(props) {
  return (
    <div class="row">
      <div class="col-sm text-center">
        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default App;
