import React, { useEffect } from "react";
import ContactCard from "./ContactCard";
import useGlobalReducer from "../hooks/useGlobalReducer";

const ContactList = () => {
    const {store, dispatch} = useGlobalReducer()

    useEffect(() => {
        const fetchContacts = async () => {

            if(store.slug===""){return}

            try {
                const response = await fetch(
                    `https://playground.4geeks.com/contact/agendas/${store.slug}/contacts`
                );

                if(!response.ok){
                    throw new Error ("Sorry, there was an error getting your contacts")
                }

                const data = await response.json();
                
                dispatch({
                    type: "get_contacts",
                    payload: data.contacts

                })


            } catch (error) {
                alert(error.message)
            }
            
        }
        fetchContacts()
    }, [])

    return(
        <>
        <div className="container">
            <ul className="list-group">
                {store.contacts.length === 0? <h4 className="text-center mt-5">No contacts found</h4>: null}
                {store && store.contacts?.map((contact, index) => {
                    return (
                        <li 
                            key={contact.id}>
                                <ContactCard name={contact.name} address={contact.address} phone={contact.phone} email={contact.email} id={contact.id}/>
                        </li>
                    )

                })
                }

            </ul>
        </div>
       
        </>

    )
}

export default ContactList