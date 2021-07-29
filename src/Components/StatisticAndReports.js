import React, { useState } from "react";
import Header from './Header';
import Menubar from './Menubar';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { Pie } from "react-chartjs-2";

function StatisticReports() {
    // Pie Data I
    const Data_I = {
        // labels: [
        //   'Red',
        //   'Blue',
        //   'Yellow'
        // ],
        datasets: [{
            label: 'My First Dataset',
            data: [40, 50, 35, 87, 65],
            backgroundColor: [
                '#e35d6a',//red
                '#de5c9d',//pink
                '#8c68cd',//purple
                '#8540f5',//indigo
                '#3d8bfd' //blue
            ],
            hoverOffset: 4
        }]
    };

    // Pie Data II
    const Data_II = {
        // labels: [
        //   'Red',
        //   'Blue',
        //   'Yellow'
        // ],
        datasets: [{
            label: 'My First Dataset',
            data: [65, 87, 35, 50, 40],
            backgroundColor: [
                '#3dd5f3',//cyan
                '#4dd4ac',//teal
                '#ced4da',//gray
                '#ffcd39',//yellow
                '#fd9843' //orange
            ],
            hoverOffset: 4
        }]
    };

    // Static Data
    const DataTable = [
        {
            id: 1,
            title: "[Empty]",
            location: "[Empty]",
            description: "[Empty]"
        },
        {
            id: 2,
            title: "[Empty]",
            location: "[Empty]",
            description: "[Empty]"
        },
        {
            id: 3,
            title: "[Empty]",
            location: "[Empty]",
            description: "[Empty]"
        }
    ]

    // DropDown Static Data
    const dropdownlist = [
        {
            id: 1,
            text: "Type of Risk 1"
        },
        {
            id: 2,
            text: "Type of Risk 2"
        },
        {
            id: 3,
            text: "Type of Risk 3"
        }
    ]

    return (<div>
        <Header />
        <div className="d-flex">
            <Menubar />
            <div className="means-body col-md-9 bg-light">
                <h4 className="ps-4 pt-4 pb-2 mean-title">Statistic and Reports</h4>
                <hr />
                <div className="container">
                    <div className="shadow-sm mb-3 bg-body rounded mt-4">
                        <div className="card-header p-3 d-flex align-self-center bg-white">
                            <div className="col-md-6 align-self-center" >
                                Select Risk Assessment
                            </div>
                            <div className="col-md-6 align-self-center" style={{ display: "flex", justifyContent: "flex-end" }}>
                                <select className="form-select w-50" aria-label="Default select example">
                                    <option selected>Please select</option>
                                    {
                                        dropdownlist.map(riskdata =>
                                            <option value={riskdata.id}>{riskdata.text}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="col-md-12 d-flex means-chart">
                            <div className="col-md-4 means-chart-I p-4 mx-auto">
                                <Pie data={Data_I} />
                            </div>
                            <div className="col-md-4 means-chart-II p-4 mx-auto">
                                <Pie data={Data_II} />
                            </div>
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="shadow-sm p-3 mb-5 bg-body rounded">
                        <h5 className="pb-3">List of Employees at Risk</h5>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th width="5%">#</th>
                                    <th width="25%">Empty</th>
                                    <th width="20%">Empty</th>
                                    <th width="20%">Empty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    DataTable.map(data =>
                                        <tr>
                                            <th scope="row">{data.id}</th>
                                            <td>{data.title}</td>
                                            <td>{data.location}</td>
                                            <td>{data.description}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>

    </div>)
}

export default StatisticReports;