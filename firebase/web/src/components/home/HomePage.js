import React from 'react';

import db from '../common/firestore';
import searchIndex from '../common/algolia';
import PrettyDuration from '../common/PrettyDuration';

class HomePage extends React.Component {
  baseState = {
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
        <Title
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
        <div className="jumbotron pt-0">
          <div className="container">
            <h1 className="display-3">tv, movies and food!</h1>
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

        <div className="container">
          <div className="row">
            <div className="col">
              {content}
            </div>
          </div>
        </div>
      </>
    );
  }
}

class SearchField extends React.Component {
  render() {
    return (
      <form>
        <div className="row">
          <div className="col-sm-12 col-md-9">
            <input
              type="text"
              className="form-control"
              placeholder="Search for TV shows, movies or foods"
              aria-label="Search"
              name="query"
              id="query"
              value={this.props.query}
              onChange={this.props.handleQueryChange}
            ></input>
          </div>
          <div className="col-sm-12 col-md-3">
            <button className="btn btn-primary mr-1" onClick={this.props.handleShowResults}>
              Results
            </button>
            <button className="btn btn-secondary" onClick={this.props.handleClearQuery}>
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
    searchIndex.search({
      query: query
    },
      (err, { hits } = {}) => {
        if (err) throw err;
        this.setState({
          results: hits,
          loading: false,
        });
      }
    );
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
        <div className="list-group">{results}</div>
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
        className="list-group-item list-group-item-action"
        onClick={this.handleSearchResultClick}
      >
        {this.props.titleName}
      </button>
    );
  }
}

class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      loading: true,
      titleDisplayTitle: null,
      titleDescription: null,
      titleYear: null
    }

    this.handleEditTitle = this.handleEditTitle.bind(this);
    this.handleSaveTitle = this.handleSaveTitle.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
    this.handleDisplayTitleChange = this.handleDisplayTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
  }

  componentDidMount() {
    this.loadTitleData();
  }

  loadTitleData() {
    db.collection('title').doc(this.props.titleId).get().then((doc) => {
      const title = doc.data();
      this.setState({
        titleDisplayTitle: title.display_title,
        titleDescription: title.description,
        titleYear: title.year,
        imdbId: title.imdb_id,
        netflixId: title.netflix_id,
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
      loading: true,
      editing: false
    })

    var title_ref = db.collection('title').doc(this.props.titleId)
    title_ref.set({
      'display_title': this.state.titleDisplayTitle,
      'description': this.state.titleDescription,
      'year': this.state.titleYear
    }, { merge: true }).then(() => {
      this.setState({
        loading: false
      })
    })
  }

  handleCancelEdit(event) {
    event.preventDefault();

    this.setState({
      editing: false,
      loading: true,
    })

    this.loadTitleData();
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
      card = (<div className="card">
        <div className="card-body">
          <h4>Edit <small>{this.state.titleDisplayTitle}</small></h4>
          <div className="form-group">
            <label for="title_display_title">Name</label>
            <input
              id="title_display_title"
              className="form-control"
              type="text"
              value={this.state.titleDisplayTitle}
              onChange={this.handleDisplayTitleChange}
            />
          </div>
          <div className="form-group">
            <label for="title_title_year">Year</label>
            <input
              id="title_title_year"
              className="form-control"
              type="number"
              value={this.state.titleYear}
              onChange={this.handleYearChange}
            />
          </div>
          <div className="form-group">
            <label for="title_title_description">Description</label>
            <textarea
              id="title_title_description"
              className="form-control"
              value={this.state.titleDescription}
              onChange={this.handleDescriptionChange}
            />
          </div>
          <button className="btn btn-primary mr-1" onClick={this.handleSaveTitle}>Save</button>
          <button className="btn btn-secondary" onClick={this.handleCancelEdit}>Cancel</button>
        </div>
      </div>)
    } else {
      card = (
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-lg-6">
                <h4 className="card-title">{this.state.titleDisplayTitle} ({this.state.titleYear})</h4>
                <TitleLinks
                  netflixId={this.state.netflixId}
                  imdbId={this.state.imdbId}
                />
                <p className="card-text">{this.state.titleDescription}</p>
                <button className="btn btn-info" onClick={this.handleEditTitle}>Edit</button>
              </div>
              <div className="col-md-12 col-lg-6">
                <Meals
                  titleId={this.props.titleId}
                  netflixId={this.state.netflixId}
                />
              </div>
            </div>
          </div>

        </div>
      )
    }

    return (
      <div className="row">
        <div className="col">
          {card}
        </div>
      </div>
    )
  }
}

function TitleLinks(props) {
  if (props.imdbId || props.netflixId) {
    return (<ul className="list-group list-group-horizontal">
      {props.netflixId &&
        <TitleLink
          url={'https://www.netflix.com/watch/' + props.netflixId}
          anchorText="Netflix"
        />}
      {props.imdbId &&
        <TitleLink
          url={'https://www.imdb.com/title/' + props.imdbId}
          anchorText="IMDb"
        />}
    </ul>)
  } else {
    return null;
  }
}

