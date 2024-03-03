import axios from "axios";

const baseUrl = 'http://localhost:3000/persons'

const getAllPosts = () => {
  return axios.get(baseUrl)
}

const createNewContact = (newPerson) => {
  return axios.post(baseUrl, newPerson)
}

const deleteContact = (id) => {
  return axios.delete(baseUrl + `/${id}`)
}

const updateContact = (id, updatedPerson) => {
  return axios.put(baseUrl + `/${id}`, updatedPerson)
}

export default { getAllPosts, createNewContact, deleteContact, updateContact }
