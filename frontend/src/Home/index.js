import './index.css';
import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
const Home = () =>{
  const [FirstName,updateFirstName] = useState('')
  const [LastName,updateLastName] = useState('')
  const [Email,updateEmail] = useState('')
  const [Phone,updatePhone] = useState('')
  const [Company,updateCompany] = useState('')
  const [JobTitle,updateJobTitle] = useState('')
  const [addedSuccessful,updateAddedSuccessful] = useState(false)
  const [msg,updateMsg] = useState('')
  const addContact = async (event) =>
  {
    event.preventDefault();
    const option = {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        FirstName,
        LastName,
        Email,
        Phone,
        Company,
        JobTitle
      })
    }
    const response = await fetch('http://localhost:5000/contacts',option)
    console.log(response)
    if(response.ok)
    {
      const data = await response.json()
      updateAddedSuccessful(true)
      updateMsg(data.success)
    }
    else
    {
      const data = await response.json()
      updateAddedSuccessful(false)
      updateMsg(data.error)
    }
    updateFirstName('')
    updateLastName('')
    updateEmail('')
    updatePhone('')
    updateCompany('')
    updateJobTitle('')
  }
  return (
    <div className="container">
      <nav className="navbar">
          <span className="logo-head">ContactDetails</span>
          <ul className='ul-container'>
            <li className='li-container'><Link to="/" className="link">Home</Link></li>
            <li className='li-container'><Link to="/contacts" className="link">Contacts</Link></li>
          </ul>
      </nav>
      <div className="form-container">
        <h1>Enter New Contact</h1>
        <form onSubmit={addContact}>
          <label htmlFor="first-name">FirstName</label>
          <input value={FirstName} id="first-name" placeholder="Enter FirstName" onChange={(event)=>{updateFirstName(event.target.value)}}/>
          <label htmlFor="last-name">LastName</label>
          <input value={LastName} id="last-name" placeholder="Enter LastName" onChange={(event)=>{updateLastName(event.target.value)}}/>
          <label htmlFor="email">Email</label>
          <input value={Email} id="email" placeholder="Enter Email" onChange={(event)=>{updateEmail(event.target.value)}}/>
          <label htmlFor="phone">Phone</label>
          <input value={Phone} id="phone" placeholder="Enter PhoneNumber" onChange={(event)=>{updatePhone(event.target.value)}}/>
          <label htmlFor="company">Company</label>
          <input value={Company} id="company" placeholder="Enter CompanyName" onChange={(event)=>{updateCompany(event.target.value)}}/>
          <label htmlFor="job">JobTitle</label>
          <input value={JobTitle} id="job" placeholder="Enter JobTitle" onChange={(event)=>{updateJobTitle(event.target.value)}}/>
          <button className='addButton' onClick={addContact}>Add</button>
          {
            addedSuccessful?<span className='success'>{msg}</span>:<span className='error'>{msg}</span>
          }
        </form>
      </div>
    </div>
  )
}
export default Home;
