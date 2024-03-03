import { useEffect, useState } from 'react'
import personService from './services/persons'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterTerm, setFilterTerm] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    personService.getAllPosts().then((res) => {
      setPersons(res.data)
    })
  }, [])

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case "name": {
        setNewName(e.target.value)
        break
      }
      case "number": {
        setNewNumber(e.target.value)
        break
      }
      case "filter": {
        setFilterTerm(e.target.value)
      }
      default: break
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    let alreadyExisting = persons.find((item) => {
      return newName === item.name
    })
    if (alreadyExisting) {
      const result = window.confirm(`${newName} is already added to the phonebook, do you want to replace the old number with the new number?`)
      if (!result) return

      personService.updateContact(alreadyExisting.id, { name: alreadyExisting.name, number: newNumber }).then(() => {
        const updatePersons = [...persons]
        const updatedContact = updatePersons.find((ele) => ele.id === alreadyExisting.id)
        updatedContact.number = newNumber
        setPersons(updatePersons)
        setNewName("")
        setNewNumber('')
        setMessage(`updated ${newName}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
    else {
      const newPerson = { id: "" + Math.floor(Math.random() * 1000), name: newName, number: newNumber }
      personService.createNewContact(newPerson).then(() => {
        setPersons(prev => [...prev, newPerson])
        setNewName("")
        setNewNumber("")
        setMessage(`created ${newName}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  }

  const handleDelete = (id) => {
    const result = window.confirm('you sure you want to delete this contact?')
    if (!result) return
    personService.deleteContact(id).then((_res) => {
      const updatePersons = persons.filter((ele) => ele.id !== id)
      setPersons(updatePersons)
    }).catch(err => {
      setError("This user has already been deleted")
      setTimeout(() => {
        setError(null)
      }, 5000)
    })


  }

  const contactsToShow = persons.filter(person => person.name.toLowerCase().includes(filterTerm.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isSuccess={true} />
      <Notification message={error} isSuccess={false} />
      <Filter handleInputChange={handleInputChange} />
      <h3>add new</h3>
      <PersonsForm newNumber={newNumber} newName={newName} handleInputChange={handleInputChange} handleFormSubmit={handleFormSubmit} />
      <h2>Numbers</h2>
      <Persons contactsToShow={contactsToShow} handleDelete={handleDelete} />
    </div>
  )
}

const Filter = ({ handleInputChange }) => {
  return <>
    filter shown with: <input name="filter" onChange={handleInputChange} />
  </>
}

const PersonsForm = ({ newName, newNumber, handleInputChange, handleFormSubmit }) => {
  return <>
    <form onSubmit={handleFormSubmit}>
      <div>
        name: <input name="name" onChange={handleInputChange} value={newName} />
      </div>
      <div>number: <input name="number" onChange={handleInputChange} value={newNumber} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
}

const Persons = ({ contactsToShow, handleDelete }) => {
  return <>{contactsToShow.map((person) => <div key={person.id}>{person.name} {person.number}<button onClick={() => handleDelete(person.id)}>delete</button> </div>)}</>
}

export default App
