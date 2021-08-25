import { Component } from "react";
import { Modal } from "react-bootstrap";
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { ClipLoader } from "react-spinners";
import axios from "axios";

export default class ModalEditUser extends Component {
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

    Edit = (user) => {
        // axios.get(`/user/${id}`)
        //     .then(res => {
        //         if (res.data.status) {
                    this.setState({
                        id: user._id,
                        eid: user.eid,
                        phoneno: user.contact,
                        lname: user.lName,
                        fname: user.fName,
                        mname: user.mName,
                        addr1: user.addressOne,
                        addr2: user.addressTwo
                    })
                    this.showModal()
        //         } else {
        //             console.log('User not found')
        //         }
        //     })
        //     .catch(err => console.log(err))
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
        const FooterButton = () => {
            const { addToast } = useToasts()
            const UpdateUser = () => {
                this.setState({ loader: true }) // Show Loader
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
                        this.setState({ loader: false }) // Hide Loader
                        this.props.loadupdates()
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
                        this.setState({ loader: false }) // Hide Loader
                    });
            }
            return (<Modal.Footer>
                <button className="btn btn-outline-secondary" onClick={() => this.hideModal()}>Cancel</button>
                <button className="btn btn-outline-success" onClick={UpdateUser}>
                    <ClipLoader color={'#198754'} loading={this.state.loader} size={10} />
                    &nbsp; Save &nbsp;
                </button>
            </Modal.Footer>)
        }
        return (
            <ToastProvider>
                < Modal show={this.state.showHide} size="lg" >
                    <Modal.Header>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.Form()}
                    </Modal.Body>
                    <FooterButton />
                </Modal >
            </ToastProvider>
        )
    }
}