import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Discover from './components/Discover';
import Contribute from './components/Contribute';
import Recipe from './components/Recipe';
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
            <Route path="/contribute" component={Contribute} />
            <Route path="/discover" component={Discover} />
            <Route path="/recipes/:recipeID" component={Recipe} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>  
    );
  }
}
 
export default App;