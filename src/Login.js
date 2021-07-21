import logo from './acn-logo.svg';
import swal from 'sweetalert'
import React, { useState } from 'react'


function Login() {
  const [eid, setUser] = useState('')
  const [pass, setPass] = useState('')

  const handleValidate = (e) => {
    e.preventDefault()
    if (eid === 'andy@com' && pass === '1212')
      swal("Succesful login", "Welcome to Reactjs", "success")
    else
      swal("Wrong Creadentials", "Please try again", "error")
  }
  return (
    <div className="container-fluid Login">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mx-auto bg-light p-5 rounded">
            <h1 className="pb-4">MEANS</h1>
            <form onSubmit={handleValidate}>
              <div className="mb-4">
                <input onChange={(e) => setUser(e.target.value)} type="email" value={eid} className="form-control" placeholder="*EID" />
              </div>
              <div className="mb-4">
                <input onChange={(e) => setPass(e.target.value)} type="password" value={pass} className="form-control" placeholder="*Password" />
              </div>
              <button type="submit" className="btn btn-purple mb-4">Submit</button>
            </form>
            <div className="d-flex justify-content-center">
              <img src={logo} className="acn-logo" alt="logo" />
              <p className="h6 mt-1 ms-2">Powered by Accenture</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
