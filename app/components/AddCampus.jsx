import React, {Component} from 'react';
import store, {postCampus} from '../store';
import {withRouter} from 'react-router-dom';

export class AddCampus extends Component {

  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt){
    evt.preventDefault();
    const campus = {
      name: evt.target.name.value,
      description: evt.target.description.value,
    }
    store.dispatch(postCampus(campus))
    this.props.history.push("/campuses");
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
          <h3>Add a Campus</h3>
          <label> Name of Campus: </label>
          <input type = "text" name = "name" />
          <br />
          <label> Discription for Campus: </label>
          <textarea name='description' />
          <br />
          <button type="submit">Submit</button>
      </form>
    )
  }
}
export default withRouter(AddCampus);
