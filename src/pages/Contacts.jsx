
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactList from "../components/ContactList.jsx";

export const Contacts = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<>

			<ContactList/>
		
		</>

	);
}; 