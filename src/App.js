import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Login from './containers/Login/Login';

function App() {
  return (
    <div>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/employees-list' component={Layout} />
      </Switch>
    </div>
  );
}

export default App;
