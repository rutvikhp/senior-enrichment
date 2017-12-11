import React, {Component} from 'react';
import store, {fetchCampusById, updateCampus} from '../store';
import {withRouter} from 'react-router-dom';

export class EditCampus extends Component {

  constructor(){
    super();
    this.state = store.getState();
    this.handleCampus = this.handleCampus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }
  componentWillUnmount(){
    this.unsubscribe();
  }
  handleCampus(e){
    store.dispatch(fetchCampusById(e.target.value))
  }
  handleSubmit(evt){
    evt.preventDefault();
    const campusId = evt.target.selected.value;
    const name = evt.target.name.value || this.state.campus.name;
    const description = evt.target.description.value || this.state.campus.description;
    const campus = {campusId, name, description}
    store.dispatch(updateCampus(campus))
    this.props.history.push('/campuses')
  }

  render(){
    const campuses = this.props.campuses;
    return (
      <form onSubmit={this.handleSubmit}>
        <label> Select a campus to edit: </label>
        <select name='selected' value={this.state.campus.id} onChange = {this.handleCampus}>
          <option>Select a Campus</option>
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
        <label> Change Name: </label>
        <input type = "text" name = "name" placeholder={this.state.campus.name}/>
        <br />
        <label> Change Description: </label>
        <textarea name='description' placeholder={this.state.campus.description}/>
        <br />
        <button type="submit">Submit</button>
      </form>
    )
  }
}
export default withRouter(EditCampus);
