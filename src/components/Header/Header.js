import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import { handleSignOut } from "../Login/loginManager";
import "./Header.css";

const Header = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  let history = useHistory();

  const signOut = () => {
    handleSignOut().then((res) => setLoggedInUser(res));
  };

  return (
    <header>
      <Navbar collapseOnSelect expand="lg">
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
            <Nav.Link>Blog</Nav.Link>
            <Nav.Link onClick={() => history.push("/events")}>Events</Nav.Link>
            {loggedInUser.email ? (
              <>
                <Nav.Link>{loggedInUser.name}</Nav.Link>
                <Nav.Link onClick={signOut}>SignOut</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  onClick={() => history.push("/login")}
                  className="btn btn-primary"
                >
                  LogIn
                </Nav.Link>
              </>
            )}

            {loggedInUser.email === "jahedulh1@gmail.com" && (
              <Nav.Link
                onClick={() => history.push("/adminHome")}
                className="btn btn-info"
              >
                Admin
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
