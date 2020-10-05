import {
  faFileUpload,
  faPlus,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { addDays } from "date-fns";
import "./AdminHome.css";

// importing datepicker css
import "react-datepicker/dist/react-datepicker.css";

const AdminHome = () => {
  // Hooks for react-form-hooks
  const { register, handleSubmit, control, errors } = useForm();

  const [currentContent, setCurrentContent] = useState("Volunteer List");

  const [allRegEvents, setAllRegEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/getAllRegEvent")
      .then((res) => res.json())
      .then((data) => setAllRegEvents(data));
  }, []);

  const onSubmit = (info) => {};

  const handleEventDelete = (id) => {
    fetch("http://localhost:5000/deleteReg/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === 200) {
          const newEvents = allRegEvents.filter((event) => event._id !== id);
          setAllRegEvents(newEvents);
          console.log(allRegEvents.length);
        }
      });
  };

  return (
    <Container fluid className="p-0 my-5">
      <Row>
        <Col xs={3}></Col>
        <Col xs={9}>
          <h4>{currentContent}</h4>
        </Col>
      </Row>
      <Row>
        <Col className="mt-5 pl-5" xs={2}>
          <ul className="text-primary" style={{ listStyleType: "none" }}>
            <li
              onClick={() => setCurrentContent("Volunteer List")}
              className="my-3"
            >
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> &nbsp; Volunteer
              List
            </li>
            <li onClick={() => setCurrentContent("Add Event")} className="my-3">
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> &nbsp; Add Event
            </li>
          </ul>
        </Col>
        <Col style={{ backgroundColor: "lightgray", width: "100%" }} xs={10}>
          <div
            style={{
              height: "500px",
              margin: "2% 1%",
              backgroundColor: "white",
              borderRadius: "10px",
              overflow: "scroll",
            }}
          >
            {/* Volunteer list */}
            {currentContent === "Volunteer List" ? (
              <div className="p-2">
                <Table striped hover variant="white" responsive="md">
                  <thead className="thead-light">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Registered Date</th>
                      <th>Volunteering Title</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {allRegEvents &&
                      allRegEvents.map((event) => (
                        <tr key={event._id}>
                          <td>{event.fullName}</td>
                          <td>{event.email}</td>
                          <td>{new Date(event.date).toDateString()}</td>
                          <td>{event.volunteeringTitle}</td>
                          <td>
                            <FontAwesomeIcon
                              onClick={() => handleEventDelete(event._id)}
                              style={{ color: "red", fontSize: "25px" }}
                              icon={faTrash}
                            ></FontAwesomeIcon>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              <div className="p-2">
                <form action="" onSubmit={handleSubmit(onSubmit)}>
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
                      />
                      {errors.description && (
                        <span className="error">
                          {errors.description.message}
                        </span>
                      )}
                    </Col>
                    <Col className="form-group" xs={6}>
                      <label htmlFor="">Banner</label>
                      <label class="custom-file-upload">
                        <input type="file" />
                        <FontAwesomeIcon
                          icon={faFileUpload}
                        ></FontAwesomeIcon>{" "}
                        Upload
                      </label>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={{ span: 2, offset: 10 }}>
                      <button className="btn btn-primary w-100" type="submit">
                        Submit
                      </button>
                    </Col>
                  </Row>
                </form>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHome;
