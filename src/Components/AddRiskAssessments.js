import React from 'react'
import Header from './Header';
import Menubar from './Menubar';
import { Link } from 'react-router-dom'

function AddRiskAssessments() {
    return (<div>
        <Header />
        <div className="d-flex">
            <Menubar />
            <div className="means-body col-md-9 bg-light">
                <h4 className="ps-5 pt-4 pb-2 mean-title">Add Risk Assessments</h4>
                <hr />
                <div className="container">
                    <div className="row">
                        <div className="shadow-sm p-3 mt-4 mb-4 bg-body rounded">
                            <div className="p-3 pb-1">
                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Title" />
                            </div>
                            <div className="p-3 pb-1">
                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Location" />
                            </div>
                            <div className="p-3">
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Description"></textarea>
                            </div>
                        </div>

                        <div className="shadow-sm p-3 mb-5 bg-body rounded">
                            <h5>Risk Levels</h5>
                            <div className="d-flex">
                                <div className="p-3 align-self-center col-4">
                                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Risk Assessment Level" />
                                </div>
                                <div className="p-3 align-self-center col-6">
                                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Definition" />
                                </div>
                                <div className="p-3 fs-3 align-self-center col-2">
                                    <button type="button" className="btn btn-purple">Add</button>
                                </div>
                            </div>

                            {/* TABLE */}
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
    </div>)


}

export default AddRiskAssessments;