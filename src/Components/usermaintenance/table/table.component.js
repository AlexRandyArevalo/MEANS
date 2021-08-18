import React, { Component } from 'react'
import axios from 'axios'
import { Modal } from "react-bootstrap"
import Tippy from '@tippyjs/react';
import "tippy.js/dist/tippy.css";
import 'tippy.js/animations/scale.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../custom-style/style.css'
import Table from '../../table.component/table.component'
import { ClipLoader } from "react-spinners"
import { ToastProvider, useToasts } from 'react-toast-notifications'
import ModalEditUser from '../modal/modal.edit.user.component'
import ModalDeleteUser from '../modal/modal.delete.user.component'
import {
    faTrashAlt,
    faEdit,
    faEllipsisH
} from '@fortawesome/free-solid-svg-icons'
library.add(
    faTrashAlt,
    faEdit,
    faEllipsisH
);

export default class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            color: "#9500f3",
            loader: {
                loading: false,
                didmount: false
            },
            loader_edit: {
                loading_edit: false
            },
            users: {
                data: []
            },
            modal: {
                showHide: false,
                showHide_delete: false,
            },
            firstname: "",
            lastname: "",
        }
    }

    // Modal Toggle
    showModal = () => {
        this.setState({ modal: { showHide: true } })
    }
    hideModal = () => {
        this.setState({ modal: { showHide: false } })
    }

    // Delete Modal Toggle
    showModal_delete = (user) => {
        this.setState({ modal: { showHide_delete: true } })
        this.setState({
            id: user._id,
            firstname: user.fName,
            lastname: user.lName,
        })
    }
    hideModal_delete = () => {
        this.setState({ modal: { showHide_delete: false } })
    }

    // Prep Users Data
    componentDidMount() {
        this.state.loader.didmount = true
        this.setDataTable()
    }

    // Display List of Users
    setDataTable = () => {
        console.log('setDataTable')
        if (!!this.state.loader.didmount)
            this.setState({ loader: { loading: true } }) // Show Loader
        axios.get("/users")
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        users: {
                            data: res.data.data
                        }
                    })
                    this.setState({ loader: { loading: false } }) // Hide Loader
                }
            })
            .catch(err => console.log(err))
    }

    // Edit User
    Edit = (id) => {
        axios.get(`/user/${id}`)
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        id: id,
                        eid: res.data.data.eid,
                        phoneno: res.data.data.contact,
                        lname: res.data.data.lName,
                        fname: res.data.data.fName,
                        mname: res.data.data.mName,
                        addr1: res.data.data.addressOne,
                        addr2: res.data.data.addressTwo
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

    Form = () => {
        return (<div className="row m-3">
            <div className="col-md-7">
                <label className="text-muted ps-1 fs-13">E.I.D</label>
                <input onChange={this.hasChanges.bind(this, 'eid')} value={this.state.eid} name="eid" type="email" className="form-control" placeholder="E.I.D" required />
            </div>
            <div className="col-md-5">
                <label className="text-muted ps-1 fs-13">Contact</label>
                <div className="input-group">
                    <input onChange={this.hasChanges.bind(this, 'prefix')} type="text" className="form-control" value="+63" style={{ maxWidth: "55px" }} />
                    <input onChange={this.hasChanges.bind(this, 'phoneno')} value={this.state.phoneno} name="phoneno" type="text" className="form-control" placeholder="___-___-__" required />
                </div>
            </div>
            <div className="col-md-4 mt-4">
                <label className="text-muted ps-1 fs-13">Last Name</label>
                <input onChange={this.hasChanges.bind(this, 'lname')} value={this.state.lname} name="lname" type="text" className="form-control" placeholder="Last Name" required />
            </div>
            <div className="col-md-4 mt-4">
                <label className="text-muted ps-1 fs-13">First Name</label>
                <input onChange={this.hasChanges.bind(this, 'fname')} value={this.state.fname} name="fname" type="text" className="form-control" placeholder="First Name" required />
            </div>
            <div className="col-md-4 mt-4">
                <label className="text-muted ps-1 fs-13">Middle Name</label>
                <input onChange={this.hasChanges.bind(this, 'mname')} value={this.state.mname} name="mname" type="text" className="form-control" placeholder="Middle Name" required />
            </div>
            <div className="col-md-12 mt-4">
                <label className="text-muted ps-1 fs-13">Address Line 1</label>
                <input onChange={this.hasChanges.bind(this, 'addr1')} value={this.state.addr1} name="addr1" type="text" className="form-control" placeholder="Address Line 1" required />
            </div>
            <div className="col-md-12 mt-4">
                <label className="text-muted ps-1 fs-13">Address Line 2</label>
                <input onChange={this.hasChanges.bind(this, 'addr2')} value={this.state.addr2} name="addr2" type="text" className="form-control" placeholder="Address Line 2" />
            </div>
        </div>)
    }

    render() {
        // Delete User
        const ConfirmationButton = () => {
            const { addToast } = useToasts()
            const Delete = () => {
                axios.delete(`/user/${this.state.id}`)
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

        // Update User
        const FooterButton = () => {
            const { addToast } = useToasts()
            const UpdateUser = () => {
                this.setState({ loader_edit: { loading_edit: true } }) // Show Loader
                let jsonData = {
                    eid: this.state.eid,
                    phoneno: this.state.phoneno,
                    lname: this.state.lname,
                    fname: this.state.fname,
                    mname: this.state.mname,
                    addr1: this.state.addr1,
                    addr2: this.state.addr2
                }
                // console.log(jsonData)
                axios.patch(`/user/${this.state.id}`, jsonData)
                    .then((res) => {
                        this.setDataTable()
                        this.setState({ loader_edit: { loading_edit: false } }) // Hide Loader
                        this.hideModal()
                        addToast(res.data.msg, {
                            appearance: 'success',
                            autoDismiss: true,
                        })
                    }, (err) => {
                        addToast(err.message, {
                            appearance: 'error',
                            autoDismiss: true,
                        })
                        this.setState({ loader_edit: { loading_edit: false } }) // Hide Loader
                    });
            }
            return (<Modal.Footer>
                <button className="btn btn-secondary" onClick={() => this.hideModal()}>Cancel</button>
                <button className="btn btn-success" onClick={UpdateUser}>
                    <ClipLoader color={'#fff'} loading={this.state.loader_edit.loading_edit} size={10} />
                    &nbsp; Save &nbsp;
                </button>
            </Modal.Footer>)
        }

        return (<div>

            <ToastProvider>
                <div className="shadow-sm p-3 mb-5 bg-body rounded">
                    <h5 className="pb-3">User List</h5>
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
                                    <th width="13.5%">Address I</th>
                                    <th width="13.5%">Address II</th>
                                    <th width="13.5%"></th>
                                </tr>
                            }
                            Loader={
                                <tr>
                                    <td className="sweet-loading pt-2 ps-1" style={{ borderBottom: "none", padding: "0px" }}>
                                        <ClipLoader color={this.state.color} loading={this.state.loader.loading} size={24} />
                                    </td>
                                </tr>
                            }
                            Body={
                                this.state.users.data.map((user, index) =>
                                (<tr key={index}>
                                    <th>{index + 1}.</th>
                                    <td className="text-truncate td-mw-12 text-muted" title={user.eid}>{this.state.users.data[index].eid}</td>
                                    <td className="text-truncate td-mw-12 text-muted" title={user.lName}>{this.state.users.data[index].lName}</td>
                                    <td className="text-truncate td-mw-12 text-muted" title={user.fName}>{this.state.users.data[index].fName}</td>
                                    <td className="text-truncate td-mw-12 text-muted" title={user.mName}>{this.state.users.data[index].mName}</td>
                                    <td className="text-truncate td-mw-12 text-muted" title={user.contact}>{this.state.users.data[index].contact}</td>
                                    <td className="text-truncate td-mw-12 text-muted" title={user.addressOne}>{this.state.users.data[index].addressOne}</td>
                                    <td className="text-truncate td-mw-12 text-muted" title={user.addressTwo}>{this.state.users.data[index].addressTwo}</td>
                                    <td>
                                        <Tippy
                                            // offset={[0, 3]}
                                            interactive={true}
                                            animation="scale"
                                            placement="top"
                                            trigger="click"
                                            content={
                                                <div className="pt-2 pb-2">
                                                    <a href="#" className="text-white p-2" onClick={() => this.showModal_delete(user)}>
                                                        <FontAwesomeIcon icon="trash-alt" />
                                                    </a>
                                                    <a href="#" className="text-white p-2" onClick={() => this.Edit(user._id)}>
                                                        <FontAwesomeIcon icon="edit" />
                                                    </a>
                                                </div>
                                            }
                                        >
                                            <a href="#" className="text-muted" id={`Popover${index + 1}`}><FontAwesomeIcon icon="ellipsis-h" /></a>
                                        </Tippy>
                                    </td>
                                </tr>)
                                )
                            }
                        />
                    </div >
                    {/* Edit User Modal */}
                    <ModalEditUser
                        show={this.state.modal.showHide}
                        body={this.Form()}
                        footer={<FooterButton />}
                    />
                    <ModalDeleteUser
                        show={this.state.modal.showHide_delete}
                        lastname={this.state.lastname}
                        firstname={this.state.firstname}
                        footer={<ConfirmationButton />}
                    />
                </div>
            </ToastProvider>
        </div>)
    }
}
