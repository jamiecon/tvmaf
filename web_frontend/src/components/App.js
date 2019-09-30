import React from 'react';
import { Route } from 'react-router-dom';

import './App.css';

import { HomePage } from './home/HomePage';
import { AboutPage } from './about/AboutPage';
import { HeaderBar } from './common/Header';

class App extends React.Component {
  render() {
    return (
      <div>
        <HeaderBar
          navigateHome={this.navigateHome}
          navigateAbout={this.navigateAbout}
        />
        <main role="main">
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
        </main>
      </div>
    );
  }
}

export default App;
