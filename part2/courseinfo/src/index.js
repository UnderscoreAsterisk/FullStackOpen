import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const sum = course.parts.reduce((prev, cur) => prev + cur.exercises, 0)
  return(
    <p>Number of exercises {sum}</p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(
        (part, i) => <Part key={i} part={part}/>
      )}
    </div>
  )
}

const Course = ({course}) => (
  <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
  </div>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      },
      {
        name: 'Functional Programming',
        exercises: 5
      }
    ]
  }

  return (
    <Course course={course}/>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))