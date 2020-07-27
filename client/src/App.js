import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Discover from './components/Discover';
import Contribute from './components/Contribute';
import Recipe from './components/Recipe';
import Bookmarks from './components/Bookmarks';
import Account from './components/Account';
import Profile from './components/Profile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  state = {  }

  render() { 
    return (
      <Router>
        <div>
          <Navbar></Navbar>
          <Switch>
            <Route exact path="/bookmarks" component={Bookmarks} />
            <Route exact path="/contribute" component={Contribute} />
            <Route exact path="/discover" component={Discover} />
            <Route exact path="/recipes/:recipeID" component={Recipe} />
            <Route exact path="/user/account" component={Account} />
            <Route exact path="/users/:username" component={Profile} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>  
    );
  }
}
 
export default App;