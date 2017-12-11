import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import store, {fetchCampuses, deleteCampus} from '../store';
export default class Campuses extends Component{

  constructor(){
    super();
    this.state = store.getState();
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    store.dispatch(fetchCampuses());
  }
  componentWillUnmount(){
    this.unsubscribe();
  }
  handleClick(campusId){
    store.dispatch(deleteCampus(campusId))
  }
  render(){
    const campuses = this.state.campuses;
    return (
      <div>
        <NavLink to = "/campuses/addCampus">
          <button> Add Campus </button>
        </NavLink>
        <ul>
          {
            campuses.map(campus => {
              return (
                <li key = {campus.id} >
                <NavLink to={`/campuses/${campus.id}`}>
                   <div>{ campus.name }</div>
                   <img src = {campus.imageUrl} height='100' width = '150'/>
                </NavLink>
                <button onClick = {() => this.handleClick(campus.id)} >Delete me!!!</button>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
