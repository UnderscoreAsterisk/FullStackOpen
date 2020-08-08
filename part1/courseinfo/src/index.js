import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part topic={props.topics[0]} ex={props.exercises[0]}/>
      <Part topic={props.topics[1]} ex={props.exercises[1]}/>
      <Part topic={props.topics[2]} ex={props.exercises[2]}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of excercises: {props.val}</p>
  ) 
}

const Part = (props) => {
  return (
    <p>{props.topic} {props.ex}</p>
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
      <Content topics={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]}/>
      <Total val={exercises1+exercises2+exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))