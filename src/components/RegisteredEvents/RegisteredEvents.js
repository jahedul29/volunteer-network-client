import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { UserContext } from "../../App";

const RegisteredEvents = () => {
  const [regEvents, setRegEvents] = useState([]);
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:5000/getRegEventByEmail/" + loggedInUser.email)
      .then((res) => res.json())
      .then((data) => setRegEvents(data));
  }, [loggedInUser.email]);

  const handleDelete = (e, id) => {
    fetch("http://localhost:5000/deleteReg/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        const newEvents = regEvents.filter((e) => e._id !== id);
        setRegEvents(newEvents);
      });
  };

  return (
    <Container className="my-5">
      <h2>Your Registered Events</h2>
      <br />
      <Row>
        {regEvents.map((regEvent) => (
          <Col key={regEvent._id} className="my-4" sm={6}>
            <Row>
              <Col xs={3}>
                <img className="w-100" src={regEvent.image} alt="" />
              </Col>
              <Col xs={9}>
                <h5>{regEvent.volunteeringTitle}</h5>
                <p>{new Date(regEvent.date).toDateString()}</p>
                <br />
                <button
                  onClick={(e) => handleDelete(e, regEvent._id)}
                  className="btn btn-danger"
                >
                  Cancel
                </button>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RegisteredEvents;
