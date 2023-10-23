import MAN_TAKING_NOTE from "@assets/man-taking-note.png";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/colors";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../";
import { useContext, useEffect, useState } from "react";

import { getContact, updateContact } from "../../services/contactService";
import { ContactContext } from "../../context/contactContext";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { contactSchema } from "../../validations/contactValidation";

const EditContact = () => {
  const { contactId } = useParams();
  const {
    contacts,
    setContacts,
    loading,
    setLoading,
    groups,
    setFilteredContacts,
  } = useContext(ContactContext);
  const navigate = useNavigate();

  const [contact, setContact] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getContact(contactId);

        setLoading(false);
        setContact(contactData);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const submitForm = async (values) => {
    try {
      setLoading(true);

      const { data, status } = await updateContact(values, contactId);

      if (status === 200) {
        setLoading(false);

        const allContacts = [...contacts];
        const contactIndex = allContacts.findIndex((c) => c.id === +contactId);
        allContacts[contactIndex] = { ...data };

        setContacts(allContacts);
        setFilteredContacts(allContacts);

        navigate("/contacts");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <p className="h4 fw-bold" style={{ color: ORANGE }}>
                  ویرایش مخاطب
                </p>
              </div>

              <hr style={{ backgroundColor: ORANGE }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                  <Formik
                    initialValues={contact}
                    validationSchema={contactSchema}
                    onSubmit={(values) => {
                      submitForm(values);
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
                        <Field
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
                        <Field
                          name="group"
                          as="select"
                          className="form-control"
                        >
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
                          ویرایش مخاطب{" "}
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
                <div className="col-md-4">
                  <img
                    src={contact.photo}
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${PURPLE}` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-1">
              <img
                src={MAN_TAKING_NOTE}
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;
