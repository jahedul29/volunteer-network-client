import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { UserContext } from "../../App";
import { Controller, useForm } from "react-hook-form";
import "./Registration.css";
import ReactDatePicker from "react-datepicker";
import { addDays } from "date-fns";

// importing datepicker css
import "react-datepicker/dist/react-datepicker.css";
import { useHistory, useParams } from "react-router-dom";

const Registration = () => {
  // Hooks for react-form-hooks
  const { register, handleSubmit, control, errors } = useForm();

  let history = useHistory();

  // state for storing logged in user data
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const [event, setEvent] = useState({});

  const { eventName } = useParams();

  useEffect(() => {
    fetch("http://localhost:5000/getEventByName/" + eventName)
      .then((res) => res.json())
      .then((data) => setEvent(data));
  }, [eventName]);

  const onSubmit = (info) => {
    const newInfo = { ...info, image: event.image };
    fetch("http://localhost:5000/addRegInfo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newInfo),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    if (newInfo.image) {
      history.push("/events");
    }
  };

  return (
    <Container className="my-5">
      <div className="reg-form-container">
        <div className="m-auto input-form-container">
          <h4>Register as Volunteer</h4>
          <form className="signing-form" onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="Full Name"
              defaultValue={loggedInUser.name || ""}
              className="form-control"
              readOnly={true}
              name="fullName"
              ref={register({
                required: "Full Name is required",
                pattern: {
                  value: /[A-Za-z]{3}/,
                  message: "Name must contain minimum 3 letter and only letter", // <p>error message</p>
                },
              })}
            />

            {errors.fullName && (
              <span className="error">{errors.fullName.message}</span>
            )}

            <input
              placeholder="Your Email"
              className="form-control"
              readOnly={true}
              defaultValue={loggedInUser.email || ""}
              name="email"
              ref={register({
                required: "Email required",
                pattern: {
                  value: /^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\-\\.]+)\.([a-zA-Z]{2,5})$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}

            <Controller
              control={control}
              defaultValue=""
              name="date"
              rules={{
                required: {
                  value: true,
                  message: "Date required",
                },
              }}
              render={(props) => (
                <ReactDatePicker
                  className="form-control"
                  placeholderText="Date"
                  minDate={new Date()}
                  maxDate={addDays(new Date(), 7)}
                  dateFormat="dd/MM/yyyy"
                  onChange={(e) => props.onChange(e)}
                  selected={props.value}
                />
              )}
            />
            {errors.date && (
              <span className="error">{errors.date.message}</span>
            )}

            <input
              placeholder="Description"
              className="form-control"
              name="description"
              ref={register({
                required: "Name is required",
                pattern: {
                  value: /[A-Za-z]{3}/,
                  message: "Name must contain minimum 3 letter and only letter", // <p>error message</p>
                },
              })}
            />
            {errors.description && (
              <span className="error">{errors.description.message}</span>
            )}

            <input
              placeholder="Volunteering Title"
              className="form-control"
              readOnly={true}
              defaultValue={eventName || ""}
              name="volunteeringTitle"
              ref={register({
                required: "Volunteering Title",
                pattern: {
                  value: /[A-Za-z]{3}/,
                  message: "Name must contain minimum 3 letter and only letter", // <p>error message</p>
                },
              })}
            />
            {errors.description && (
              <span className="error">{errors.description.message}</span>
            )}

            <input
              style={{ border: "0px" }}
              className="form-control btn-info"
              type="submit"
              value="Register"
            />
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Registration;
