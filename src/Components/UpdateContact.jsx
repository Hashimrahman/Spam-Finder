// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import axios from "axios";
// import { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { MainContext } from "../Context/Context";
// import * as Yup from 'yup';

// const UpdateContact = () => {
//   const { id } = useParams(); 
//   const { contacts, setContacts } = useContext(MainContext);
//   const [contact, setContact] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     isSpam: false,
//   });
//   const navigate = useNavigate();

//   const validationSchema = Yup.object().shape({
//     name: Yup.string().required("Name is required"),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     phone: Yup.string().required("Phone is required"),
//   });

//   useEffect(() => {
//     const fetchContact = async () => {
//       try {
//         const userId = localStorage.getItem("id");
//         const response = await axios.get(`http://localhost:8000/users/${userId}`);
//         const currentContact = response.data.contacts.find((c) => c.id === parseInt(id));
//         setContact(currentContact);
//       } catch (error) {
//         console.error(error);
//       }
//     };
    
//     fetchContact();
//   }, [id]);

//   const handleSubmit = async (values) => {
//     try {
//       const userId = localStorage.getItem("id");
//       const updatedContacts = contacts.map((c) => (c.id === parseInt(id) ? values : c)); 

//       const response = await axios.patch(`http://localhost:8000/users/${userId}`, {
//         contacts: updatedContacts,
//       });

//       if (response.status === 200) {
//         setContacts(updatedContacts);
//         alert("Contact updated successfully!");
//         navigate("/"); 
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Error updating contact");
//     }
//   };

//   return (
//     <div className="h-[100vh] p-4 sm:p-20 flex items-center">
//       <Formik
//         initialValues={contact}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//         enableReinitialize // Allow Formik to reinitialize with new values
//       >
//         {({ isSubmitting }) => (
//           <Form className="bg-slate-300 rounded-lg shadow-custom-shadow p-8 md:p-16 w-[100%]">
//             <h1 className="text-3xl font-bold text-center md:text-left">Update Contact</h1>
//             <div className="flex flex-col w-full gap-2 mt-4">
//               <label htmlFor="name" className="text-lg font-bold opacity-70">Name</label>
//               <Field
//                 type="text"
//                 name="name"
//                 placeholder="Enter Your Name"
//                 className="h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid"
//               />
//               <ErrorMessage name="name" component="span" className="text-red-600" />
//             </div>
//             <div className="flex flex-col w-full gap-2 mt-4">
//               <label htmlFor="email" className="text-lg font-bold opacity-70">Email</label>
//               <Field
//                 type="email"
//                 name="email"
//                 placeholder="Enter Your Email"
//                 className="h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid"
//               />
//               <ErrorMessage name="email" component="span" className="text-red-600" />
//             </div>
//             <div className="flex flex-col w-full gap-2 mt-4">
//               <label htmlFor="phone" className="text-lg font-bold opacity-70">Phone</label>
//               <Field
//                 type="text"
//                 name="phone"
//                 placeholder="Enter Your Phone Number"
//                 className="h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid"
//               />
//               <ErrorMessage name="phone" component="span" className="text-red-600" />
//             </div>
//             <div className="flex flex-col w-full gap-2 mt-4">
//               <label className="inline-flex items-center">
//                 <Field
//                   type="checkbox"
//                   name="isSpam"
//                   checked={contact.isSpam}
//                   className="mr-2"
//                 />
//                 Is Spam?
//               </label>
//             </div>
//             <div className="w-full flex justify-center items-center mt-4">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="bg-slate-200 text-base md:text-lg w-3/4 p-2 rounded-full hover:bg-slate-600 hover:text-white transition-all ease-in-out duration-300"
//               >
//                 {isSubmitting ? "Updating..." : "Update Contact"}
//               </button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default UpdateContact;


import { ErrorMessage, Field, Form, Formik } from 'formik';
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MainContext } from "../Context/Context";
import * as Yup from 'yup';

const UpdateContact = () => {
  const { id } = useParams(); 
  const { contacts, setContacts } = useContext(MainContext);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    isSpam: false,
  });
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const userId = localStorage.getItem("id");
        const response = await axios.get(`http://localhost:8000/users/${userId}`);
        const currentContact = response.data.contacts.find((c) => c.id === parseInt(id));
        setContact(currentContact);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchContact();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      const userId = localStorage.getItem("id");
      const updatedContacts = contacts.map((c) => (c.id === parseInt(id) ? values : c)); 

      const response = await axios.patch(`http://localhost:8000/users/${userId}`, {
        contacts: updatedContacts,
      });

      if (response.status === 200) {
        setContacts(updatedContacts);
        alert("Contact updated successfully!");
        navigate("/"); 
      }
    } catch (error) {
      console.error(error);
      alert("Error updating contact");
    }
  };

  return (
    <div className="h-[100vh] p-4 sm:p-20 flex items-center">
      <Formik
        initialValues={contact}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize // Allow Formik to reinitialize with new values
      >
        {({ isSubmitting }) => (
          <Form className="bg-slate-300 rounded-lg shadow-custom-shadow p-8 md:p-16 w-[100%]">
            <h1 className="text-3xl font-bold text-center md:text-left">Update Contact</h1>
            <div className="flex flex-col w-full gap-2 mt-4">
              <label htmlFor="name" className="text-lg font-bold opacity-70">Name</label>
              <Field
                type="text"
                name="name"
                placeholder="Enter Your Name"
                className="h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid"
              />
              <ErrorMessage name="name" component="span" className="text-red-600" />
            </div>
            <div className="flex flex-col w-full gap-2 mt-4">
              <label htmlFor="email" className="text-lg font-bold opacity-70">Email</label>
              <Field
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid"
              />
              <ErrorMessage name="email" component="span" className="text-red-600" />
            </div>
            <div className="flex flex-col w-full gap-2 mt-4">
              <label htmlFor="phone" className="text-lg font-bold opacity-70">Phone</label>
              <Field
                type="text"
                name="phone"
                placeholder="Enter Your Phone Number"
                className="h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid"
              />
              <ErrorMessage name="phone" component="span" className="text-red-600" />
            </div>
            <div className="flex flex-col w-full gap-2 mt-4">
              <label className="inline-flex items-center">
                <Field
                  type="checkbox"
                  name="isSpam"
                  className="mr-2"
                />
                Is Spam?
              </label>
            </div>
            <div className="w-full flex justify-center items-center mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-slate-200 text-base md:text-lg w-3/4 p-2 rounded-full hover:bg-slate-600 hover:text-white transition-all ease-in-out duration-300"
              >
                {isSubmitting ? "Updating..." : "Update Contact"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateContact;
