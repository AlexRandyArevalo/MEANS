import "./style.css";
import logo from "../../Assets/images/acn-logo.svg";
import swal from "sweetalert";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

function LoginForm() {
  // User Input
  const [eid, setUser] = useState("johndoe1@test.com");
  const [pass, setPass] = useState("test@101");

  const history = useHistory();

  // Validate Input Data
  const handleValidate = async (e) => {
    e.preventDefault();

    try {
      const request = await axios.post("/login", {
        eid,
        password: pass,
      });

      const response = await request?.data;
    
      if(response?.success) {
        localStorage.setItem('token', response?.token);
        setAuthToken(response?.token)
        history.push('/')
      } else {
          throw Error;
      }
    } catch (error) {
      const errMessage = error?.response?.data?.error;
      if (errMessage) {
        swal(errMessage, "Please try again", "error");
      } else {
        swal("Error executing login", "Please try again", "error");
      }
    }
  };

  return (
    <div className="col-md-4 mx-auto bg-light p-5 rounded">
      <h1 className="pb-4">MEANS</h1>
      <form onSubmit={handleValidate}>
        <div className="mb-4">
          <input
            onChange={(e) => setUser(e.target.value)}
            type="email"
            value={eid}
            className="form-control"
            placeholder="*EID"
          />
        </div>
        <div className="mb-4">
          <input
            onChange={(e) => setPass(e.target.value)}
            type="password"
            value={pass}
            className="form-control"
            placeholder="*Password"
          />
        </div>
        <button type="submit" className="btn_ btn-purple mb-4 w-100">
          Submit
        </button>
      </form>
      <div className="d-flex justify-content-center">
        <img src={logo} className="acn-logo" alt="logo" />
        <p className="h6 mt-1 ms-2">Powered by Accenture</p>
      </div>
    </div>
  );
}

export default LoginForm;
