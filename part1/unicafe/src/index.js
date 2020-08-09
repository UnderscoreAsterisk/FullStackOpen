import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({clickHandler, text}) => <button onClick={clickHandler}>{text}</button>

const Display = ({label, value}) => <p>{label} {value}</p>

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button clickHandler={()=>{setGood(good+1)}} text="Good"/>
      <Button clickHandler={()=>{setNeutral(neutral+1)}} text="Neutral"/>
      <Button clickHandler={()=>{setBad(bad+1)}} text="Bad"/>
      <h1>Statistics</h1>
      <Display label="Good" value={good}/>
      <Display label="Neutral" value={neutral}/>
      <Display label="Bad" value={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)