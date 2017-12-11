import React, {Component} from 'react';
import store, {postStudent} from '../store';
import {withRouter} from "react-router-dom";

export class AddStudent extends Component {

  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt){
    evt.preventDefault();
    const firstName = evt.target.name.value.split(' ')[0]
    const lastName = evt.target.name.value.split(' ')[1]
    const campusId = evt.target.selected.value
    const gpa = evt.target.gpa.value
    const email = evt.target.email.value
    const student = {
      firstName,
      lastName,
      gpa,
      campusId,
      email
    }
    store.dispatch(postStudent(student))
    this.props.history.push("/students");
  }

  render(){
    const campuses = this.props.campuses;
    return (
      <form onSubmit={this.handleSubmit}>
          <h3>Add a Person</h3>
          <label> Name : </label>
          <input type = "text" name = "name" />
          <br />
          <label> Email : </label>
          <input type = 'text' name = 'email' />
          <br />
          <label> GPA : </label>
          <input type = 'text' name = 'gpa' />
          <br />
          <select name='selected'>
            <option>Select Campus</option>
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
          <br />
          <button type="submit">Submit</button>
      </form>
    )
  }
}
export default withRouter(AddStudent);
