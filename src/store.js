export const initialStore=()=>{
  return{
    slug: "",
    contacts: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_contact':

      const { name,  address, phone, email, id} = action.payload

      return {
        ...store,
        contacts: [...store.contacts, {name, address, phone, email, id}]
      };
    
    case 'get_contacts':
      const contacts = action.payload
      return{
        ...store,
        contacts: contacts
      };
    
    case 'delete_contact':
      const deleteId = action.payload
      return{
        ...store,
        contacts: store.contacts.filter(contact => contact.id != deleteId)
      }

    case 'edit_contact':
      const editedContact = action.payload
      return {
        ...store,
        contacts: store.contacts.map(contact => contact.id === editedContact.id? editedContact : contact)

      }

    case 'create_user':
      const username = action.payload
      
      return {
        ...store,
        slug: username
      }

    default:
      throw Error('Unknown action.');

  }  

}
