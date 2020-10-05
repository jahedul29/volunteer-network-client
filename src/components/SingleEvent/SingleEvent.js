import React from "react";
import { Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./SingleEvent.css";

const SingleEvent = (props) => {
  const event = props.event;
  let history = useHistory();

  const handleEventClick = (e) => {
    history.push(`/registration/${e.title}`);
  };
  return (
    <Col md={3} sm={6}>
      <div
        onClick={() => handleEventClick(event)}
        className="rounded overflow-hidden"
      >
        <img className="w-100" src={event.image} alt="" />
        <div className="rounded-bottom event-title">
          <h4>{event.title}</h4>
        </div>
      </div>
    </Col>
  );
};

export default SingleEvent;
