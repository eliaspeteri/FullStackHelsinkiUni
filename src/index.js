import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

// Notification component to handle informing the user of a successful operation
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

// Person component includes information for a single object
const Person = (props) => {
  return(
  <p key={props.id}>
    {props.name} {props.number}
  </p>
  )
}
// Phonebook component includes an array of Person components
const Phonebook = (props) => {
  return(
    <div>
      {props.persons.map(person =>
      <Person key={person.id} name={person.name} number={person.number} />
      )}
    </div>
  )
}
// PersonForm component handles the form for sending new information to the JSON server
const PersonForm = (props) => {
  return(
  <form onSubmit={props.addName}>
  <div>
    name: <input value={props.newName} onChange={props.hnac} />
  </div>
  <div>
    number: <input value={props.newNumber} onChange={props.hnuc} />
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>
  )
}
// App component is the root of the application
const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ errorMessage, setErrorMessage] = useState('')

// hook is used for useEffect below
const hook = () => {
  personService
    .getAll()
    .then(response => {
      setPersons(response.data)
    if (response.status === 200) {
      console.log('"get" successful')
    }
    })
}

// using React Effects we can fetch data with axios from the JSON server
useEffect(hook,[])

// addName-function handles compiling the information from the PersonForm component to be compiled into a new object which will be pushed back into the JSON server
const addName = (event) => {
  event.preventDefault()
  const personObject = {
    name: newName,
    number: newNumber
  }
  
    console.log(newName);
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        console.log('"post" successful')
      })
      .catch(error => {
        setErrorMessage(
          `Person ${newName} already exists`
        )
        setTimeout(() => {
          setErrorMessage(null)
        },5000)
      })

}

// handleNameChange updates the state to match what's written into the name input box in PersonForm
const handleNameChange = (event) => {
  setNewName(event.target.value)
}

// handleNumberChange updates the state to match what's written into the number input box in PersonForm
const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <h2>add a new</h2>
      <PersonForm name={newName} number={newNumber} addName={addName} hnuc={handleNumberChange} hnac={handleNameChange}/>
      <h2>Numbers</h2>
      <Phonebook persons={persons}/>
    </div>
  )
}

export default App
ReactDOM.render(<App />,document.getElementById('root'))