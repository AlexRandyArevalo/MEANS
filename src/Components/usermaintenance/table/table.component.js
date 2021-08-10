import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert'
import { Modal, OverlayTrigger, Popover } from "react-bootstrap"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../custom-style/style.css'
import Table from '../../table.component/table.component'
import { ClipLoader } from "react-spinners";
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

    /*addressOne: "gapan city"
    addressTwo: "nueva ecija"
    contact: "9123456789"
    eid: "aa@accenture.com"
    fName: "alex"
    lName: "arevalo"
    mName: "vargas"
    __v: 0
    _id: "6108d214b5f810001528ec07"*/

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
                showHide: false
            },
            user: {
                eid: "",
                phoneno: "",
                lname: "",
                fname: "",
                mname: "",
                addr1: "",
                addr2: ""
            }
        }
    }

    // Modal Toggle
    showModal = () => {
        this.setState({ modal: { showHide: true } })

    }
    hideModal = () => {
        this.setState({ modal: { showHide: false } })
    }

    // Prep Users Data
    componentDidMount() {
        this.state.loader.didmount = true
        this.setDataTable()
    }

    // Display List of Users
    setDataTable() {
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
                } else {
                    console.log('Data not found')
                }
            })
            .catch(err => console.log(err))
    }

    // Delete User
    Delete = (that) => {
        Swal({
            title: `Delete ${that.lName}, ${that.fName}?`,
            html: true,
            text: "You won't be able to revert this!",
            icon: "warning",
            buttons: [
                'Cancel',
                'Delete'
            ],
            dangerMode: true,
        }).then(function (isConfirm) {
            if (isConfirm) {
                axios.delete(`/user/${that._id}`)
                    .then((res) => {
                        Swal({
                            title: 'Deleted!',
                            text: `${that.lName}, ${that.fName} has been deleted.`,
                            icon: 'success'
                        }).then(function () {
                            this.setDataTable()
                        });
                    }, (err) => {
                        console.log(err);
                    });
            } else {
                Swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
        })
    }

    // Edit User
    Edit = (id) => {
        console.log('edit')
        axios.get(`/user/${id}`)
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        id: id,
                        user: {
                            eid: res.data.data.eid,
                            phoneno: res.data.data.contact,
                            lname: res.data.data.lName,
                            fname: res.data.data.fName,
                            mname: res.data.data.mName,
                            addr1: res.data.data.addressOne,
                            addr2: res.data.data.addressTwo
                        }
                    })
                    this.showModal()
                } else {
                    console.log('User not found')
                }
            })
            .catch(err => console.log(err))
    }

    // Save to DB
    updateUser = (e) => {

        e.preventDefault()
        this.setState({ loader_edit: { loading_edit: true } }) // Show Loader
        let jsonData = {
            eid: e.target.eid.value,
            phoneno: e.target.phoneno.value,
            lname: e.target.lname.value,
            fname: e.target.fname.value,
            mname: e.target.mname.value,
            addr1: e.target.addr1.value,
            addr2: e.target.addr2.value
        }
        console.log(this.state.user)
        axios.patch(`/user/${this.state.id}`, jsonData)
            .then((res) => {
                this.setDataTable()
                this.setState({ loader_edit: { loading_edit: false } }) // Hide Loader
                this.hideModal()
            }, (err) => {
                console.log(err);
            });
    }

    render() {
        return (<div>
            <div className="progress-wrapper">
            </div >
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
                    <div className="sweet-loading pt-2 ps-1">
                        <ClipLoader color={this.state.color} loading={this.state.loader.loading} size={24} />
                    </div>
                }
                Body={
                    this.state.users.data.map((user, index) =>
                    (<tr key={index}>
                        <td>{index + 1}</td>
                        <td className="text-truncate td-mw-12 text-muted" title={user.eid}>{this.state.users.data[index].eid}</td>
                        <td className="text-truncate td-mw-12 text-muted" title={user.lName}>{this.state.users.data[index].lName}</td>
                        <td className="text-truncate td-mw-12 text-muted" title={user.fName}>{this.state.users.data[index].fName}</td>
                        <td className="text-truncate td-mw-12 text-muted" title={user.mName}>{this.state.users.data[index].mName}</td>
                        <td className="text-truncate td-mw-12 text-muted" title={user.contact}>{this.state.users.data[index].contact}</td>
                        <td className="text-truncate td-mw-12 text-muted" title={user.addressOne}>{this.state.users.data[index].addressOne}</td>
                        <td className="text-truncate td-mw-12 text-muted" title={user.addressTwo}>{this.state.users.data[index].addressTwo}</td>
                        <td>
                            <OverlayTrigger
                                trigger={'click'}
                                rootClose={true}
                                key={'top'}
                                placement={'top'}
                                overlay={
                                    <Popover>
                                        <Popover.Content>
                                            <a href="#" className="text-dark p-2" onClick={() => this.Delete(user)}><FontAwesomeIcon icon="trash-alt" /></a>
                                            <a href="#" className="text-dark p-2" onClick={() => this.Edit(user._id)}><FontAwesomeIcon icon="edit" /></a>
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
            <Modal show={this.state.modal.showHide} size="lg">
                <Modal.Header>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <form onSubmit={this.updateUser}>
                    <Modal.Body>

                        <div className="row m-3">
                            <div className="col-md-7">
                                <label className="text-muted ps-1 fs-13">E.I.D</label>
                                <input onChange={(e) => this.setState({ user: { eid: e.target.value } })} value={this.state.user.eid} name="eid" type="email" className="form-control" placeholder="E.I.D" required />
                            </div>
                            <div className="col-md-5">
                                <label className="text-muted ps-1 fs-13">Contact</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" value="+63" style={{ maxWidth: "55px" }} />
                                    <input onChange={(e) => this.setState({ user: { phoneno: e.target.value } })} value={this.state.user.phoneno} name="phoneno" type="text" className="form-control" placeholder="___-___-__" required />
                                </div>
                            </div>
                            <div className="col-md-4 mt-4">
                                <label className="text-muted ps-1 fs-13">Last Name</label>
                                <input onChange={(e) => this.setState({ user: { lname: e.target.value } })} value={this.state.user.lname} name="lname" type="text" className="form-control" placeholder="Last Name" required />
                            </div>
                            <div className="col-md-4 mt-4">
                                <label className="text-muted ps-1 fs-13">First Name</label>
                                <input onChange={(e) => this.setState({ user: { fname: e.target.value } })} value={this.state.user.fname} name="fname" type="text" className="form-control" placeholder="First Name" required />
                            </div>
                            <div className="col-md-4 mt-4">
                                <label className="text-muted ps-1 fs-13">Middle Name</label>
                                <input onChange={(e) => this.setState({ user: { mname: e.target.value } })} value={this.state.user.mname} name="mname" type="text" className="form-control" placeholder="Middle Name" required />
                            </div>
                            <div className="col-md-12 mt-4">
                                <label className="text-muted ps-1 fs-13">Address Line 1</label>
                                <input onChange={(e) => this.setState({ user: { addr1: e.target.value } })} value={this.state.user.addr1} name="addr1" type="text" className="form-control" placeholder="Address Line 1" required />
                            </div>
                            <div className="col-md-12 mt-4">
                                <label className="text-muted ps-1 fs-13">Address Line 2</label>
                                <input onChange={(e) => this.setState({ user: { addr2: e.target.value } })} value={this.state.user.addr2} name="addr2" type="text" className="form-control" placeholder="Address Line 2" />
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={() => this.hideModal()}>Cancel</button>
                        <button className="btn btn-success" type="submit">
                            <ClipLoader color={'#fff'} loading={this.state.loader_edit.loading_edit} size={10} />
                            &nbsp; Save &nbsp;
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>)
    }
}
