import React from 'react';
import ReactDOM from 'react-dom';
import Course from './components/Course'

const App = () => {
  const courses = [
    {
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
  },
  {
  name: 'Node.JS',
  parts: [
    {
      name: 'Routing',
      exercises: 3
    },
    {
      name: 'Middleware',
      exercises: 7
    }
    ]
  }
  ]

  return (
    <div>
      {courses.map((course) => <Course key={course.name} course={course}/>)}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))