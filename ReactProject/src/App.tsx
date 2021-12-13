import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
import LoginHOC from './Redux/HOC/LoginHOC';

const App=()=>{
     return(
    <Router>
      <Switch>
        <Route path="/login">
          <LoginHOC/>
        </Route>
        <ProtectedRoute path="/home">
          
        </ProtectedRoute>
        <Route exact path="/">
          <Redirect exact from="/" to="home" />
        </Route>
        <Route path="*">
          <Redirect exact from="/" to="home" />
        </Route>
      </Switch>
    </Router>
     )
}
export default App;
