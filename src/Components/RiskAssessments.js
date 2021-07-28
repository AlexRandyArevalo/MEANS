import React from 'react'
import Header from './Header';
import Menubar from './Menubar';
import { Link } from 'react-router-dom'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
library.add(faSearch);

function RiskAssessments() {
    
    return (<div>
        <Header />
        <div className="d-flex">
            <Menubar />
            <div className="means-body col-md-9 bg-light">
                <h4 className="ps-3 pt-4 pb-2 mean-title">Risk Assessments</h4>
                <hr />
                <div className="container">
                    <div className="col-md-12 d-flex pb-3 mt-4 risk-assess">
                        <div className="col align-self-center w-100">
                            <div className="form-group">
                                <div className="icon-addon addon-md">
                                    <input type="text" placeholder="Search" className="form-control w-50 search" />
                                    <label for="Search" className="glyphicon glyphicon-search" rel="tooltip" title="Search"><FontAwesomeIcon icon="search" /></label>
                                </div>
                            </div>
                        </div>
                        <div className="col" style={{ textAlign: "end" }}>
                            <Link type="button" className="btn_ btn-purple w-50" to="/addriskassessments">Add Risk Assessment</Link>
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