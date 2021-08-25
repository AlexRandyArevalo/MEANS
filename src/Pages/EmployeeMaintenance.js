import React, { Component } from 'react'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import '../Components/employeemaintenance/responsive-style/style.css'
import UploadCsv from '../Components/employeemaintenance/csvupload/csv.component'
import EmployeeList from '../Components/employeemaintenance/table/table.component'

library.add(faUserPlus);

export default class EmployeeMaintenance extends Component {
    constructor(props) {
        super(props)
        this.elemRef = React.createRef([])        
    }

    getTemplate = () => {
        axios.get('/employees/excelFormat')
            .then((res) => {
                const url = window.URL.createObjectURL(new Blob([res.data], { type: 'text/csv; charset=utf-8' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'MEANS_EMPLOYEE_LIST_FORMAT.csv');
                document.body.appendChild(link);
                link.click();
            }, (err) => {

            });
    }

    refreshTable = () => {
        this.elemRef.current.setDataTable()
    }

    render() {
        return (
            <div className="means-body col-md-10 bg-light">
                <h4 className="ps-4 pt-4 pb-2 mean-title">Employee Maintenance</h4>
                <hr />
                <div className="container">
                    <div className="col-md-12 d-flex mt-4 emp-main">
                        <UploadCsv template={this.getTemplate} reloadtable={this.refreshTable} />
                        <div className="col-md-9 employee-list">
                            <div className="p-3 pt-1">
                                <EmployeeList ref={this.elemRef} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}