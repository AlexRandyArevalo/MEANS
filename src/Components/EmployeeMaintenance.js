import React from 'react'
import Header from './Header';
import Menubar from './Menubar';
import { Link } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
library.add(faUserPlus);

function EmployeeMaintenance() {
    return (<div>
        <Header />
        <div className="d-flex">
            <Menubar />
            <div className="means-body col-md-9 bg-light">
                <h4 className="ps-5 pt-4 pb-2 mean-title">Employee Maintenance</h4>
                <hr />
                <div className="container">
                    <div className="d-flex mt-4">
                        <div className="col-md-3 m-2 shadow-sm p-3 mb-5 bg-body rounded" style={{ maxHeight: "400px" }}>
                            <h6 for="fileupload" className="form-label pt-3 pb-3">File Upload</h6>
                            <input className="form-control" type="file" accept=".csv" id="fileupload" />
                            <br />
                            <br />
                            <button type="button" className="btn btn-purple">Submit</button>
                        </div>
                        <div className="col-md-9 m-2">
                            <div className="d-flex mb-3">
                                <div className="pt-3 pb-3 align-self-center col-10">
                                    <input style={{ width: "30%" }} type="email" className="form-control" id="exampleFormControlInput1" placeholder="Search..." />
                                </div>
                                <div className="pt-3 pb-3 fs-3 float-right col-2">
                                    <Link style={{ width: "50% !important" }} type="button" className="btn btn-purple"><FontAwesomeIcon icon="user-plus" /> &nbsp;Add</Link>
                                </div>
                            </div>

                            {/* TABLE */}
                            <div class="shadow-sm p-3 mb-5 bg-body rounded mt-3">
                                <h5 className="pb-3">Employee List</h5>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">First</th>
                                            <th scope="col">Last</th>
                                            <th scope="col">Handle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)


}

export default EmployeeMaintenance;