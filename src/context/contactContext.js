import { createContext } from "react";

export const ContactContext = createContext({
  loading: false,
  setLoading: () => {},
  contact: {},
  setContacts: () => {},
  setFilteredContacts: () => {},
  contacts: [],
  filteredContacts: [],
//   contactQuery: {},
  groups: [],
  onContactChange: () => {},
  deleteContact: () => {},
  //   updateContact: () => {},
  createContact: () => {},
  contactSearch: () => {},
});
