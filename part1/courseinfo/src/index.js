import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <p>{props.topic} {props.ex}</p>
  )
}

const Total = (props) => {
  return (
    <p>Number of excercises: {props.val}</p>
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
    <div>
      <Header course={course}/>
      <Content topic={part1} ex={exercises1}/>
      <Content topic={part2} ex={exercises2}/>
      <Content topic={part3} ex={exercises3}/>
      <Total val={exercises1+exercises2+exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))