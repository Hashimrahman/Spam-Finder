import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const MainContext = createContext();

export const ContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  const id = localStorage.getItem("id");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/users");
        console.log("API Response:", res.data);
        setUsers(res.data);
      } catch (err) {
        console.error("API Error:", err);
      }
    };

    fetchUsers();
  }, []);

//   ===============================================================================================================================


const loadContacts = (id) =>{
    const savedContacts = localStorage.getItem('contacts');
    if(savedContacts){
        setContacts(savedContacts)
    }else{
        axios.get(`http://localhost:8000/users/${id}`)
        .then((res)=>{
            const userContact = res.data.contacts || [];
            setContacts(userContact);
            localStorage.setItem('contacts', JSON.stringify(userContact))
        })
        .catch((err)=>{
            console.log('Error in fetching Contacts',err);
            
        })
    }
}


//   ===============================================================================================================================

useEffect(() => {
    const currentUser = users.find((user) => user.id === id);
    if (currentUser) {
      setContacts(currentUser.contacts || []);
    }
  }, [users, id]);

 //   ===============================================================================================================================


  const removeContact = (contactId) =>{
    const updatedContact = contacts.filter((item) => item.id != contactId);
    setContacts(updatedContact);
    axios.patch(`http://localhost:8000/users/${id}`,{
        contacts: updatedContact
    })
    .then((res) => {
        console.log("Contact Updated Successfully", res.data);
      })
      .catch((err) => {
        console.log("Error in removing contact", err);
      });
    
  }
 //   ===============================================================================================================================
 
 
 const handleLogout = () => {
     localStorage.clear();
     navigate("/");
    };
    
    const handleLogin = (id) => {
        localStorage.setItem("isLoggedIn", true);
        loadContacts(id);
    };
    
    //   ===============================================================================================================================



  return (
    <MainContext.Provider
      value={{
        users,
        setUsers,
        handleLogin,
        handleLogout,
        contacts,
        setContacts,
        removeContact
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default ContextProvider;
