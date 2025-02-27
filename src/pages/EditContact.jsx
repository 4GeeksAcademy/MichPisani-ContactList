import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link, useNavigate, useParams } from "react-router-dom";


const EditContact = () => {
    const {store, dispatch} =useGlobalReducer()
    let navigate = useNavigate()
    const { contactId } = useParams();
    const singleContact = store.contacts.find(contact => contact.id === parseInt(contactId));
    
    
    const [editContact, setEditContact] = useState({...singleContact})

    const handleEdit = async (e, id) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `https://playground.4geeks.com/contact/agendas/${store.slug}/contacts/${id}`,
                {
                    method: "PUT",
                    headers:{
                        'accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: editContact.name,
                        phone: editContact.phone,
                        email: editContact.email,
                        address: editContact.address,
                        
                    })
                    
                } 
            )

            if(!response.ok) throw new Error("There was an error editing this contact");

            const editedContact = await response.json();

            dispatch({
                type: "edit_contact",
                payload: editedContact
            })

            
        } catch (error) {
                
            }
      
    }

    
    return (
        <>
        <form className="p-3">
            <div className="form-floating mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="Enter Full Name"
                    onChange={e => setEditContact({...editContact, name:e.target.value})}
                    value={editContact.name}
                    required
                    />
                <label htmlFor="floatingInput">Full Name</label>
            </div>  

            <div className="form-floating mb-3">
                <input 
                    type="email" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="Enter email"
                    onChange={e => setEditContact({...editContact, email:e.target.value})}
                    value={editContact.email}
                    required
                    />
                <label htmlFor="floatingInput">Email address</label>
            </div>

            <div className="form-floating mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="Enter phone"
                    onChange={e => setEditContact({...editContact, phone:e.target.value})}
                    value={editContact.phone}
                    required
                    />
                <label htmlFor="floatingInput">Phone number</label>
            </div>

            <div className="form-floating mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="Enter address"
                    onChange={e => setEditContact({...editContact, address:e.target.value})}
                    value={editContact.address}
                    required
                    />
                <label htmlFor="floatingInput">Address</label>
            </div>
            
            <button  
                onClick={(e)=>{
                    handleEdit(e, contactId);
                    navigate(`/contacts`)
                }}               
                type="button" 
                className="btn btn-info m-3">
                    Edit
            </button>
 
        </form>
        <Link to="/" className="m-3" >Go back to contacts</Link>
        </>
    )
}

export default EditContact