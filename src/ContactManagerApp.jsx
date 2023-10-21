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

const ContactManagerApp = () => {
  const [loading, setLoading] = useState(false);
  const [forceRender, setForceRender] = useState(false);
  const [getContacts, setContacts] = useState([]);
  const [getFilteredContacts, setFilteredContacts] = useState([]);

  const [getGroups, setGroups] = useState([]);
  const [getContact, setContact] = useState({
    fullname: "",
    photo: "",
    mobile: "",
    email: "",
    job: "",
    group: "",
  });

  const [query, setQuery] = useState({ text: "" });

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();

        setContacts(contactsData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [forceRender]);
  const createContactForm = async (event) => {
    event.preventDefault();
    try {
      const { status } = await createContact(getContact);

      if (status === 201) {
        setContact({});
        setForceRender(!forceRender);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message());
    }
  };

  const setContactInfo = (event) => {
    setContact({ ...getContact, [event.target.name]: event.target.value });
  };

  const confirm = (contactId, contactFullname) => {
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
    setQuery({ ...query, text: event.target.value });
    const allContacts = getContacts.filter((contact) => {
      return contact.fullname
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    setFilteredContacts(allContacts);
  };
  return (
    <div className="App">
      <Navbar query={query} search={contactSearch} />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />

        <Route
          path="/contacts"
          element={
            <Contacts
              contacts={getFilteredContacts}
              loading={loading}
              confirmDelete={confirm}
            />
          }
        />
        <Route
          path="/contacts/add"
          element={
            <AddContact
              loading={loading}
              setContactInfo={setContactInfo}
              contact={getContact}
              groups={getGroups}
              createContactForm={createContactForm}
            />
          }
        />
        <Route path="/contacts/:contactId" element={<ViewContact />} />
        <Route
          path="/contacts/edit/:contactId"
          element={
            <EditContact
              forceRender={forceRender}
              setForceRender={setForceRender}
            />
          }
        />
      </Routes>

      {/* <Contacts contacts={getContacts} loading={loading} /> */}
    </div>
  );
};

export default ContactManagerApp;
