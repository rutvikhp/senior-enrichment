import React, { Component } from 'react';
import store,{fetchStudents,deleteStudent} from '../store'
import {NavLink} from 'react-router-dom'
export default class Students extends Component{

  constructor(){
    super();
    this.state = store.getState();
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    store.dispatch(fetchStudents());
  }
  componentWillUnmount(){
    this.unsubscribe();
  }

  handleClick (studentId) {
    store.dispatch(deleteStudent(studentId));
  }
  //How to use table tag in react?
  //What should we keep in mind when using table in react
  //I am having couple of warning about validateDOMNesting
  render(){
    const students = this.state.students;
    return (
      <div>
        <NavLink to = '/students/addStudent'>
          <button> Add Student </button>
        </NavLink>
        <NavLink to = '/students/editStudent'>
          <button> Edit Student </button>
        </NavLink>
        <p>Click on student name to navigate to its page</p>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Campus</th>
              <th>Want to delete?</th>
            </tr>
          </thead>
          <tbody>
          { (students.length) &&
            students.map(student => {
              return (
                <tr key ={student.id}>
                  <td>{ student.id }</td>
                    <td>
                      <NavLink to={`/students/${student.id}`}>
                        { student.name }
                      </NavLink>
                    </td>
                    <td>
                      <NavLink to={`/campuses/${student.campus.id}`}>
                        { student.campus.name }
                      </NavLink>
                    </td>
                  <td><button onClick = {()=> this.handleClick(student.id)}>X</button></td>
                </tr>
              )
            })
          }
        </tbody>
        </table>
      </div>
    )
  }
}
