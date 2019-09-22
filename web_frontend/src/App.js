import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTitle: null,
    }

    this.titleClick = this.titleClick.bind(this);
  }

  titleClick(titleId) {
    fetch('/title/' + titleId)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          currentTitle: json.title
        });
      });
  }

  render() {
    let content;

    if (this.state.currentTitle) {
      content = (
        <Title title={this.state.currentTitle} />
      )
    } else {
      content = (
        <TitleSearchWidget onTitleClick={this.titleClick} />
      )
    }
    return (
      <div className="App" >
        <HeaderBar />
        {content}
      </div>
    );
  }
}

class HeaderBar extends React.PureComponent {
  render() {
    return (
      <h1>tvmaf</h1>
    );
  }
}

class Title extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h3>{this.props.title.originalTitle}</h3>
    )
  }
}

class TitleSearchWidget extends React.Component {
  constructor(props) {
    super(props)

    // Find a way to set this for empty results and initially
    this.state = {
      search: {
        results: {
          hits: [],
        }
      },
      query: ''
    }

    this.onQueryChange = this.onQueryChange.bind(this);
    this.setEmptyResults = this.setEmptyResults.bind(this);
  }

  setEmptyResults() {
    this.setState({
      search: {
        results: {
          hits: [],
        }
      },
      query: ''
    });
  }

  runSearch(query) {
    fetch('/search?q=' + query)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          search: json,
        });
      })
  }

  onQueryChange(query) {
    this.setState({
      query: query
    })

    if (query) {
      this.runSearch(query);
    } else {
      console.log("setting empty");
      this.setEmptyResults();
    }
  }

  render() {
    return (
      <div>
        <SearchBar query={this.state.query} onChange={this.onQueryChange} />
        <SearchResultsList results={this.state.search.results.hits} onTitleClick={this.props.onTitleClick} />
      </div>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <div>
        <label htmlFor="query">Search for title</label>
        <input
          type="text"
          name="query"
          id="query"
          value={this.props.query}
          onChange={this.handleChange}
        />
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
          titleId={result.tconst}
          titleName={result.originalTitle}
          onTitleClick={this.props.onTitleClick}
        />
      );
    });

    return (
      <ul>{results}</ul>
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
      <li>
        <button onClick={this.handleButtonClick}>
          {this.props.titleName}
        </button>
      </li>
    );
  }
}

export default App;
