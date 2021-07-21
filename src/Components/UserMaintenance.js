import React from 'react'
import Header from './Header';
import Menubar from './Menubar';
import { Link } from 'react-router-dom'

function UserMaintenance() {
    return (<div>
        <Header />
        <div className="d-flex">
            <Menubar />
            <div className="means-body col-md-9 bg-light">
                <h4 className="ps-5 pt-4 pb-2 mean-title">User Maintenance</h4>
                <hr />
                <div className="container">
                    <div className="shadow-sm p-3 mb-5 bg-body rounded mt-4">
                        <h5 className="pb-3">Application Form</h5>
                        <div className="row m-3">
                            <div className="col-md-7">
                                <input type="text" className="form-control" id="eid" placeholder="E.I.D" />
                            </div>
                            <div className="col-md-1">
                                <input type="text" className="form-control" value="+63" style={{ minWidth: "60px" }} />
                            </div>
                            <div className="col-md-4">
                                <input type="text" className="form-control" id="phoneno" placeholder="___-___-__" />
                            </div>

                            <div className="col-md-4 mt-4">
                                <input type="text" className="form-control" id="lname" placeholder="Last Name" />
                            </div>
                            <div className="col-md-4 mt-4">
                                <input type="text" className="form-control" id="fname" placeholder="First Name" />
                            </div>
                            <div className="col-md-4 mt-4">
                                <input type="text" className="form-control" id="mname" placeholder="Middle Name" />
                            </div>
                            <div className="col-md-12 mt-4">
                                <input type="text" className="form-control" id="addr1" placeholder="Address Line 1" />
                            </div>
                            <div className="col-md-12 mt-4">
                                <input type="text" className="form-control" id="addr2" placeholder="Address Line 2" />
                            </div>
                            <div className="col-md-12 pt-3">
                                <button style={{ maxWidth: "20%", float: "right" }} type="button" className="btn btn-purple pt-3">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)


}

export default UserMaintenance;