import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import "./Header.css";

const Header = () => {
  const { loggedInUser } = useContext(UserContext);
  let history = useHistory();

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand onClick={() => history.push("/")}>
        <img
          className="brand-img"
          src="https://i.imgur.com/Vd38Tjo.png"
          alt=""
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link>Home</Nav.Link>
          <Nav.Link>Donation</Nav.Link>
          <Nav.Link onClick={() => history.push("/events")}>Events</Nav.Link>
          <Nav.Link>Blog</Nav.Link>
          {loggedInUser.email ? (
            <Nav.Link>{loggedInUser.name}</Nav.Link>
          ) : (
            <>
              <Nav.Link className="btn btn-primary" href="#pricing">
                Register
              </Nav.Link>
            </>
          )}
          <Nav.Link
            onClick={() => history.push("/adminHome")}
            className="btn btn-dark"
          >
            Admin
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
