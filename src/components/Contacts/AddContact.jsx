import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";

import MAN_TAKING_NOTE from "@assets/man-taking-note.png";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";
const AddContact = () => {
  const { loading, contact, onContactChange, groups, createContact } =
    useContext(ContactContext);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="p-3">
          <img
            src={MAN_TAKING_NOTE}
            alt="man taking note"
            height="400px"
            style={{
              position: "absolute",
              zIndex: "-1",
              top: "130px",
              left: "100px",
              opacity: "50%",
            }}
          />
          <div className="container">
            <div className="row">
              <div className="col">
                <p className="h4 fw-bold text-center" style={{ color: GREEN }}>
                  ساخت مخاطب جدید
                </p>
              </div>
            </div>
            <hr style={{ backgroundColor: GREEN }} />
            <div className="row mt-5">
              <div className="col-md-4">
                <form onSubmit={createContact}>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="fullname"
                      value={contact.fullname}
                      onChange={onContactChange}
                      className="form-control"
                      placeholder="نام و نام خانوادگی"
                      required={true}
                    />
                  </div>

                  <div className="mb-2">
                    <input
                      type="text"
                      name="photo"
                      value={contact.photo}
                      onChange={onContactChange}
                      className="form-control"
                      placeholder="آدرس تصویر"
                      required={true}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="number"
                      name="mobile"
                      value={contact.mobile}
                      onChange={onContactChange}
                      className="form-control"
                      placeholder="شماره موبایل"
                      required={true}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="email"
                      name="email"
                      value={contact.email}
                      onChange={onContactChange}
                      className="form-control"
                      placeholder="آدرس ایمیل"
                      required={true}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="job"
                      value={contact.job}
                      onChange={onContactChange}
                      className="form-control"
                      placeholder="شغل"
                      required={true}
                    />
                  </div>
                  <div className="mb-2">
                    <select
                      name="group"
                      value={contact.group}
                      onChange={onContactChange}
                      required={true}
                      className="form-control"
                    >
                      <option value="">انتخاب گروه</option>

                      {groups.length > 0 &&
                        groups.map((group) => (
                          <option key={group.id} value={group.id}>
                            {group.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="mx-2">
                    <button
                      type="submit"
                      className="btn mx-2"
                      style={{ backgroundColor: PURPLE }}
                    >
                      ساخت مخاطب
                    </button>
                    <Link
                      to={"/contacts"}
                      className="btn mx-2"
                      style={{ backgroundColor: COMMENT }}
                    >
                      انصراف
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AddContact;
