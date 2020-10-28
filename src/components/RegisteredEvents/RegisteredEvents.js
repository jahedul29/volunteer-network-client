import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { UserContext } from "../../App";
import NoItemExist from "../NoItemsExist/NoItemExist";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisteredEvents = () => {
  const [regEvents, setRegEvents] = useState([]);
  const { loggedInUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  document.title = "Your registered events";

  useEffect(() => {
    fetch(
      "https://volunteer-network-server-jahed.herokuapp.com/getRegEventByEmail/" +
        loggedInUser.email
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setRegEvents(data);
      });
  }, [loggedInUser.email]);

  const handleDelete = (e, id) => {
    setLoading(true);
    fetch(
      "https://volunteer-network-server-jahed.herokuapp.com/deleteReg/" + id,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        toast.success("🦄 Wow entry deleted successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        const newEvents = regEvents.filter((e) => e._id !== id);
        setRegEvents(newEvents);
        setLoading(false);
      });
  };

  return (
    <Container className="mt-4">
      <LoadingOverlay active={loading} spinner={<BounceLoader />}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />
        {regEvents && regEvents.length > 0 && (
          <>
            <h2 className="text-center text-primary">Your Registered Events</h2>
            <br />
            <Row>
              {regEvents.map((regEvent) => (
                <Col key={regEvent._id} className="my-2 px-2" sm={12} lg={6}>
                  <Row>
                    <Col xs={{ span: 4, offset: 1 }}>
                      <img
                        className="w-100"
                        src={`data:image/png;base64,${regEvent.image.img}`}
                        alt=""
                      />
                    </Col>
                    <Col className="border" xs={{ span: 6 }}>
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
          </>
        )}
        {!loading && regEvents && regEvents.length <= 0 && (
          <NoItemExist item={"registered event"} />
        )}
      </LoadingOverlay>
    </Container>
  );
};

export default RegisteredEvents;
