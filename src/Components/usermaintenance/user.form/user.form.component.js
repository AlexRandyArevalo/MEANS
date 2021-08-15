import React, { Component } from 'react'
import axios from 'axios'
import { ClipLoader } from "react-spinners"
import { ToastProvider, useToasts } from 'react-toast-notifications'
import UserList from '../table/table.component'

export default class UserForm extends Component {
    constructor(props) {
        super(props)
        this.elemRef = React.createRef([])
        this.state = {
            eid: "",
            loader: false
        }
    }

    // Handle Changes
    hasChanges = (datahere, e) => {
        this.setState({
            [datahere]: e.target.value
        })
    }

    render() {
        const SubmitButton = () => {
            const { addToast } = useToasts()
            const SaveUser = () => {
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
                axios.post('/saveUser', jsonData)
                    .then((res) => {
                        this.elemRef.current.setDataTable()
                        this.setState({ loader: false }) // Show Loader
                        addToast(res.data.msg, {
                            appearance: 'success',
                            autoDismiss: true,
                        })
                        // Clear fields
                        this.setState({
                            eid: "",
                            phoneno: "",
                            lname: "",
                            fname: "",
                            mname: "",
                            addr1: "",
                            addr2: "",
                        })
                    }, (err) => {
                        addToast(err.message, {
                            appearance: 'error',
                            autoDismiss: true,
                        })
                        this.setState({ loader: false }) // Show Loader
                    });
            }
            return (<div className="col-md-12 pt-3" style={{ textAlign: "end" }}>
                <button onClick={SaveUser} className="btn_ btn-purple">
                    <ClipLoader className="pe-2" color={'#fff'} loading={this.state.loader} size={10} />
                    &nbsp; Submit &nbsp;
                </button>
            </div>)
        }
        return (
            <ToastProvider>
                <div className="shadow-sm p-3 mb-4 bg-body rounded mt-4">
                    <h5 className="pb-3">Application Form</h5>
                    <div className="row m-3">
                        <div className="col-md-7">
                            <input onChange={this.hasChanges.bind(this, 'eid')} value={this.state.eid} type="email" className="form-control" placeholder="E.I.D" required />
                        </div>
                        <div className="col-md-5">
                            <div className="input-group">
                                <input onChange={this.hasChanges.bind(this, 'prefix')} type="text" className="form-control" value="+63" style={{ maxWidth: "55px" }} />
                                <input onChange={this.hasChanges.bind(this, 'phoneno')} value={this.state.phoneno} type="text" className="form-control" placeholder="___-___-__" required />
                            </div>
                        </div>
                        <div className="col-md-4 mt-4">
                            <input onChange={this.hasChanges.bind(this, 'lname')} value={this.state.lname} type="text" className="form-control" placeholder="Last Name" required />
                        </div>
                        <div className="col-md-4 mt-4">
                            <input onChange={this.hasChanges.bind(this, 'fname')} value={this.state.fname} type="text" className="form-control" placeholder="First Name" required />
                        </div>
                        <div className="col-md-4 mt-4">
                            <input onChange={this.hasChanges.bind(this, 'mname')} value={this.state.mname} type="text" className="form-control" placeholder="Middle Name" required />
                        </div>
                        <div className="col-md-12 mt-4">
                            <input onChange={this.hasChanges.bind(this, 'addr1')} value={this.state.addr1} type="text" className="form-control" placeholder="Address Line 1" required />
                        </div>
                        <div className="col-md-12 mt-4">
                            <input onChange={this.hasChanges.bind(this, 'addr2')} value={this.state.addr2} type="text" className="form-control" placeholder="Address Line 2" />
                        </div>
                        <SubmitButton />
                    </div>
                </div>
                <UserList ref={this.elemRef} />
            </ToastProvider >
        )
    }
}