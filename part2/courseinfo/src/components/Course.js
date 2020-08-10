import React from 'react';

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
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

export default Course