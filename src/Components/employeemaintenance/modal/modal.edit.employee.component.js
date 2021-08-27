import { Component } from "react";
import { Modal } from "react-bootstrap";
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { ClipLoader } from "react-spinners";
import axios from "axios";

export default class EditEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showHide: false,
            loader: false,
        }
    }
    showModal = () => {
        this.setState({ showHide: true })
    }
    hideModal = () => {
        this.setState({ showHide: false })
    }
    hasChanges = (datahere, e) => {
        this.setState({
            [datahere]: e.target.value
        })
    }
    Edit = (emp) => {
        this.setState({
            id: emp._id,
            eid: emp.eid,
            phoneno: emp.contact,
            lname: emp.lName,
            fname: emp.fName,
            mname: emp.mName,
            addr: emp.address
        })
        this.showModal()
    }
    Form = () => {
        return (<div className="row m-3">
            <div className="col-md-7">
                <label className="pb-1 fw-bold fs-13 ps-1">E.I.D</label>
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
                <label className="pb-1 fw-bold fs-13 ps-1">Contact</label>
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
                <label className="pb-1 fw-bold fs-13 ps-1">Last name</label>
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
                <label className="pb-1 fw-bold fs-13 ps-1">First Name</label>
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
                <label className="pb-1 fw-bold fs-13 ps-1">Middle Name</label>
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
                <label className="pb-1 fw-bold fs-13 ps-1">Address</label>
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
        const Footer = () => {
            const { addToast } = useToasts()
            const UpdateEmployee = () => {
                this.setState({ loader: true }) // Show Loader
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
                            this.setState({ loader: false }) // Hide Loader
                            this.props.loadupdates()
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
                        <ClipLoader color={'#fff'} loading={this.state.loader} size={10} />
                        &nbsp; Save &nbsp;
                    </button>
                </Modal.Footer>
            )
        }
        return (
            <ToastProvider>
                <Modal show={this.state.showHide} size="lg" className="mt-5">
                    <Modal.Header>
                        <Modal.Title>Edit Employee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.Form()}
                    </Modal.Body>
                    <Footer />
                </Modal>
            </ToastProvider>
        )
    }
}