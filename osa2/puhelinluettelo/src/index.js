// HOURS: 6h, 50 min

import ReactDOM from 'react-dom'
import React, { useState } from 'react'

const Person = (props) => {
  return(
  <p key={props.id}>
    {props.name} {props.number}
  </p>
  )
}

const Phonebook = (props) => {
  return(
    <div>
      {props.persons.map(person =>
      <Person key={person.id} name={person.name} number={person.number} />
      )}
    </div>
  )
}

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

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber] = useState('')

const addName = (event) => {
  let duplicate = false
  event.preventDefault()
  console.log('Added name...', event.target.value)

  const personObject = {
    name: newName,
    number: newNumber,
    id: persons.length + 1
  }

  for (let index = 0; index < persons.length; index++) {
    if (newName === persons[index].name)
    { 
      window.alert(`${newName} is already added to the phonebook`)
      duplicate = true
    }
  }
  if(!duplicate && newName !== "") {
    setPersons(persons.concat(personObject))
    setNewName('')
    duplicate = false
  }
}

const handleNameChange = (event) => {
  console.log(event.target.value);
  setNewName(event.target.value)
}

const handleNumberChange = (event) => {
  // console.log(event.target.value);
  setNewNumber(event.target.value)
}

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm name={newName} number={newNumber} addName={addName} hnuc={handleNumberChange} hnac={handleNameChange}/>
      <h2>Numbers</h2>
      <Phonebook persons={persons} />
    </div>
  )
}
export default App
ReactDOM.render(<App />,document.getElementById('root'))