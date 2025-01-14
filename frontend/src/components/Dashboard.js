import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../features/auth/authSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = useState("");
  console.log("User: ", user); // Debugging purpose
  console.log("Token: ", token); // Debugging purpose
  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/checkTokenValid",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.data.status) {
          setErrorMessage(response.data.message);
          setTimeout(() => {
            dispatch(logout());
            navigate("/login");
          }, 3000);
        }
      } catch (error) {
        console.error("Error checking token validity:", error);
        setErrorMessage("An error occurred while validating your session.");
        setTimeout(() => {
          dispatch(logout());
          navigate("/login");
        }, 3000);
      }
    };

    if (token) {
      checkTokenValidity();
    } else {
      navigate("/login");
    }
  }, [token, dispatch, navigate]);

  return (
    <Container className="mt-5">
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <h4>Welcome, {user.name}!</h4>
          <p>Email: {user.email}</p>

          <p>
            Token is valid for 1 minute and if it is expired then you will
            redirect to login page
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default Dashboard;
