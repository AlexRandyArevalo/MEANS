import React from 'react'
import Header from './Header';
import Menubar from './Menubar';

function Dashboard() {
    return (<div>
        <Header />
        <div className="d-flex">
            <Menubar />
            <div className="means-body col-md-9 bg-light">
                <h4 className="ps-5 pt-4 pb-2 mean-title">Dashboard</h4>
                <hr />
                <div className="container">

                    {/* CARDS */}
                    <div className="d-flex mt-4" style={{ border: "solid 0px", justifyContent: "center" }}>
                        <div className="shadow p-3 mb-5 bg-body rounded mt-2 me-5 col">
                            <div className="card-body d-flex">
                                <div className="means-card-total p-4">100</div>
                                <hr className="vertical" />
                                <div className="means-card-title p-2">Risk Assessments</div>
                            </div>
                        </div>
                        <div className="shadow p-3 mb-5 bg-body rounded mt-2 me-5 col">
                            <div className="card-body d-flex">
                                <div className="means-card-total p-4">200</div>
                                <hr className="vertical" />
                                <div className="means-card-title p-2">Employees</div>
                            </div>
                        </div>
                        <div className="shadow p-3 mb-5 bg-body rounded mt-2 col">
                            <div className="card-body d-flex">
                                <div className="means-card-total p-4">300</div>
                                <hr className="vertical" />
                                <div className="means-card-title p-2">Employees Reponses</div>
                            </div>
                        </div>
                    </div>

                    {/* TABLE */}
                    <div class="shadow-sm p-3 mb-5 bg-body rounded">
                        <h5 className="pb-3">Risk Assessments</h5>
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

    </div>)
}

export default Dashboard;