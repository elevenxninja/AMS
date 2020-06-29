import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


import Login from './containers/Login/Login';
import EmployeesList from './containers/EmployeesList/EmployeesList';
import Logs from './containers/Logs/Logs';
import About from './containers/About/About';
import Analytics from './containers/Analytics/Analytics';
import ManageGuards from './containers/ManageGuards/ManageGuards';
import Visitor from './containers/Visitor/Visitor';
import Logout from './containers/Logout/Logout';
import UserProfile from './containers/UserProfile/UserProfile';


class App extends React.Component {
  // componentDidMount(){
  //   this.props.onCheckAuth();
  // }

  render(){
  let redirect = null;
  // let redirectToMain = null;
  if(!this.props.authed){
    redirect = <Redirect to='/' />
  }
  // if(this.props.authed){
  //   redirectToMain = <Redirect to='/employees-list' from='/' exact/>
  // }
  return (
    <div>
      <Switch>
        <Route path='/' exact component={Login} />
        {redirect}
        <Route path='/employees-list' component={EmployeesList} />
        {/* {redirectToMain} */}
        <Route path='/profile' component={UserProfile} />
        <Route path='/logs' component={Logs} />
        <Route path='/about' component={About} />
        <Route path='/analytics' component={Analytics} />
        <Route path='/manage-guards' component={ManageGuards} />
        <Route path='/visitor-pass' component={Visitor} />
        <Route path='/logout' component={Logout}/>
      </Switch>
    </div>
  );
}
}

const mapStateToProps = state =>{
  return{
    authed: state.isLogin,
  }
}

// const mapDispatchToProps = dispatch =>{
//   return{
//     onCheckAuth: () => dispatch(authAutoCheck())
//   }
// }

export default connect(mapStateToProps)(App);
