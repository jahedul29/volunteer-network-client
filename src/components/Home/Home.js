import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormControl, Row } from "react-bootstrap";
import SingleEvent from "../SingleEvent/SingleEvent";
// import loading_spin from "%PUBLIC_URL%/loading_spin.gif";
import "./Home.css";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";

const Home = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://volunteer-network-server-jahed.herokuapp.com/getAllEvents")
      .then((res) => res.json())
      .then((data) => {
        setAllEvents(data);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="text-center my-5">
      <div className="bg-container"></div>
      <h1>I GROW BY HELPING PEOPLE IN NEED</h1>
      <br />
      <div className="w-25 m-auto">
        <Form inline>
          <FormControl type="text" placeholder="Search" />
          <Button variant="primary">Search</Button>
        </Form>
      </div>
      <div>
        <LoadingOverlay active={loading} spinner={<BounceLoader />}>
          <Row className="mt-5">
            {allEvents.map((event) => (
              <SingleEvent key={event._id} event={event}></SingleEvent>
            ))}
          </Row>
        </LoadingOverlay>
      </div>
    </Container>
  );
};

export default Home;
