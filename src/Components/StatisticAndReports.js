import React, { useState } from "react";

import Header from './Header';
import Menubar from './Menubar';
import { Link } from 'react-router-dom'

function StatisticReports() {
    const [startDate, setStartDate] = useState(new Date());
    return (<div>
        <Header />
        <div className="d-flex">
            <Menubar />
            <div className="means-body col-md-9 bg-light">
                <h4 className="ps-5 pt-4 pb-2 mean-title">Statistic and Reports</h4>
                <hr />
                <div className="container">

                    

                    <div className="d-flex mt-4">

                    </div>

                    {/* TABLE */}
                    {/* <div class="shadow-sm p-3 mb-5 bg-body rounded">
                        <h5 className="pb-3">List of Employees at Risk</h5>
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
                    </div> */}

                </div>
            </div>
        </div>

    </div>)
}

export default StatisticReports;