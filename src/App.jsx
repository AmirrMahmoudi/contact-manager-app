import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Contacts from "./components/contact/Contacts";

const App = () => {
  const [getContacts, setContacts] = useState([]);
  return (
    <div className="App">
      <Navbar />
      <Contacts contacts={getContacts} />
    </div>
  );
};
3;

export default App;
