import { useState } from "react";
import "./App.css";
import { Contacts, Navbar } from "./components";

const ContactManagerApp = () => {
  const [loading, setLoading] = useState(false);
  const [getContacts, setContacts] = useState([]);
  return (
    <div className="App">
      <Navbar />/
      <Contacts contacts={getContacts} loading={loading} />
    </div>
  );
};

export default ContactManagerApp;
