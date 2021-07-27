import React from 'react'
import Header from './Header';
import Menubar from './Menubar';
import { Link } from 'react-router-dom'


function RiskAssessments() {
    return (<div>
        <Header />
        <div className="d-flex">
            <Menubar />
            <div className="means-body col-md-9 bg-light">
                <h4 className="ps-5 pt-4 pb-2 mean-title">Risk Assessments</h4>
                <hr />
                <div className="container">
                    <div className="d-flex mb-3 mt-4">
                        <div className="pt-3 pb-3 align-self-center col-10">
                            <input style={{ width: "30%" }} type="email" className="form-control" id="exampleFormControlInput1" placeholder="Search..." />
                        </div>
                        <div className="pt-3 pb-3 fs-3 float-right col-2">
                            <Link type="button" className="btn_ btn-purple" to="/addriskassessments">Add Risk Assessment</Link>
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="shadow-sm p-3 mb-5 bg-body rounded">
                    <h5 className="pb-3">Risk Assessments</h5>
                        <table className="table">
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
    </div>)


}

export default RiskAssessments;