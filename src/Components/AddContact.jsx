import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../Context/Context";
import axios from "axios";

const AddContact = () => {
  const { users, setContacts } = useContext(MainContext);
  const navigate = useNavigate();

  const [newContact, setNewContact] = useState({
    id: Date.now(), 
    name: "",
    email: "",
    phone: "",
    isSpam: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewContact((prevContact) => ({
      ...prevContact,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addContact = async (e) => {
    e.preventDefault(); 

    const userId = localStorage.getItem("id");
    const user = users.find((user) => user.id === userId);
    
    const contactToAdd = {
      ...newContact,
      id: Date.now(), 
    };

    const updatedContacts = [...user?.contacts || [], contactToAdd];

    try {
      await axios.patch(`http://localhost:8000/users/${userId}`, {
        contacts: updatedContacts,
      });
      setContacts((prevContact) => ([...prevContact, contactToAdd]));
      console.log(updatedContacts);
      

      alert("Contact added successfully!");
      navigate("/"); 
    } catch (error) {
      console.error("Error adding contact:", error);
      alert("Failed to add contact. Please try again.");
    }
  };

  return (
    <div className="h-[100vh] p-4 sm:p-20 flex items-center">
      <form onSubmit={addContact} className="bg-slate-300 rounded-lg shadow-custom-shadow p-8 md:p-16 w-[100%]">
        <h1 className="text-3xl font-bold text-center md:text-left">Add New Contact</h1>
        <div className="flex flex-col w-full gap-2 mt-4">
          <label htmlFor="name" className="text-lg font-bold opacity-70">Name</label>
          <input
            type="text"
            name="name"
            value={newContact.name}
            onChange={handleChange}
            placeholder="Enter Your Name"
            className="h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid"
            required
          />
        </div>
        <div className="flex flex-col w-full gap-2 mt-4">
          <label htmlFor="email" className="text-lg font-bold opacity-70">Email</label>
          <input
            type="email"
            name="email"
            value={newContact.email}
            onChange={handleChange}
            placeholder="Enter Your Email"
            className="h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid"
            required
          />
        </div>
        <div className="flex flex-col w-full gap-2 mt-4">
          <label htmlFor="phone" className="text-lg font-bold opacity-70">Phone</label>
          <input
            type="text"
            name="phone"
            value={newContact.phone}
            onChange={handleChange}
            placeholder="Enter Your Phone Number"
            className="h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid"
            required
          />
        </div>
        <div className="flex flex-col w-full gap-2 mt-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="isSpam"
              checked={newContact.isSpam}
              onChange={handleChange}
              className="mr-2"
            />
            Is Spam?
          </label>
        </div>
        <div className="w-full flex justify-center items-center mt-4">
          <button
            type="submit"
            className="bg-slate-200 text-base md:text-lg w-3/4 p-2 rounded-full hover:bg-slate-600 hover:text-white transition-all ease-in-out duration-300"
          >
            Add Contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContact;

