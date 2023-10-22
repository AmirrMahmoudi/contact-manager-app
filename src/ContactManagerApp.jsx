import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import {
  AddContact,
  Contacts,
  EditContact,
  Navbar,
  ViewContact,
} from "./components";
import {
  createContact,
  getAllContacts,
  getAllGroups,
  deleteContact,
} from "./services/contactService";
import "./App.css";
import {
  COMMENT,
  CURRENTLINE,
  FOREGROUND,
  PURPLE,
  YELLOW,
} from "./helpers/colors";
import { ContactContext } from "./context/contactContext";

const ContactManagerApp = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [contact, setContact] = useState({});

  const [contactQuery, setContactQuery] = useState({ text: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();

        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const createContactForm = async (event) => {
    event.preventDefault();
    try {
      const { status } = await createContact(contact);

      if (status === 201) {
        setContact({});
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message());
    }
  };

  const onContactChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
            <p style={{ color: FOREGROUND }}>
              مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  const removeContact = async (contactId) => {
    try {
      setLoading(true);
      const response = await deleteContact(contactId);
      if (response) {
        const { data: contactData } = await getAllContacts();

        setContacts(contactData);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };
  const contactSearch = (event) => {
    setContactQuery({ ...contactQuery, text: event.target.value });
    const allContacts = contacts.filter((contact) => {
      return contact.fullname
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    setFilteredContacts(allContacts);
  };
  return (
    <ContactContext.Provider
      value={{
        loading,
        setLoading,
        contact,
        contactQuery,
        setContact,
        contacts,
        filteredContacts,
        groups,
        onContactChange,
        deleteContact: confirmDelete,
        createContact: createContactForm,
        contactSearch,
      }}
    >
      <div className="App">
        <Navbar  />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />

          <Route
            path="/contacts"
            element={
              <Contacts
                contacts={filteredContacts}
                loading={loading}
                confirmDelete={confirmDelete}
              />
            }
          />
          <Route
            path="/contacts/add"
            element={
              <AddContact
                loading={loading}
                setContactInfo={onContactChange}
                contact={contact}
                groups={groups}
                createContactForm={createContactForm}
              />
            }
          />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        </Routes>

        {/* <Contacts contacts={contacts} loading={loading} /> */}
      </div>
    </ContactContext.Provider>
  );
};

export default ContactManagerApp;
