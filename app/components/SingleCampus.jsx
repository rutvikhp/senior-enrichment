import React, { Component } from 'react';
import store, {fetchCampusById} from '../store';
import {NavLink} from 'react-router-dom';
export default class SingleCampus extends Component{
  constructor(){
    super();
    this.state = store.getState();
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(()=> this.setState(store.getState()))
    store.dispatch(fetchCampusById(this.props.match.params.id))
  }
  componentWillUnmount(){
    this.unsubscribe()
  }
  render(){
    const campus = this.state.campus;
    return (
      <div>
        <h1>{campus.name}</h1>
        {/* <img src = {campus.imageUrl} height='100' width = '150' /> */}
        <p>Description : {campus.description}</p>
        <p>Below are list of students</p>
        <ol>
          {
            (campus.students) &&
            campus.students.map(student=>{
              return (
                  <li key = {student.id}>
                    <NavLink to={`/students/${student.id}`}>
                      {student.name}
                    </NavLink>
                  </li>
              )
            })
          }
        </ol>
        <NavLink to = '/students/addStudent'>
          <button> Add Student </button>
        </NavLink>
        <NavLink to = '/campuses/editCampus'>
          <button> Edit Campus </button>
        </NavLink>
      </div>
    )
  }
}
