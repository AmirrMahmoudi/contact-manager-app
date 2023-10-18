import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Contacts from "./components/contact/Contacts";

const ContactManagerApp = () => {
  const [loading, setLoading] = useState(true);
  const [getContacts, setContacts] = useState([]);
  return (
    <div className="App">
      <Navbar />/
      <Contacts contacts={getContacts} loading={loading} />
    </div>
  );
};

export default ContactManagerApp;
