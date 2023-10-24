import { useContext } from "react";
import { Link } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";

import { Spinner } from "../";
import { contactSchema } from "../../validations/contactValidation";
import { ContactContext } from "../../context/contactContext";
import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";
import MAN_TAKING_NOTE from "@assets/man-taking-note.png";
const AddContact = () => {
  const { loading, groups, createContact } = useContext(ContactContext);

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
                <Formik
                  initialValues={{
                    fullname: "",
                    photo: "",
                    mobile: "",
                    email: "",
                    job: "",
                    group: "",
                  }}
                  validationSchema={contactSchema}
                  onSubmit={(values) => {
                    console.log(values);
                    createContact(values);
                  }}
                >
                  <Form>
                    <div className="mb-2">
                      <Field
                        type="text"
                        name="fullname"
                        className="form-control"
                        placeholder="نام و نام خانوادگی"
                      />
                      <span className="text-danger">
                        <ErrorMessage name="fullname" />
                      </span>
                    </div>

                    <div className="mb-2">
                      <Field
                        type="text"
                        name="photo"
                        className="form-control"
                        placeholder="آدرس تصویر"
                      />
                      <span className="text-danger">
                        <ErrorMessage name="photo" />
                      </span>
                    </div>
                    <div className="mb-2">
                      <Field
                        type="number"
                        name="mobile"
                        className="form-control"
                        placeholder="شماره موبایل"
                      />
                      <span className="text-danger">
                        <ErrorMessage name="mobile" />
                      </span>
                    </div>
                    <div className="mb-2">
                      <Field
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="آدرس ایمیل"
                      />
                      <span className="text-danger">
                        <ErrorMessage name="email" />
                      </span>
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        name="job"
                        className="form-control"
                        placeholder="شغل"
                      />
                      <span className="text-danger">
                        <ErrorMessage name="job" />
                      </span>
                    </div>
                    <div className="mb-2">
                      <Field name="group" as="select" className="form-control">
                        <option value="">انتخاب گروه</option>

                        {groups.length > 0 &&
                          groups.map((group) => (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          ))}
                      </Field>
                      <span className="text-danger">
                        <ErrorMessage name="group" />
                      </span>
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
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AddContact;
