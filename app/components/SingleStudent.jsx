import React, { Component } from 'react';
import store, {fetchStudentById} from '../store';
import {NavLink} from 'react-router-dom'
export default class SingleStudent extends Component{
  constructor(){
    super();
    this.state = store.getState();
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(()=> this.setState(store.getState()))
    store.dispatch(fetchStudentById(this.props.match.params.id))
  }
  componentWillUnmount(){
    this.unsubscribe()
  }
  render(){
    const student = this.state.student;
    return(
      <div>
        {
          (student) &&
          <div>
            <h1>{student.name}</h1>
            <p>Email: {student.email}</p>
            <p>GPA: {student.gpa}</p>
              <p>Campus: {
                (student.campus) &&
                <NavLink to={`/campuses/${student.campus.id}`}>
                  {student.campus.name}
                </NavLink>
              }
              </p>
          </div>
        }
        <NavLink to = '/students/editStudent'>
          <button> Edit Student </button>
        </NavLink>
      </div>
    )
  }
}
