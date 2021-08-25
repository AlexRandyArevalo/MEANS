import { Component } from "react";
import { Modal } from "react-bootstrap";
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { ClipLoader } from "react-spinners";
import axios from "axios";

export default class AddEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            isopen: false,
        }
    }
    showModal = () => {
        this.setState({ isopen: true })
    }
    hideModal = () => {
        this.setState({ isopen: false })
    }
    hasChanges = (datahere, e) => {
        this.setState({
            [datahere]: e.target.value
        })
    }
    Form = () => {
        return (<div className="row m-3">
            <div className="col-md-7 mb-2">
                <label className="pb-1 fw-bold fs-13 ps-1">EID</label>
                <input onChange={this.hasChanges.bind(this, 'eid')} value={this.state.eid} name="eid" type="text" className="form-control" placeholder="Enter your E.I.D" required />
            </div>
            <div className="col-md-5">
                <label className="pb-1 fw-bold fs-13 ps-1">Contact</label>
                <div className="input-group mb-2">
                    <input onChange={this.hasChanges.bind(this, 'prefix')} value="+63" type="text" className="form-control" style={{ maxWidth: "55px" }} />
                    <input onChange={this.hasChanges.bind(this, 'phoneno')} value={this.state.phoneno} name="phoneno" type="text" className="form-control" placeholder="Enter contact number" required />
                </div>
            </div>
            <div className="col-md-4 mt-4 mb-2">
                <label className="pb-1 fw-bold fs-13 ps-1">Last name</label>
                <input onChange={this.hasChanges.bind(this, 'lname')} value={this.state.lname} name="lname" type="text" className="form-control" placeholder="Enter last name" required />
            </div>
            <div className="col-md-4 mt-4 mb-2">
                <label className="pb-1 fw-bold fs-13 ps-1">First name</label>
                <input onChange={this.hasChanges.bind(this, 'fname')} value={this.state.fname} name="fname" type="text" className="form-control" placeholder="Enter first name" required />
            </div>
            <div className="col-md-4 mt-4 mb-2">
                <label className="pb-1 fw-bold fs-13 ps-1">Middle name</label>
                <input onChange={this.hasChanges.bind(this, 'mname')} value={this.state.mname} name="mname" type="text" className="form-control" placeholder="Enter middle name" required />
            </div>
            <div className="col-md-12 mt-4 mb-2">
                <label className="pb-1 fw-bold fs-13 ps-1">Address</label>
                <input onChange={this.hasChanges.bind(this, 'addr')} value={this.state.addr} name="addr" type="text" className="form-control" placeholder="Enter address" required />
            </div>
        </div>)
    }
    render() {
        const Footer = () => {
            const { addToast } = useToasts()
            const SaveEmployee = () => {
                this.setState({ loading: true }) // Show loader
                let jsonData = {
                    eid: this.state.eid,
                    phoneno: this.state.phoneno,
                    lname: this.state.lname,
                    fname: this.state.fname,
                    mname: this.state.mname,
                    addr: this.state.addr
                }
                axios.post('/saveEmployee', jsonData)
                    .then((res) => {
                        this.props.loadupdates()
                        this.hideModal()
                        addToast(res.data.msg, {
                            appearance: 'success',
                            autoDismiss: true,
                        })
                        this.setState({ loading: false }) // Show loader
                    }, (err) => {
                        addToast(err.message, {
                            appearance: 'error',
                            autoDismiss: true,
                        })
                        this.setState({ loading: false }) // Show loader
                    });
            }
            return (<Modal.Footer>
                <button className="btn btn-secondary" onClick={this.hideModal}>Cancel</button>
                <button className="btn btn-success" onClick={SaveEmployee} >
                    <ClipLoader color={'#fff'} loading={this.state.loading} size={10} />
                    &nbsp; Save &nbsp;
                </button>
            </Modal.Footer>)
        }
        return (
            <ToastProvider>
                <Modal show={this.state.isopen} onHide={this.hideModal} size="lg">
                    <Modal.Header>
                        <Modal.Title>Add Employee</Modal.Title>
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