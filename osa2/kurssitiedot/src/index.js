// HOURS: 3h, 20 min

import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
    <h1>
      {props.course}
    </h1>
  )
}

const Part = (props) => {
  return(
    <div>
      {props.name}
    </div>
  )
}

const Content = (props) => {
  console.log(props);
  
  return (
    <div>
        <Part name={props.parts[0].name} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
    {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))