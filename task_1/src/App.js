import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import CustomerList from './components/CustomerList';
import Trainings from './components/Trainings';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Personal Training</h2>
       
        </header>

        <Router>
          <div>
          <Button variant="outlined" >
      <Link style={{ textDecoration: 'none', color: 'grey' }} to="/customers">Customers</Link>{' '}
      </Button>
      <Button variant="outlined" >
      <Link style={{ textDecoration: 'none', color: 'grey' }} to="/trainings">Trainings</Link>{' '}
      </Button>
            


        <Route path="/customers" component={CustomerList} />
        <Route path="/trainings" component={Trainings} />

          </div>


        </Router>

      </div>
    );
  }
}

export default App;
