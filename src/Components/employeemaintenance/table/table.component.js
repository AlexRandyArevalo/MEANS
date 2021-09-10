import React, { Component } from 'react'
import axios from 'axios'
import Search from '../../../Components/searchbox/search.component'
import Tippy from '@tippyjs/react';
import "tippy.js/dist/tippy.css";
import 'tippy.js/animations/scale.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ClipLoader } from "react-spinners"
import Table from '../../table.component/table.component'
import {
    faTrashAlt,
    faEdit,
    faEllipsisH
} from '@fortawesome/free-solid-svg-icons'
import EditEmployee from '../modal/modal.edit.employee.component'
import DeleteEmployee from '../modal/modal.delete.employee.component'
import AddEmployee from '../modal/modal.add.employee.component'
library.add(
    faTrashAlt,
    faEdit,
    faEllipsisH
);

class EmployeeList extends Component {
    constructor(props) {
        super(props)
        this.addmodal = React.createRef([])
        this.deletemodal = React.createRef([])
        this.editmodal = React.createRef([])
        this.state = {
            id: "",
            color_red: "#dc3545",
            prefix: "",
            employees: [],
            loader: {
                loading: false,
                didmount: false
            },
        }
        this.setDataTable = this.setDataTable.bind(this)
    }

    // Search Function -> Get Data
    GetSearchItems = () => {
        let items = [];
        if (this.state.employees) {
            this.state.employees.map(emp => (
                items.push({
                    _id: emp._id,
                    name: emp.eid,
                    eid: emp.eid,
                    lName: emp.lName,
                    fName: emp.fName,
                    contact: emp.contact,
                    address: emp.address,
                })
            ))
        }
        return items;
    }

    // Search Function -> On Select
    OnSelect = (item) => {
        this.setState({ employees: [item] })
        console.log(item);
    };
    // Search Function -> On Clear
    OnClear = () => {
        this.setDataTable()
    };

    // Prep Employees Data
    componentDidMount() {
        this.setState({ loader: { didmount: true } })
        this.setDataTable()
    }

    // Display List of Employees
    setDataTable() {
        if (this.state.loader.didmount)
            this.setState({ loader: { loading: true } }) // Show Loader
        axios.get("/employees")
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        employees: res.data.data
                    })
                    this.setState({ loader: { loading: false } }) // Hide Loader
                } else {
                    console.log('Data not found')
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        return (<div>
            <div className="col-md-12 d-flex">
                <div className="col align-self-center w-100">
                    <Search
                        items={this.GetSearchItems()}
                        onselect={this.OnSelect}
                        onclear={this.OnClear}
                    // fuseoptions={{ keys: ["lName", "fName", "contact", "address"] }}
                    />
                </div>
                <div className="col" style={{ textAlign: "end" }}>
                    <button type="button" className="btn_ btn-purple w-25" onClick={() => this.addmodal.current.showModal()}><FontAwesomeIcon icon="user-plus" /> &nbsp;Add</button>
                </div>
            </div>
            <div className="shadow-sm p-3 mb-5 bg-body rounded mt-3">
                <h5 className="p-3 pb-0">Employee List</h5>
                <div className="border rounded p-4 m-3">
                    <Table
                        class={'table'}
                        Header={
                            <tr>
                                <th width="5%">#</th>
                                <th width="16%">EID</th>
                                <th width="16%" className="text-nowrap">Last Name</th>
                                <th width="16%" className="text-nowrap">First Name</th>
                                {/* <th width="10%" className="text-nowrap">Middle Name</th> */}
                                <th width="16%">Contact</th>
                                <th width="16%">Address</th>
                                <th width="5%"></th>
                            </tr>
                        }
                        Loader={
                            <tr>
                                <td className="sweet-loading pt-2 ps-1" style={{ borderBottom: "none", padding: "0px" }}>
                                    <ClipLoader color={this.state.color_red} loading={this.state.loader.loading} size={24} />
                                </td>
                            </tr>
                        }
                        Body={
                            this.state.employees.map((emp, index) =>
                            (<tr key={index}>
                                <th>{index + 1}.</th>
                                <td className="text-truncate td-mw-12 text-muted" title={emp.eid}>{this.state.employees[index].eid}</td>
                                <td className="text-truncate td-mw-12 text-muted" title={emp.lName}>{this.state.employees[index].lName}</td>
                                <td className="text-truncate td-mw-12 text-muted" title={emp.fName}>{this.state.employees[index].fName}</td>
                                {/* <td className="text-truncate td-mw-12 text-muted" title={emp.mName}>{this.state.employees[index].mName}</td> */}
                                <td className="text-truncate td-mw-12 text-muted" title={emp.contact}>{this.state.employees[index].contact}</td>
                                <td className="text-truncate td-mw-12 text-muted" title={emp.address}>{this.state.employees[index].address}</td>
                                <td>
                                    <Tippy
                                        offset={[0, -3]}
                                        interactive={true}
                                        animation="scale"
                                        placement="top"
                                        trigger="click"
                                        content={
                                            <div className="pt-2 pb-2">
                                                <a href="!#" className="text-white p-2" onClick={() => this.deletemodal.current.showModal_delete(emp)}><FontAwesomeIcon icon="trash-alt" /></a>
                                                <a href="!#" className="text-white p-2" onClick={() => this.editmodal.current.Edit(emp)}><FontAwesomeIcon icon="edit" /></a>
                                            </div>
                                        }
                                    >
                                        <a href="!#" className="text-muted p-2" id={`Popover${index + 1}`}><FontAwesomeIcon icon="ellipsis-h" /></a>
                                    </Tippy>
                                </td>
                            </tr>)
                            )
                        }
                    />
                </div>
            </div>
            {/* Edit Modal */}
            <EditEmployee
                ref={this.editmodal}
                loadupdates={this.setDataTable}
            />
            {/* Delete Modal */}
            <DeleteEmployee
                ref={this.deletemodal}
                loadupdates={this.setDataTable}
            />
            {/* Add Modal */}
            <AddEmployee
                ref={this.addmodal}
                loadupdates={this.setDataTable}
            />
        </div>)
    }
}

export default EmployeeList;