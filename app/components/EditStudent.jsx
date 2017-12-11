import React, {Component} from 'react';
import store, {fetchStudentById, updateStudent} from '../store';
import {withRouter} from 'react-router-dom';

export class EditCampus extends Component {

  constructor(){
    super();
    this.state = store.getState();
    this.handleStudent = this.handleStudent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }
  componentWillUnmount(){
    this.unsubscribe();
  }
  handleStudent(e){
    store.dispatch(fetchStudentById(e.target.value))
  }
  handleSubmit(evt){
    evt.preventDefault();
    const studentId = evt.target.selected.value;
    const firstName = evt.target.firstName.value || this.state.student.firstName;
    const lastName = evt.target.lastName.value || this.state.student.lastName;
    const email = evt.target.email.value || this.state.student.email;
    const gpa = evt.target.gpa.value || this.state.student.gpa;
    const campusId = evt.target.selectedCampus.value || this.state.student.campusId;
    const student = {
      studentId,
      firstName,
      lastName,
      email,
      gpa,
      campusId
    }
    store.dispatch(updateStudent(student))
    this.props.history.push('/students')
  }

  render(){
    const students = this.props.students;
    const campuses = this.props.campuses;
    return (
      <form onSubmit={this.handleSubmit}>
        <label> Select a student to edit: </label>
        <select name='selected' value={this.state.student.id} onChange = {this.handleStudent}>
          <option>Select a Student</option>
          {
            (students.length) &&
            students.map(student => {
              return (
                <option key = {student.id} value={student.id}>
                  {student.name}
                </option>
              )
            })
          }
        </select>
        <br />
        <label> Change First Name: </label>
        <input type = "text" name = "firstName" placeholder={this.state.student.firstName}/>
        <br />
        <label> Change Last Name: </label>
        <input type = "text" name = "lastName" placeholder={this.state.student.lastName}/>
        <br />
        <label> Change Email: </label>
        <textarea name='email' placeholder={this.state.student.email}/>
        <br />
        <label> Change GPA: </label>
        <textarea name='gpa' placeholder={this.state.student.gpa}/>
        <br />
        <select name='selectedCampus' >
          <option value={(this.state.student.campus) ? this.state.student.campus.id : 'Select a campus'}>
            {(this.state.student.campus) ? this.state.student.campus.name : 'Select a campus'}
          </option>
          {
            (campuses.length) &&
            campuses.map(campus => {
              return (
                <option key = {campus.id} value={campus.id}>
                  {campus.name}
                </option>
              )
            })
          }
        </select>
        <button type="submit">Submit</button>
      </form>
    )
  }
}
export default withRouter(EditCampus);
