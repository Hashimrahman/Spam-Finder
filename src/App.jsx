import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./Components/Register";
import ContextProvider from "./Context/Context";
import Login from "./Components/Login";
import Home from "./Components/Home/Home";
import AddContact from "./Components/AddContact";
import UpdateContact from "./Components/UpdateContact";

function App() {
  return (
    <>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addContact" element={<AddContact />} />
          <Route path="/updateContact/:id" element={<UpdateContact />} />
        </Routes>
      </ContextProvider>
    </>
  );
}

export default App;
