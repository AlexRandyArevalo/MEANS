import React, { Component } from 'react'
import axios from 'axios'
import Search from '../../../Components/searchbox/search.component'
import { Modal, OverlayTrigger, Popover } from "react-bootstrap"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ClipLoader } from "react-spinners"
import Table from '../../table.component/table.component'
import { ToastProvider, useToasts } from 'react-toast-notifications'
import {
    faTrashAlt,
    faEdit,
    faEllipsisH
} from '@fortawesome/free-solid-svg-icons'
import EditEmployee from '../modal/modal.edit.employee.component'
import DeleteEmployee from '../modal/modal.delete.employee.component'
library.add(
    faTrashAlt,
    faEdit,
    faEllipsisH
);

class EmployeeList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            color: "#9500f3",
            prefix: "",
            loader: {
                loading: false,
                didmount: false
            },
            loader_edit: {
                loading_edit: false
            },
            employees: [],
            modal: {
                showHide: false,
                showHide_delete: false,
            },
            firstname: "",
            lastname: "",
        }
    }

    // Modal
    showModal = () => {
        this.setState({ modal: { showHide: true } })
    }
    hideModal = () => {
        this.setState({ modal: { showHide: false } })
    }

    // Delete Modal Toggle
    showModal_delete = (emp) => {
        this.setState({ modal: { showHide_delete: true } })
        this.setState({
            id: emp._id,
            firstname: emp.fName,
            lastname: emp.lName,
        })
    }
    hideModal_delete = () => {
        this.setState({ modal: { showHide_delete: false } })
    }

    // Search Function -> Get Data
    GetSearchItems = () => {
        let items = [];
        if (this.state.employees) {
            this.state.employees.map(emp => {
                items.push({
                    _id: emp._id,
                    name: emp.eid,
                    eid: emp.eid,
                    lName: emp.lName,
                    fName: emp.fName,
                    contact: emp.contact,
                    address: emp.address,
                })
            })
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

    // Edit Employee
    Edit = (id) => {
        axios.get(`/employee/${id}`)
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        id: id,
                        eid: res.data.data.eid,
                        phoneno: res.data.data.contact,
                        lname: res.data.data.lName,
                        fname: res.data.data.fName,
                        mname: res.data.data.mName,
                        addr: res.data.data.address
                    })
                    this.showModal()
                } else {
                    console.log('User not found')
                }
            })
            .catch(err => console.log(err))
    }

    // Handle Changes
    hasChanges = (datahere, e) => {
        this.setState({
            [datahere]: e.target.value
        })
    }

    EditForm = () => {
        return (<div className="row m-3">
            <div className="col-md-7">
                <label className="text-muted ps-1 fs-13">E.I.D</label>
                <input
                    onChange={this.hasChanges.bind(this, 'eid')}
                    value={this.state.eid}
                    name="eid"
                    type="email"
                    className="form-control"
                    placeholder="E.I.D"
                    required
                />
            </div>
            <div className="col-md-5">
                <label className="text-muted ps-1 fs-13">Contact</label>
                <div className="input-group">

                    <input
                        onChange={(e) => this.setState({ prefix: e.target.value })}
                        type="text" className="form-control"
                        value="+63"
                        style={{ maxWidth: "55px" }}
                    />
                    <input
                        onChange={this.hasChanges.bind(this, 'phoneno')}
                        value={this.state.phoneno}
                        name="phoneno"
                        type="text"
                        className="form-control"
                        placeholder="___-___-__"
                        required
                    />
                </div>
            </div>
            <div className="col-md-4 mt-4">
                <label className="text-muted ps-1 fs-13">Last Name</label>
                <input
                    onChange={this.hasChanges.bind(this, 'lname')}
                    value={this.state.lname}
                    name="lname"
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    required
                />
            </div>
            <div className="col-md-4 mt-4">
                <label className="text-muted ps-1 fs-13">First Name</label>
                <input
                    onChange={this.hasChanges.bind(this, 'fname')}
                    value={this.state.fname}
                    name="fname"
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    required
                />
            </div>
            <div className="col-md-4 mt-4">
                <label className="text-muted ps-1 fs-13">Middle Name</label>
                <input
                    onChange={this.hasChanges.bind(this, 'mname')}
                    value={this.state.mname}
                    name="mname"
                    type="text"
                    className="form-control"
                    placeholder="Middle Name"
                    required
                />
            </div>
            <div className="col-md-12 mt-4">
                <label className="text-muted ps-1 fs-13">Address</label>
                <input
                    onChange={this.hasChanges.bind(this, 'addr')}
                    value={this.state.addr}
                    name="addr"
                    type="text"
                    className="form-control"
                    placeholder="Address Line 1"
                    required
                />
            </div>
        </div>)
    }

    render() {
        // Delete Employee
        const ConfirmationButton = () => {
            const { addToast } = useToasts()
            const Delete = () => {
                axios.delete(`/employee/${this.state.id}`)
                    .then((res) => {
                        if (res.data.status) {
                            this.setDataTable()
                            addToast(res.data.msg, {
                                appearance: 'success',
                                autoDismiss: true,
                            })
                            this.hideModal_delete()
                        }
                    }, (err) => {
                        addToast(err.message, {
                            appearance: 'error',
                            autoDismiss: true,
                        })
                    });
            }
            return (<div className="p-2 mb-3 float-center" style={{ textAlign: "center" }}>
                <button className="btn btn-secondary me-2" onClick={this.hideModal_delete}>Cancel</button>
                <button className="btn btn-danger" onClick={Delete}>
                    <ClipLoader color={'#fff'} loading={this.state.loader_edit.loading_edit} size={10} />
                    &nbsp; Delete &nbsp;
                </button>
            </div>)
        }

        const Footer = () => {
            const { addToast } = useToasts()
            const UpdateEmployee = () => {
                this.setState({ loader_edit: { loading_edit: true } }) // Show Loader
                let jsonData = {
                    eid: this.state.eid,
                    phoneno: this.state.phoneno,
                    lname: this.state.lname,
                    fname: this.state.fname,
                    mname: this.state.mname,
                    addr: this.state.addr
                }
                axios.patch(`/employee/${this.state.id}`, jsonData)
                    .then((res) => {
                        if (res.data.status) {
                            this.setDataTable()
                            this.setState({ loader_edit: { loading_edit: false } }) // Hide Loader
                            this.hideModal()
                            addToast(res.data.msg, {
                                appearance: 'success',
                                autoDismiss: true,
                            })
                        }
                    }, (err) => {
                        addToast(err.message, {
                            appearance: 'error',
                            autoDismiss: true,
                        })
                    });
            }
            return (
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => this.hideModal()}>Cancel</button>
                    <button className="btn btn-success" onClick={UpdateEmployee}>
                        <ClipLoader color={'#fff'} loading={this.state.loader_edit.loading_edit} size={10} />
                        &nbsp; Save &nbsp;
                    </button>
                </Modal.Footer>
            )
        }
        return (<div>
            <ToastProvider>
                <div className="col-md-12 d-flex">
                    <div className="col align-self-center w-100">
                        <Search
                            items={this.GetSearchItems()}
                            onselect={this.OnSelect}
                            onclear={this.OnClear}
                            fuseoptions={{ keys: ["lName", "fName", "contact", "address"] }}
                        />
                    </div>
                    <div className="col" style={{ textAlign: "end" }}>
                        <button type="button" className="btn_ btn-purple w-25" onClick={this.showModal}><FontAwesomeIcon icon="user-plus" /> &nbsp;Add</button>
                    </div>
                </div>
                <div className="shadow-sm p-3 mb-5 bg-body rounded mt-3">
                    <h5 className="pb-3">Employee List</h5>
                    <div className="progress-wrapper">
                        <Table
                            Header={
                                <tr>
                                    <th width="5%">#</th>
                                    <th width="13.5%">EID</th>
                                    <th width="13.5%" className="text-nowrap">Last Name</th>
                                    <th width="13.5%" className="text-nowrap">First Name</th>
                                    <th width="13.5%" className="text-nowrap">Middle Name</th>
                                    <th width="13.5%">Contact</th>
                                    <th width="13.5%">Address</th>
                                    <th width="13.5%"></th>
                                </tr>
                            }
                            Loader={
                                <div className="sweet-loading pt-2 ps-1">
                                    <ClipLoader color={this.state.color} loading={this.state.loader.loading} size={24} />
                                </div>
                            }
                            Body={
                                this.state.employees.map((emp, index) =>
                                (<tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="text-truncate td-mw-12" title={emp.eid}>{this.state.employees[index].eid}</td>
                                    <td className="text-truncate td-mw-12" title={emp.lName}>{this.state.employees[index].lName}</td>
                                    <td className="text-truncate td-mw-12" title={emp.fName}>{this.state.employees[index].fName}</td>
                                    <td className="text-truncate td-mw-12" title={emp.mName}>{this.state.employees[index].mName}</td>
                                    <td className="text-truncate td-mw-12" title={emp.contact}>{this.state.employees[index].contact}</td>
                                    <td className="text-truncate td-mw-12" title={emp.address}>{this.state.employees[index].address}</td>
                                    <td>
                                        <OverlayTrigger
                                            trigger={'click'}
                                            rootClose={true}
                                            key={'top'}
                                            placement={'top'}
                                            overlay={
                                                <Popover>
                                                    <Popover.Content>
                                                        <a href="#" className="text-dark p-2" onClick={() => this.showModal_delete(emp)}><FontAwesomeIcon icon="trash-alt" /></a>
                                                        <a href="#" className="text-dark p-2" onClick={() => this.Edit(emp._id)}><FontAwesomeIcon icon="edit" /></a>
                                                    </Popover.Content>
                                                </Popover>
                                            }>
                                            <a href="#" className="text-muted p-2 ellipsis" id={`Popover${index + 1}`}><FontAwesomeIcon icon="ellipsis-h" /></a>
                                        </OverlayTrigger>
                                    </td>
                                </tr>)
                                )
                            }
                        />
                    </div>
                </div>
                {/* Edit Modal */}
                <EditEmployee
                    show={this.state.modal.showHide}
                    editform={this.EditForm()}
                    footer={<Footer />}
                />
                {/* Delete Modal */}
                <DeleteEmployee
                    show={this.state.modal.showHide_delete}
                    lastname={this.state.lastname}
                    firstname={this.state.firstname}
                    confirmation={<ConfirmationButton />}
                />
            </ToastProvider>
        </div>)
    }
}

export default EmployeeList;