
import {React, useState, useEffect} from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [newUser, setNewUser] = useState("") 
    const {store, dispatch} = useGlobalReducer()
    let navigate = useNavigate();
    const [agendas, setAgendas] = useState([])

    useEffect(() => {
        const getAgendas = async () => {
            try {
                const response = await fetch ('https://playground.4geeks.com/contact/agendas?offset=0&limit=100',{
                    headers:{'accept': 'application/json'}
                });
                
                if(!response.ok){throw new Error ("There was an error getting the agendas")}

                const data = await response.json();

                setAgendas(data.agendas)

            } catch (error) {
                alert(error.message)
            }
        }
        getAgendas()
    },[])

    const createUser = async (e) =>{
        e.preventDefault();

        try {
            const response = await fetch (  `https://playground.4geeks.com/contact/agendas/${newUser}`, {
                method:"POST",
                headers: {
                    'accept': 'application/json' 
                }
            })

            if(!response.ok){
                throw new Error ("There was an error creating the user")
            }      
            
            const data = await response.json();
            
            dispatch({
                type:"create_user",
                payload: data.slug
            })

        } catch (error) {
            alert(error.message)
        }

    }


   

    return (
        <div className="p-3">
            <h1 className="m-4">Welcome to your Contact App</h1>
            <form className="p-5">
                <select 
                onChange = 
                {(e)=>{
                    if(e.target.value==""){return}
                    dispatch({
                    type: "create_user",
                    payload: e.target.value
                })}}
                className = "form-select" 
                aria-label = "Default select example">
                    <option  value="" selected>Select your user</option>
                    {agendas.length===0? null: agendas.map((agenda)=>{
                        return (
                            <option value={agenda.slug}>{agenda.slug}</option>
                        )
                    })
                    }

                </select>
                <button 
                    className="btn btn-primary mt-2"
                    onClick={(e)=>{
                        navigate("/contacts")
                        }}>
                    Go to contacts
                </button>

            </form>

            <form action="" className="p-5">
                <div className="mb-3">
                    <label htmlFor="newUsername" className="form-label"><strong>Enter your username</strong></label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="newUsername" 
                    placeholder="Michelle"
                    onChange={(e)=>setNewUser(e.target.value)}
                    value={newUser}/>
                    <button 
                        className="btn btn-success mt-2"
                        onClick={(e)=>{
                            createUser(e)
                            navigate("/contacts")
                            }}>
                        Create
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Home