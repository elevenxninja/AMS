import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './containers/Login/Login';
import EmployeesList from './containers/EmployeesList/EmployeesList';
import Logs from './containers/Logs/Logs';
import About from './containers/About/About';
import Analytics from './containers/Analytics/Analytics';
import ManageGuards from './containers/ManageGuards/ManageGuards';
import Visitor from './containers/Visitor/Visitor';


function App() {
  return (
    <div>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/employees-list' component={EmployeesList} />
        <Route path='/logs' component={Logs} />
        <Route path='/about' component={About} />
        <Route path='/analytics' component={Analytics} />
        <Route path='/manage-guards' component={ManageGuards} />
        <Route path='/visitor-pass' component={Visitor} />
      </Switch>
    </div>
  );
}

export default App;
