import { BrowserRouter } from "react-router-dom";
import ContactManagerApp from "./ContactManagerApp";
import "react-confirm-alert/src/react-confirm-alert.css";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <ContactManagerApp />
      </BrowserRouter>
    </>
  );
};
3;

export default App;
