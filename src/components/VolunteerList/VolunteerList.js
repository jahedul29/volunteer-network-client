import React, { useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";

const VolunteerList = (props) => {
  const [allRegEvents, setAllRegEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://volunteer-network-server-jahed.herokuapp.com/getAllRegEvent")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setAllRegEvents(data);
      });
  }, []);

  const handleEventDelete = (id) => {
    fetch(
      "https://volunteer-network-server-jahed.herokuapp.com/deleteReg/" + id,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("🦄 Wow entry deleted successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          const newEvents = allRegEvents.filter((event) => event._id !== id);
          setAllRegEvents(newEvents);
        }
      });
  };

  return (
    <div className="p-2">
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
        <Table striped hover variant="white" responsive="md">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Registered Date</th>
              <th>Volunteering Title</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {allRegEvents &&
              allRegEvents.map((event) => (
                <tr key={event._id}>
                  <td>{event.fullName}</td>
                  <td>{event.email}</td>
                  <td>{new Date(event.date).toDateString()}</td>
                  <td>{event.volunteeringTitle}</td>
                  <td>
                    <FontAwesomeIcon
                      onClick={() => handleEventDelete(event._id)}
                      style={{ color: "red", fontSize: "25px" }}
                      icon={faTrash}
                    ></FontAwesomeIcon>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </LoadingOverlay>
    </div>
  );
};

export default VolunteerList;
