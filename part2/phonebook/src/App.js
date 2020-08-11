import React, { useState, useEffect } from 'react'
import contactsSrv from './services/contacts'

const SuccessNotif = ({message}) => {
  if (message === null) return null

  const msgStyle = {
      color: "green",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
  }

  return (
    <div style={msgStyle}>
      {message}
    </div>
  )
}

const ErrorNotif = ({message}) => {
  if (message === null) return null

  const msgStyle = {
      color: "red",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
  }

  return (
    <div style={msgStyle}>
      {message}
    </div>
  )
}

const People = ({persons, searchName, onDelete}) => {
  const filtered = persons.filter((person) => {
    return  searchName.length === 0 || 
            person.name.match(new RegExp(`${searchName}+`, "i")) !== null
    })

  return (
    <div>
      <h2>Numbers</h2>
      {filtered.map((person) => 
        <div key={person.name}>
          {person.name} {person.number} <button pid={person.id} onClick={() => onDelete(person)}>delete</button>
        </div>)}
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
  const [ message, setMessage ] = useState(null)
  const [ error, setError ] = useState(null)

  useEffect(() => {
    contactsSrv.getAll().then((response) => setPersons(response))
  }, [])

  const nameChangeHandler = (event) => setNewName(event.target.value)
  const numberChangeHandler = (event) => setNewNumber(event.target.value)
  const searchChangeHandler = (event) => setSearchName(event.target.value)

  const deletePersonHandler = (p) => {
    if(window.confirm(`Delete ${p.name}?`)) {
      contactsSrv.remove(p.id).then(() => {
        console.log(`Removed ${p.name}`)
        setPersons(persons.filter((e) => e.id !== p.id))})
        .catch(() => {
          setError(`${p.name} no longer exists on the server`)
          setTimeout(() => setError(null), 5000)
        })
    
    }
  }

  const addPerson = (event) => {
    event.preventDefault()

    const i = persons.findIndex((p) => p.name === newName)
    if(i !== -1) {
      if (window.confirm(`${newName} already exists, do you want update the number?`)) {
        const newObj = {name: newName, number: newNumber}
        const pid = persons[i].id
        contactsSrv.update(pid, newObj).then((response) => {
          setPersons(persons.filter((p) => p.id !== pid).concat(response))
          setMessage(`Updated ${newName} to ${newNumber}`)
          setTimeout(() => setMessage(null), 5000)
        }).catch(() => {
          setError(`${newName} no longer exists on the server`)
          setTimeout(() => setError(null), 5000)
        })
      }

    } else {
      const newPersonObj = {name: newName, number: newNumber}
      contactsSrv.create(newPersonObj).then((response) => {
        setPersons(persons.concat(response))
        setMessage(`Added ${newName}`)
        setTimeout(() => setMessage(null), 5000)
      })
    }
  }

  return (
    <div>
      <SuccessNotif message={message}/>
      <ErrorNotif message={error}/>
      <Search onChange={searchChangeHandler}/>
      <Form onSubmit={addPerson} onNameChange={nameChangeHandler} onNumberChange={numberChangeHandler}/>
      <People persons={persons} searchName={searchName} onDelete={deletePersonHandler}/>
    </div>
  )
}

export default App;
