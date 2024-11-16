import './index.css'
import {Link} from 'react-router-dom'
import { useEffect,useState} from 'react'
import { AiFillDelete } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";

const Contacts =(props)=>
{
    const [list,updateList] = useState([])
    useEffect(()=>
    {
        const fetchData = async () =>
        {
            const response = await fetch('http://localhost:5000/contacts')
            if(response.ok)
            {
                const data = await response.json()
                updateList(data)
            }
        }
        fetchData()
    },[list])
    const deleteButton = async (UserId)=>
    {
        const option = {
            method:'DELETE'
        }
        const response = await fetch(`http://localhost:5000/contacts/${UserId}`,option);
        const data = await response.json()
        console.log(data)
    }
    const editButton=async (UserId)=>
    {
        const {history} = props 
        history.push(`/contacts/update/${UserId}`)
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
            <div className="card-container">
                <table border="1px" className='table-style'>
                    <tr>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Company</th>
                        <th>JobTitle</th>
                        <th>Edit/Delete</th>
                    </tr>
                    {
                        list.map((item)=>
                        {
                            return (
                                <tr>
                                    <td>{item.FirstName}</td>
                                    <td>{item.LastName}</td>
                                    <td>{item.Email}</td>
                                    <td>{item.Phone}</td>
                                    <td>{item.Company}</td>
                                    <td>{item.JobTitle}</td>
                                    <td className='edit-delete'>
                                        <button onClick={()=>{editButton(item.UserId)}} className='button-style'><FaUserEdit className='icon'/></button>
                                        <button onClick={()=>{deleteButton(item.UserId)}} className='button-style'><AiFillDelete className='icon'/></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </div>
    )
}
export default Contacts