function TitleLink(props) {
  return (
    <li className="list-group-item py-0">
      <a
        href={props.url}>
        {props.anchorText}
      </a>
    </li>
  )
}

class Meals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      meals: null,
      adding: false,
    }

    this.handleAddMeal = this.handleAddMeal.bind(this);
    this.handleCancelAddMeal = this.handleCancelAddMeal.bind(this);
    this.finishAdding = this.finishAdding.bind(this);
    this.loadMeals = this.loadMeals.bind(this);
  }

  componentDidMount() {
    this.loadMeals();
  }

  componentDidUpdate() {
    this.loadMeals();
  }

  loadMeals() {
    var collection = db.collection('title').doc(this.props.titleId).collection('meal')
    collection.get().then((snapshot) => {
      let meals = []
      snapshot.forEach((doc) => {
        let meal = doc.data()
        meal.id = doc.id;
        meals.push(meal);
      })
      this.setState({
        meals: meals
      })
    })
  }

  handleAddMeal(event) {
    event.preventDefault();
    this.setState({
      adding: true,
    });
  }

  handleCancelAddMeal(event) {
    event.preventDefault();
    this.setState({
      adding: false,
    })
  }

  finishAdding() {
    this.setState({
      adding: false
    })
  }

  render() {
    if (this.state.adding) {
      return (
        <AddMeal
          titleId={this.props.titleId}
          handleCancelAddMeal={this.handleCancelAddMeal}
          finishAdding={this.finishAdding}
        />
      )
    } else {
      let content
      if (this.state.meals && this.state.meals.length > 0) {
        content = this.state.meals.map((meal) => {
          return (
            <Meal
              key={meal.id}
              meal={meal}
              netflixId={this.props.netflixId}
            />
          );
        })
      }

      return (
        <>
          <div className="list-group">
            {content}
          </div>
          <button onClick={this.handleAddMeal} className="btn btn-primary mt-1">Add a meal</button>
        </>
      )
    }
  }
}

class Meal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
    }

    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleEditClick(event) {
    event.preventDefault();
    this.setState({
      editing: true,
    })
  }

  render() {
    let content;

    if (this.state.editing) {
      content = <span>Editing</span>;
    } else {
      content = (
        <>
          <h5>{this.props.meal.meal_name}</h5>
          <dl className="row">
            <dt className="col-3">Time</dt>
            <dd className="col-9"><PrettyDuration seconds={this.props.meal.time_seconds} /></dd>
            <dt className="col-3">Watch Scene</dt>
            <dd className="col-9">
              <a href={'https://www.netflix.com/watch/' + this.props.netflixId + '?t=' + this.props.meal.time_seconds}>
                Netflix
            </a>
            </dd>
            <dt className="col-3">Recipes</dt>
            <dd className="col-9"></dd>
          </dl>
          <button onClick={this.handleEditClick} className="btn btn-sm btn-primary">Edit</button>
        </>
      );
    }

    return (<div className="list-group-item">{content}</div>)
  }
}

class AddMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mealName: null,
      timeSeconds: null,
    }

    this.handleMealNameChange = this.handleMealNameChange.bind(this);
    this.handleSecondsChange = this.handleSecondsChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleMealNameChange(event) {
    event.preventDefault();
    this.setState({
      mealName: event.target.value
    })
  }

  handleSecondsChange(event) {
    event.preventDefault();
    this.setState({
      timeSeconds: event.target.value
    })
  }

  handleSave(event) {
    event.preventDefault();
    const meals_collection = db.collection('title').doc(this.props.titleId).collection('meal');
    meals_collection.add({
      'meal_name': this.state.mealName,
      'time_seconds': this.state.timeSeconds
    }).then(() => this.props.finishAdding());
  }

  render() {
    return (
      <form>
        <h5>Add a meal</h5>
        <div className="form-group">
          <label for="addmeal_mealname">Meal name</label>
          <input
            className="form-control"
            id="addmeal_mealname"
            type="text"
            value={this.state.mealName}
            onChange={this.handleMealNameChange}
          />
        </div>
        <div className="form-group">
          <label for="addmeal_time_seconds">Seconds</label>
          <input
            className="form-control"
            id="addmeal_time_seconds"
            type="text"
            value={this.state.timeSeconds}
            onChange={this.handleSecondsChange}
          />
        </div>
        <button
          className="btn btn-sm btn-primary mr-1"
          onClick={this.handleSave}
        >Save</button>
        <button
          className="btn btn-sm btn-secondary"
          onClick={this.props.handleCancelAddMeal}
        >Cancel</button>
      </form>
    );
  }
}

function LoadingIndicator(props) {
  return (
    <div className="row">
      <div className="col-sm text-center">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;
