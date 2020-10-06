import React from 'react'
const Header = (props) => {
    return(
      <h2>
        {props.course}
      </h2>
    )
  }
  
  const Part = (props) => {
    return(
      <div>
        <p>{props.name + " " + props.exercises}</p>
      </div>
    )
  }
  
  const Content = (props) => {
    
    return (
      <div>
        { props.parts.name = props.parts.map(part =>
          <Part key={part.id} name={part.name} exercises={part.exercises} />
          )}
      </div>
    )
  }
  
  const Total = (props) => {
  
    let total = 0;
    for (let index = 0; index < props.parts.length; index++) {
      total += props.parts[index].exercises
      
    }
    return total;
  }
  
  const Course = (props) => {
    return (
      <div>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <b>total of <Total parts={props.course.parts} /> exercises</b>
      </div>
    )
  }

  export default Course