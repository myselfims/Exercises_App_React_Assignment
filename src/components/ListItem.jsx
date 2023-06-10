import React from 'react'
import { Link } from 'react-router-dom'

const ListItem = (props) => {
  const excercise = props.excercise
  return (
    <div className="card my-2">
    <div className="card-header">
        <label htmlFor=""><strong>Difficulty</strong> </label>
    <span className="badge text-bg-primary mx-3"> {excercise.Difficulty}</span>
    </div>
    <div className="card-body">
        <h5 className="card-title">{excercise.exercise_name}</h5>
        <p className="card-text">{excercise.details!==undefined?String(excercise.details).slice(1,200):''}...</p>
        <Link to={`/viewexcersice/${excercise.id}`} className="btn btn-primary">View details</Link>
    </div>
    </div>
  )
}

export default ListItem
