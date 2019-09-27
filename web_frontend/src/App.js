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
    currentTitle: null,
    search: null,
    searchQuery: "",
    loading: false,
  }

  constructor(props) {
    super(props);

    this.state = this.baseState

    this.showTitle = this.showTitle.bind(this);
    this.handleBackToResults = this.handleBackToResults.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleClearQuery = this.handleClearQuery.bind(this);
    this.saveCurrentTitle = this.saveCurrentTitle.bind(this);
  }

  showTitle(titleId) {
    this.setState({
      loading: true
    });

    fetch('/title/' + titleId)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        this.setState({
          currentTitle: json.title,
          loading: false,
        });
      });
  }

  handleTitleDisplayTitleChange(event) {
    event.preventDefault();
    this.setState({
      currentTitle: {
        display: event.target.value
      }
    });
  }

  saveCurrentTitle() {
    console.log('save current title to db');
  }

  handleBackToResults(event) {
    this.setState({
      currentTitle: null,
    })
  }

  handleQueryChange(event) {
    event.preventDefault();
    const query = event.target.value
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

  handleClearQuery(event) {
    event.preventDefault();
    this.setState(this.baseState);
  }

  render() {
    let content;

    if (this.state.loading) {
      content = <LoadingIndicator />
    } else if (this.state.currentTitle) {
      console.log('current');
      content = (
        <TitleInfo
          handleBackToResults={this.handleBackToResults}
          title={this.state.currentTitle}
          saveCurrentTitle={this.props.saveCurrentTitle}
        />
      )
    } else if (this.state.search) {
      content = (
        <SearchResultsList
          results={this.state.search.results.hits}
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

class TitleInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }

    this.handleEditTitle = this.handleEditTitle.bind(this);
    this.handleSaveTitle = this.handleSaveTitle.bind(this);
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
    this.props.saveCurrentTitle();
  }

  render() {
    let card;
    if (this.state.editing) {
      card = <TitleCardEdit
        title={this.props.title}
        handleSaveTitle={this.handleSaveTitle}
      />
    } else {
      card = <TitleCard title={this.props.title} />
    }

    return (
      <>
        <div class="row">
          <div class="col">
            <button class="btn btn-info" onClick={this.props.handleBackToResults}>&laquo; Search Results</button>
          </div>
        </div>
        <div class="row">
          <div class="col">
            {card}
          </div>
          <div class="col">
            <button class="btn btn-info" onClick={this.handleEditTitle}>Edit</button>
          </div>
        </div>
      </>
    )
  }
}

function TitleCard(props) {
  const title = props.title;
  return (
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{title.display_title} ({title.year})</h5>
        <p class="card-text">{title.description}</p>
        {title.meals && title.meals.length > 0 &&
          <Meals meals={title.meals} />
        }
      </div>
    </div>
  );
}

class TitleCardEdit extends React.Component {
  render() {
    return (
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            <input
              type="text"
              value={this.props.title.display_title}
            />
          </h5>
          <p class="card-text">
            <textarea
              value={this.props.title.description}
            />
          </p>
          <button class="btn btn-success" onClick={this.props.handleSaveTitle}>Save</button>
        </div>
      </div>
    );
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
          <div class="col">
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
          <div class="col-1">
            <button class="btn" onClick={this.props.handleClearQuery}>
              Clear
            </button>
          </div>
        </div>
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
          showTitle={this.props.showTitle}
        />
      );
    });

    return (
      <div class="list-group">{results}</div>
    );
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
