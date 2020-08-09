import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({clickHandler, text}) => <button onClick={clickHandler}>{text}</button>

const Stat = ({label, value}) => <tr><td>{label}</td> <td>{value}</td></tr>

const Statistics = ({good, neutral, bad}) => {
  let total = good+neutral+bad
  let score = (good - bad)/total
  let pct = 100.0*good/total

  if (good === 0 && neutral === 0 && bad === 0)
    return (
      <div>No Feedback collected</div>
    )
  else
    return (
      <div>
        <Stat label="Good" value={good}/>
        <Stat label="Neutral" value={neutral}/>
        <Stat label="Bad" value={bad}/>
        <Stat label="all" value={total}/>
        <Stat label="Average" value={score}/>
        <Stat label="Positive" value={pct + ' %'}/>
      </div>
    )
} 

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
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)