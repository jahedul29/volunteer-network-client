import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";

const EventList = () => {
  const [allEventWithoutImg, setAllEventWithoutImg] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://volunteer-network-server-jahed.herokuapp.com/getAllEvents")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setAllEventWithoutImg(data);
      });
  }, []);

  const handleEventDelete = (id) => {
    fetch(
      "https://volunteer-network-server-jahed.herokuapp.com/deleteEvent/" + id,
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
          const newEvents = allEventWithoutImg.filter(
            (event) => event._id !== id
          );
          setAllEventWithoutImg(newEvents);
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
              <th>Title</th>
              <th>Description</th>
              <th>Registered Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {allEventWithoutImg &&
              allEventWithoutImg.map((event) => (
                <tr key={event._id}>
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>{new Date(event.date).toDateString()}</td>
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

export default EventList;
