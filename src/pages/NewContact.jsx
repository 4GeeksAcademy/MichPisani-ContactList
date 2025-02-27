import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const NewContact = () => {

    let navigate = useNavigate();
    const {store, dispatch} =useGlobalReducer()
    const [newContact, setNewContact] = useState({name:"", email:"", phone:"", address:""})

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.slug}/contacts`, {
                method: "POST",
                headers:{
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name":newContact.name,
                    "email":newContact.email,
                    "phone":newContact.phone,
                    "address":newContact.address
                })
            } )

            if(!response.ok){
                throw new Error("Error adding the contact")
            }

            const data = await response.json();

            dispatch({
                type: "add_contact", 
                payload: { name:data.name,  address:data.address, phone:data.phone, email:data.email, id: data.id}
              })
            
        } catch (error) {
            
        }
     
    }

    return (
        <>
        <form className="p-5">
            <div className="form-floating mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="Enter Full Name"
                    onChange={e => setNewContact({...newContact, name:e.target.value})}
                    value={newContact.name}
                    required
                    />
                <label for="floatingInput">Full Name</label>
            </div>  

            <div className="form-floating mb-3">
                <input 
                    type="email" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="Enter email"
                    onChange={e => setNewContact({...newContact, email:e.target.value})}
                    value={newContact.email}
                    required
                    />
                <label for="floatingInput">Email address</label>
            </div>

            <div className="form-floating mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="Enter phone"
                    onChange={e => setNewContact({...newContact, phone:e.target.value})}
                    value={newContact.phone}
                    required
                    />
                <label for="floatingInput">Phone number</label>
            </div>

            <div className="form-floating mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="Enter address"
                    onChange={e => setNewContact({...newContact, address:e.target.value})}
                    value={newContact.address}
                    required
                    />
                <label for="floatingInput">Address</label>
            </div>
            <div className="d-flex justify-content-end">
                <button                 
                    onClick={(e) => {
                        handleSave(e);
                        navigate(`/contacts`)
                    }}
                    type="submit" 
                    className="btn btn-outline-dark m-3 w-100">
                        Save
                </button>

            </div>

            <br/>
            <Link to="/" className="m-3" >Go back to contacts</Link>
        </form>
        
        </>
    )
}

export default NewContact