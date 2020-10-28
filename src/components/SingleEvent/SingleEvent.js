import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./SingleEvent.css";

const SingleEvent = (props) => {
  const [bgColor, setBgColor] = useState("");

  const event = props.event;
  let history = useHistory();

  const handleEventClick = (e) => {
    history.push(`/registration/${e.title}`);
  };

  const getRandomColor = () => {
    const colors = ["#FFBD3E", "#FF7044", "#92eb34", "#3496eb", "#d634eb"];
    const index = Math.floor(Math.random() * 5);
    setBgColor(colors[index]);
  };

  if (bgColor === "") {
    getRandomColor();
  }

  const eventTitleBgStyle = {
    backgroundColor: bgColor,
  };

  return (
    <Col md={3} sm={6}>
      <div
        onClick={() => handleEventClick(event)}
        className="rounded overflow-hidden"
      >
        <img
          className="w-100"
          src={`data:image/png;base64,${event.image.img}`}
          alt=""
        />
        <div style={eventTitleBgStyle} className="rounded-bottom event-title">
          <h4>{event.title}</h4>
        </div>
      </div>
    </Col>
  );
};

export default SingleEvent;
