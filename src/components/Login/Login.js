import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import "./Login.css";
import { handleGoogleSignIn, initializeLoginFramework } from "./loginManager";

// Initializing firebase
initializeLoginFramework();

const Login = () => {
  // state for storing logged in user data
  const { setLoggedInUser } = useContext(UserContext);

  document.title = "Login";

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  // Function to handle google signIN
  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      setLoggedInUser(res);
      history.replace(from);
    });
  };

  return (
    <Container className="login-container my-5">
      <div className="form-container">
        <div className="m-auto input-form-container ">
          <h4 className="my-5 ">Sign In</h4>
          <div>
            <div onClick={googleSignIn} className="login-alternative">
              <img src="https://i.imgur.com/P9ZVhek.png" alt="" />
              <h6 className="mt-1">Sign in with google</h6>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
