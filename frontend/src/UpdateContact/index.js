import './index.css';
import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
const UpdateContact = (props) =>{
  const [FirstName,updateFirstName] = useState('')
  const [LastName,updateLastName] = useState('')
  const [Email,updateEmail] = useState('')
  const [Phone,updatePhone] = useState('')
  const [Company,updateCompany] = useState('')
  const [JobTitle,updateJobTitle] = useState('')
  const [addedSuccessful,updateAddedSuccessful] = useState(false)
  const [msg,updateMsg] = useState('')
  const {match} = props 
  const {params} = match
  const {id} = params
  const updateContact = async (event) =>
  {
    event.preventDefault();
    const option = {
      method:'PUT',
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
    const response = await fetch(`http://localhost:5000/contacts/${id}`,option)
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
  }
  useEffect(()=>
    {
        const fetchFunction = async () =>
        {
            const response = await fetch(`http://localhost:5000/contacts/${id}`)
            if(response.ok)
            {
                const data = await response.json()
                console.log(data)
                updateFirstName(data.FirstName)
                updateLastName(data.LastName)
                updateEmail(data.Email)
                updatePhone(data.Phone)
                updateCompany(data.Company)
                updateJobTitle(data.JobTitle)
            }
        }
        fetchFunction()
    },[])
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
        <h1>Update Contact</h1>
        <form onSubmit={updateContact}>
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
          <button className='addButton' onClick={updateContact}>Add</button>
          {
            addedSuccessful?<span className='success'>{msg}</span>:<span className='error'>{msg}</span>
          }
        </form>
      </div>
    </div>
  )
}
export default UpdateContact;
