/* combineReducers is not currently used, but eventually should be for modular code :D */
import { combineReducers } from 'redux'
import axios from 'axios'

//Action Types
const GET_STUDENTS = 'GET_STUDENTS'
const GET_CAMPUSES = 'GET_CAMPUSES'
const GET_CAMPUS_BY_ID = 'GET_CAMPUS_BY_ID'
const ADD_STUDENT = 'ADD_STUDENT'
const DELETE_STUDENT = 'DELETE_STUDENT'
const ADD_CAMPUS = 'ADD_CAMPUS'
const DELETE_CAMPUS = 'DELETE_CAMPUS'
const GET_STUDENT_BY_ID = 'GET_STUDENT_BY_ID'
//Action CREATERS
export function getStudents (students)  {
  return {
    type: GET_STUDENTS,
    students
  }
}
export function getCampuses (campuses) {
  return {
    type: GET_CAMPUSES,
    campuses
  }
}
export function getCampusById(campus){
  return{
    type:GET_CAMPUS_BY_ID,
    campus
  }
}
export function addStudent(student){
  return {
    type: ADD_STUDENT,
    student
  }
}
export function deleteStudentAction (studentId){
  return {
    type: DELETE_STUDENT,
    studentId
  }
}
export function addCampus (campus){
  return {
    type: ADD_CAMPUS,
    campus
  }
}
export function deleteCampusAction(campusId){
  return {
    type:DELETE_CAMPUS,
    campusId
  }
}
export function getStudentById(student){
  return {
    type: GET_STUDENT_BY_ID,
    student
  }
}
//THUNKS
export function fetchStudents(){
  return function think (dispatch) {
    return axios.get('/api/students')
    .then(res => res.data)
    .then(students => {
      dispatch(getStudents(students))
    })
  }
}

export function fetchCampuses(){
  return function think (dispatch) {
    return axios.get('/api/campuses')
    .then(res => res.data)
    .then(campuses => {
      dispatch(getCampuses(campuses))
    })
  }
}

export function fetchCampusById(id){
  return function thunk(dispatch){
    return axios.get(`/api/campuses/${id}`)
    .then(res => res.data)
    .then(campus => {
      dispatch(getCampusById(campus))
    })
  }
}

export function postStudent(student){
  return function thunk(dispatch){
    return axios.post('/api/students',{student})
    .then(res => res.data)
    .then(student=>{
        dispatch(addStudent(student))
    })
  }
}

export function deleteStudent (studentId){
  return function thunk (dispatch){
    return axios.delete(`/api/students/${studentId}`)
    .then(res => dispatch(deleteStudentAction(studentId)))
    .catch(err => console.error(`Removing student: ${studentId} unsuccessful`, err))
  }
}

export function postCampus (campus){
  return function thunk (dispatch){
    return axios.post('/api/campuses',campus)
    .then(res => res.data)
    .then(campus => {
      dispatch(addCampus(campus))
    })
    .catch(err => console.error('Problem with adding campus'))
  }
}

export function deleteCampus (campusId){
  return function thunk (dispatch){
    return axios.delete(`/api/campuses/${campusId}`)
      .then(res => dispatch(deleteCampusAction(campusId)))
      .catch(err => console.error(`Removing Campus: ${campusId} unsuccessful`, err))
  }
}
export function fetchStudentById (studentId){
  return function thunk (dispatch){
    return axios.get(`/api/students/${studentId}`)
      .then(res => res.data)
      .then(student => dispatch(getStudentById(student)))
      .catch(console.error)
  }
}
//REDUCER
const initialState = {
  students: [],
  campuses: [],
  campus:{},
  student:{}
}

const rootReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_STUDENTS:
      return { ...state, students: action.students}
    case GET_CAMPUSES:
      return { ...state, campuses: action.campuses}
    case GET_CAMPUS_BY_ID:
      return { ...state, campus: action.campus}
    case ADD_STUDENT:
      return {...state, students: [...state.students,action.student]}
    case DELETE_STUDENT:
        return {...state, students:state.students.filter((student)=> student.id !== action.studentId) }
    case ADD_CAMPUS:
      return {...state, campuses: [...state.campuses,action.campus]}
    case DELETE_CAMPUS:
      return {...state, campuses: state.campuses.filter((campus)=> campus.id !== action.campusId)}
    case GET_STUDENT_BY_ID:
      return {...state, student: action.student}
    default:
      return state
  }
};

export default rootReducer
