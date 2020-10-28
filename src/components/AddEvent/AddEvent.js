import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { addDays } from "date-fns";
import "./AddEvent.css";

// importing datepicker css
import "react-datepicker/dist/react-datepicker.css";
import { Alert, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";

const AddEvent = () => {
  const { register, handleSubmit, control, errors } = useForm();
  const [base64ImageString, setBase64ImageString] = useState("");
  const [formSubmitMesg, setFormSubmitMesg] = useState("");

  const onChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    } else {
      errors.image.message = "Something went wrong";
    }
  };

  const handleReaderLoaded = (readerEvent) => {
    const binaryString = readerEvent.target.result;
    setBase64ImageString(btoa(binaryString));
  };

  const onSubmit = (info) => {
    setFormSubmitMesg("");
    const formData = new FormData();
    formData.append("title", info.title);
    formData.append("description", info.description);
    formData.append("date", info.date);
    formData.append("image", info.image[0]);

    fetch("https://volunteer-network-server-jahed.herokuapp.com/addEvent", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setFormSubmitMesg("Event added successfully");
          setBase64ImageString("");
          document.getElementById("event-add-form").reset();
        }
      });
  };

  return (
    <div className="p-2">
      {formSubmitMesg && <Alert variant="success">{formSubmitMesg}</Alert>}
      <form id="event-add-form" action="" onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col className="form-group" xs={6}>
            <label htmlFor="title">Title</label>
            <input
              placeholder="Enter title*"
              className="form-control my-1 "
              name="title"
              ref={register({
                required: "Title required",
                pattern: {
                  value: /[A-Za-z]{3}/,
                  message:
                    "Title must contain minimum 3 letter and only letter", // <p>error message</p>
                },
              })}
            />

            {errors.title && (
              <span className="error">{errors.title.message}</span>
            )}
          </Col>
          <Col className="form-group" xs={6}>
            <label htmlFor="date">Date</label>
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
                  className="form-control my-1"
                  placeholderText="Date*"
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
          </Col>
        </Row>
        <Row>
          <Col className="form-group" xs={6}>
            <label htmlFor="description">Description</label>
            <input
              placeholder="Description"
              className="form-control my-1"
              name="description"
              ref={register({
                required: false,
              })}
            />
          </Col>
          <Col className="form-group" xs={6}>
            <label htmlFor="">Banner</label>
            <label className="custom-file-upload">
              <input
                onChange={(e) => onChange(e)}
                type="file"
                name="image"
                accept=".jpeg, .png, .jpg"
                ref={register({
                  required: "Banner image required",
                })}
              />
              <FontAwesomeIcon icon={faFileUpload}></FontAwesomeIcon> Upload
            </label>
            {errors.image && (
              <span className="error">{errors.image.message}</span>
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <img
              className="w-50"
              src={`data:image/png;base64,${base64ImageString}`}
              alt=""
            />
          </Col>
          <Col xs={{ span: 2, offset: 4 }}>
            <button className="btn btn-primary w-100" type="submit">
              Submit
            </button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default AddEvent;
