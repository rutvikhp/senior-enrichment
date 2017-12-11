import React, { Component } from 'react';
import store, {fetchStudents,fetchCampuses} from '../store'
import { Route, NavLink, BrowserRouter as Router, Switch} from 'react-router-dom';
import Students from './Students'
import Campuses from './Campuses'
import SingleCampus from './SingleCampus'
import SingleStudent from './SingleStudent'
import AddStudent from './AddStudent'
import AddCampus from './AddCampus'
import EditCampus from './EditCampus'
import EditStudent from './EditStudent'
export default class Root extends Component {

constructor(){
  super();
  this.state = store.getState()
}

componentDidMount(){
  this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  store.dispatch(fetchStudents())
  store.dispatch(fetchCampuses())
}
componentWillUnmount(){
  this.unsubscribe()
}
  render(){
    return(
      <Router>
      <div>
        <NavLink to = '/campuses'><button>Campuses</button></NavLink>
        <NavLink to = '/students'><button>Students</button></NavLink>
        <hr />
        <Switch>
          <Route exact path = '/students' component = {Students} />
          <Route exact path = '/students/addStudent' render = { () => <AddStudent campuses={this.state.campuses} /> } />
          <Route exact path = '/students/editStudent' render = { () => <EditStudent students = {this.state.students} campuses={this.state.campuses} /> } />
          <Route exact path = '/students/:id' component = {SingleStudent} />
          <Route exact path = '/campuses' component = {Campuses} />
          <Route exact path = '/campuses/addCampus' component = {AddCampus} />
          <Route exact path = '/campuses/editCampus' render = { () => <EditCampus campuses = {this.state.campuses} /> } />
          <Route exact path = '/campuses/:id' component = {SingleCampus} />
        </Switch>
      </div>
      </Router>
    )
  }
}
