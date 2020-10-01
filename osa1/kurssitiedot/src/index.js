import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
    <div>
      {props.course}
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      {props.part}
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} />
      <Part part={props.part2} />
      <Part part={props.part3} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      {props.ex1+props.ex2+props.ex3}
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))