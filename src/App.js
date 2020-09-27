import React from 'react';
import './App.css';
import Login from './Login.js'
import Ec2Service from './Ec2Service.js'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
         <Switch>
           <Route path="/" exact component={Login}/>
           <Route path="/ec2/:owner" component={Ec2Service}/>
         </Switch>       
      </Router>
    </div>
  );
}

export default App;
