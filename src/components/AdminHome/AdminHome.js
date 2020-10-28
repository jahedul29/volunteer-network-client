import { faList, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./AdminHome.css";
import VolunteerList from "../VolunteerList/VolunteerList";
import AddEvent from "../AddEvent/AddEvent";
import EventList from "../EventList/EventList";

const AdminHome = () => {
  const [currentContent, setCurrentContent] = useState("Volunteer List");

  document.title = "Admin Home";

  return (
    <Container fluid className="p-0 my-2 w-100 overflow-hidden">
      <Row className="mb-3">
        <Col xs={3}>
          {/* <img className=" w-50" src="https://i.imgur.com/Vd38Tjo.png" alt="" /> */}
        </Col>
        <Col xs={9}>
          <h4>{currentContent}</h4>
        </Col>
      </Row>
      <Row>
        <Col className="mt-5 pl-5" md={2} sm={4}>
          <ul style={{ listStyleType: "none" }}>
            <li
              onClick={() => setCurrentContent("Volunteer List")}
              className="my-3"
            >
              <FontAwesomeIcon
                style={{ color: "#426ff5" }}
                icon={faUser}
              ></FontAwesomeIcon>{" "}
              &nbsp; Volunteer List
            </li>
            <li onClick={() => setCurrentContent("Add Event")} className="my-3">
              <FontAwesomeIcon
                style={{ color: "#426ff5" }}
                icon={faPlus}
              ></FontAwesomeIcon>{" "}
              &nbsp; Add Event
            </li>
            <li
              onClick={() => setCurrentContent("Event List")}
              className="my-3"
            >
              <FontAwesomeIcon
                style={{ color: "#426ff5" }}
                icon={faList}
              ></FontAwesomeIcon>{" "}
              &nbsp; Events
            </li>
          </ul>
        </Col>
        <Col
          style={{ backgroundColor: "lightgray", width: "100%" }}
          md={10}
          sm={8}
        >
          <div
            style={{
              height: "500px",
              margin: "2% 1%",
              backgroundColor: "white",
              borderRadius: "10px",
              overflow: "scroll",
            }}
          >
            {currentContent === "Volunteer List" && <VolunteerList />}
            {currentContent === "Add Event" && <AddEvent />}
            {currentContent === "Event List" && <EventList />}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHome;
