import React from 'react';

import './App.css';

import {Home} from './components';

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

export default App;
