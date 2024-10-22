import { useContext, useState } from "react";
import { MainContext } from "../../Context/Context";
import {useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const { handleLogout,contacts,removeContact,setContacts } = useContext(MainContext);
  const [filter, setFilter] = useState("all"); 
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const filteredContacts = contacts.filter((contact) => {
    if (filter === "spam") return contact.isSpam;
    if (filter === "non-spam") return !contact.isSpam;
    return true;
  });

  const toggleSpamStatus = async (id) => {
    try {
      const updatedContacts = filteredContacts.map((contact) => {
        if (contact.id === id) {
          return { ...contact, isSpam: !contact.isSpam }; // Toggle the isSpam status
        }
        return contact;
      });

      // Update the contacts in the context
      setContacts(updatedContacts);

      // Optionally, update the server with the new status
      const userId = localStorage.getItem('id');
      await axios.patch(`http://localhost:8000/users/${userId}`, {
        contacts: updatedContacts,
      });
    } catch (error) {
      console.error("Error updating spam status:", error);
    }
  };


  return (
    <div className="p-4">
      {id ? (
        <>
          <h1 className="text-3xl font-bold mb-4">Your Contacts</h1>

          <div className="flex justify-between mx-16 items-center">
            <div className="mb-4">
              <button
                onClick={() => setFilter("all")}
                className={`mr-2 px-4 py-2 rounded ${
                  filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("spam")}
                className={`mr-2 px-4 py-2 rounded ${
                  filter === "spam" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                Spam
              </button>
              <button
                onClick={() => setFilter("non-spam")}
                className={`px-4 py-2 rounded ${
                  filter === "non-spam"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Non-Spam
              </button>
            </div>
            <button onClick={()=> navigate('/addContact')} className="border rounded-lg px-12 py-4 my-8">
              Add Contact
            </button>
          </div>

          {filteredContacts.length === 0 ? (
            <p>No contacts found.</p>
          ) : (
            // <table className="min-w-full border-collapse border border-gray-300">
            //   <thead>
            //     <tr>
            //       <th className="border border-gray-300 p-2">Name</th>
            //       <th className="border border-gray-300 p-2">Email</th>
            //       <th className="border border-gray-300 p-2">Phone</th>
            //       <th className="border border-gray-300 p-2">Is Spam?</th>
            //       <th className="border border-gray-300 p-2">Delete / Edit</th>
            //     </tr>
            //   </thead>
            //   <tbody>
            //     {filteredContacts.map((contact) => (
            //       <tr key={contact.id}>
            //         <td className="border border-gray-300 p-2">
            //           {contact.name}
            //         </td>
            //         <td className="border border-gray-300 p-2">
            //           {contact.email}
            //         </td>
            //         <td className="border border-gray-300 p-2">
            //           {contact.phone}
            //         </td>
            //         <td className="border border-gray-300 p-2">
            //           {contact.isSpam ? "Yes" : "No"}
            //         </td>
            //         <td className="border border-gray-300 p-2">
            //           <div className="flex gap-4 justify-evenly">
            //           <button onClick={()=> removeContact(contact.id)} className="border  px-8 py-1 rounded-lg bg-red-500">Delete</button>
            //           <button onClick={() => navigate(`/updateContact/${contact.id}`)} className="border  px-8 py-1 rounded-lg bg-blue-500">Update</button>
            //           </div>
            //         </td>
            //       </tr>
            //     ))}
            //   </tbody>
            // </table>
            <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">Name</th>
          <th className="border border-gray-300 p-2">Email</th>
          <th className="border border-gray-300 p-2">Phone</th>
          <th className="border border-gray-300 p-2">Is Spam?</th>
          <th className="border border-gray-300 p-2">Delete / Edit</th>
        </tr>
      </thead>
      <tbody>
        {filteredContacts.map((contact) => (
          <tr key={contact.id} className={contact.isSpam ? "bg-red-200" : ""}> {/* Change background color */}
            <td className="border border-gray-300 p-2">{contact.name}</td>
            <td className="border border-gray-300 p-2">{contact.email}</td>
            <td className="border border-gray-300 p-2">{contact.phone}</td>
            <td className="border border-gray-300 p-2">
              <div className="flex justify-between">
                {contact.isSpam ? "Yes" : "No"}
                <button 
                  onClick={() => toggleSpamStatus(contact.id)} 
                  className={`ml-2 px-4 py-1 rounded-lg ${contact.isSpam ? 'bg-green-500' : 'bg-red-500'}   text-white`}>
                  {contact.isSpam ? "Unmark as Spam" : "Mark as Spam"} {/* Change button text */}
                </button>
              </div>
            </td>
            <td className="border border-gray-300 p-2">
              <div className="flex gap-4 justify-evenly">
                <button onClick={() => removeContact(contact.id)} className="border px-8 py-1 rounded-lg bg-red-500">Delete</button>
                <button onClick={() => navigate(`/updateContact/${contact.id}`)} className="border px-8 py-1 rounded-lg bg-blue-500">Update</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
          )}
          <div className="w-full flex justify-center">
          <button onClick={handleLogout} className="px-16 py-4 bg-red-500 mt-4 rounded-lg">LogOut</button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-screen bg-gray-100 gap-6">
          <button onClick={()=> navigate('/register')} className="bg-blue-500 text-white font-bold py-4 px-12 rounded hover:bg-blue-700 transition duration-300 ease-in-out">
            Register
          </button>
          <button onClick={()=> navigate('/login')} className="bg-green-500 text-white font-bold py-4 px-12 rounded hover:bg-green-700 transition duration-300 ease-in-out">
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
