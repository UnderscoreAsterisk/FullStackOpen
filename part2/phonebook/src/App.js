import React, { useState, useEffect } from 'react'
import axios from 'axios'

const People = ({persons, searchName}) => {
  const filtered = persons.filter((person) => {
    return  searchName.length === 0 || 
            person.name.match(new RegExp(`${searchName}+`, "i")) !== null
    })

  return (
    <div>
      <h2>Numbers</h2>
      {filtered.map((person) => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>)

}

const Form = ({onSubmit, onNameChange, onNumberChange}) => {
  return (
    <div>
      <h2>Add New Entry</h2>
      <form onSubmit={onSubmit}>
        <div>
          name: <input onChange={onNameChange}/>
        </div>
        <div>
          number: <input onChange={onNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Search = ({onChange}) => {
  return (
    <div>
      <h2>Phonebook</h2>
      Filter names: <input onChange={onChange}/>
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName] = useState('')
  
  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then((response) => setPersons(response.data))
  }, [])

  const nameChangeHandler = (event) => setNewName(event.target.value)
  const numberChangeHandler = (event) => setNewNumber(event.target.value)
  const searchChangeHandler = (event) => setSearchName(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.findIndex((p) => p.name === newName) !== -1)
      alert(`${newName} already exists`)
    else 
      setPersons(persons.concat({name: newName, number: newNumber}))
  }

  return (
    <div>
      <Search onChange={searchChangeHandler}/>
      <Form onSubmit={addPerson} onNameChange={nameChangeHandler} onNumberChange={numberChangeHandler}/>
      <People persons={persons} searchName={searchName}/>
    </div>
  )
}

export default App;
