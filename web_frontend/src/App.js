import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTitle: null,
      search: null,
      searchQuery: null,
    }

    this.titleClick = this.titleClick.bind(this);
    this.handleBackToResults = this.handleBackToResults.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
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

  handleBackToResults(event) {
    this.setState({
      currentTitle: null,
    })
  }

  handleQueryChange(query) {
    this.setState({
      searchQuery: query,
    });

    if (query) {
      fetch('/search?q=' + query)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          this.setState({
            search: json,
          });
        })
    } else {
      this.setState({
        search: null,
      })
    }
  }

  render() {
    let content;

    if (this.state.currentTitle) {
      content = (
        <div>
          <button onClick={this.handleBackToResults}>Back to results</button>
          <TitleInfo title={this.state.currentTitle} />
        </div>

      )
    } else {
      content = (
        <TitleSearchWidget searchQuery={this.state.searchQuery} search={this.state.search} onTitleClick={this.titleClick} onQueryChange={this.handleQueryChange} />
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

class TitleInfo extends React.Component {
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
  render() {
    return (
      <div>
        <SearchBar query={this.props.searchQuery} onChange={this.props.onQueryChange} />
        {this.props.search &&
          <SearchResultsList results={this.props.search.results.hits} onTitleClick={this.props.onTitleClick} />
        }
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
