import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormControl, Row } from "react-bootstrap";
import SingleEvent from "../SingleEvent/SingleEvent";

const Home = () => {
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/getAllEvents")
      .then((res) => res.json())
      .then((data) => setAllEvents(data));
  }, []);

  return (
    <Container className="text-center my-5">
      <h1>I GROW BY HELPING PEOPLE IN NEED</h1>
      <br />
      <div className="w-25 m-auto">
        <Form inline>
          <FormControl type="text" placeholder="Search" />
          <Button variant="primary">Search</Button>
        </Form>
      </div>

      <Row className="mt-5">
        {allEvents.map((event) => (
          <SingleEvent key={event._id} event={event}></SingleEvent>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
