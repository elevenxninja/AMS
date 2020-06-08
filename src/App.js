import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './containers/Login/Login';
import EmployeesList from './containers/EmployeesList/EmployeesList';
import Logs from './containers/Logs/Logs';

function App() {
  return (
    <div>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/employees-list' component={EmployeesList} />
        <Route path='/logs' component={Logs} />
      </Switch>
    </div>
  );
}

export default App;
