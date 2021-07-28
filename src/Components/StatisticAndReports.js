import React, { useState } from "react";
import Header from './Header';
import Menubar from './Menubar';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { Line } from "react-chartjs-2";

function StatisticReports() {
    const [dateSelected, onChange] = useState([new Date(), new Date()]);

    const data = {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        datasets: [
            {

                label: "First dataset",
                data: [33, 53, 85, 41, 44, 65, 41, 44, 65],
                fill: true,
                backgroundColor: "#9b03fb78",
                borderColor: "#9500f3"
            },
            {
                label: "Second dataset",
                data: [33, 25, 35, 51, 54, 76, 41, 44, 69],
                fill: true,
                backgroundColor: "#9b03fb78",
                borderColor: "#9500f3"
            }
        ]
    };

    const handleValidate = (e) => {
        e.preventDefault()
        console.log(dateSelected);
    }

    return (<div>
        <Header />
        <div className="d-flex">
            <Menubar />
            <div className="means-body col-md-9 bg-light">
                <h4 className="ps-3 pt-4 pb-2 mean-title">Statistic and Reports</h4>
                <hr />
                <div className="container">
                    <div class="shadow-sm p-3 mb-3 bg-body rounded mt-4">
                        <form onSubmit={handleValidate}>
                            <div className="d-flex ps-3">
                                <div className="align-self-center">
                                    <DateRangePicker
                                        onChange={onChange}
                                        value={dateSelected}
                                    />
                                </div>
                                <div className="align-self-center ps-3">
                                    <button type="submit" className="btn_ btn-purple">Submit</button>
                                </div>
                            </div>
                            <div className="col-md-12 d-flex means-chart">
                                <div className="col-md-6 means-chart-I">
                                    <Line data={data} />
                                </div>
                                <div>&nbsp;</div>
                                <div className="col-md-6 means-chart-II">
                                    <Line data={data} />
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* TABLE */}
                    <div class="shadow-sm p-3 mb-5 bg-body rounded">
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
                    </div>

                </div>
            </div>
        </div>

    </div>)
}

export default StatisticReports;