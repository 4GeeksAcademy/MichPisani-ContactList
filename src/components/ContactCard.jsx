import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router";



const ContactCard = ({name, address, phone, email, id}) => {
    
    const {store, dispatch} = useGlobalReducer()
    let navigate = useNavigate();

    const deleteContact = async (id) => {
        if(!window.confirm("Are you sure you want to delete this contact?")){
            return;
        }

        try{
            const response = await fetch(
                `https://playground.4geeks.com/contact/agendas/${store.slug}/contacts/${id}`,
                {
                    method: "DELETE",
                    headers: {'accept': 'application/json'}
                }
            );

            if (!response.ok) throw new Error ("There was an error deleting this contact")

            dispatch({
                type: "delete_contact",
                payload: id

            })

        }catch(error){
            alert(error.message)
        }
    }

    return(
        <>
        <div className="card m-1">
            <div className="card-body d-flex justify-content-between">
                <div className="d-flex">
                    <img src="src/assets/img/avatar.jpg" alt="Avatar"/>     
                    <div className="d-block">
                        <p><strong>{name}</strong></p>
                        <p><i className="fa-solid fa-map-location me-1"></i> {address}</p>
                        <p><i className="fa-solid fa-square-phone me-2"></i>{phone}</p>
                        <p><i className="fa-solid fa-square-envelope me-2"></i>{email}</p>                    
                    </div>
                </div>


                <div className="d-flex">
                    <button onClick={() => navigate(`/edit-contact/${id}`)} className="btn fs-4 text-secondary"><i className="fa-regular fa-pen-to-square"></i></button>
                    <button onClick={() => deleteContact(id)} className="btn fs-4 text-danger"><i className="fa-regular fa-trash-can"></i></button>                    
                </div>

            </div>
        </div>
        </>
    )
}

export default ContactCard

