import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import HeaderBar from './common/Header';
import PageNotFound from './PageNotFound';

class App extends React.Component {
  render() {
    return (
      <div>
        <HeaderBar
          navigateHome={this.navigateHome}
          navigateAbout={this.navigateAbout}
        />
        <main role="main">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route component={PageNotFound} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
