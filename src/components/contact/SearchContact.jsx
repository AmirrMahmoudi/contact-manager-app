import { PURPLE } from "../../helpers/colors";

const SearchContact = () => {
  return (
    <div className="input-group mx-2 w-75" dir="ltr">
      <span
        className="input-group-text"
        id="basic-addon1"
        style={{ backgroundColor: "purple" }}
      >
        <i className="fas fa-search"></i>
      </span>
      <input
        dir="rtl"
        type="text"
        style={{
          backgroundColor: "gray",
          borderColor: PURPLE,
        }}
        className="form-control"
        placeholder="جستو جوی مخاطب"
        aria-label="Search"
        aria-description="basic-addon1"
      />
    </div>
  );
};

export default SearchContact;
