import React, { Component } from 'react'
import { ClipLoader } from "react-spinners";
import axios from 'axios'
import Modal from "react-bootstrap/Modal"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import '../Components/employeemaintenance/responsive-style/style.css'
import Search from '../Components/searchbox/search.component'
import UploadCsv from '../Components/employeemaintenance/csvupload/csv.component'
import EmployeeList from '../Components/employeemaintenance/table/table.component'

library.add(faUserPlus);

export default class EmployeeMaintenance extends Component {
    state = {
        loading: false,
        isopen: false,
        eid: "",
        phoneno: "",
        lname: "",
        fname: "",
        mname: "",
        addr: "",
    }

    // Show Modal
    showModal = () => {
        this.setState({ isopen: true })
    }

    // Hide Modal
    hideModal = () => {
        this.setState({ isopen: false })
    }

    hasChanges = (datahere, e) => {
        this.setState({
            [datahere]: e.target.value
        })
    }

    // Save Individual Employee
    saveEmployee = (e) => {
        this.setState({ loading: true }) // Show loader
        e.preventDefault();
        let jsonData = {
            eid: this.state.eid,
            phoneno: this.state.phoneno,
            lname: this.state.lname,
            fname: this.state.fname,
            mname: this.state.mname,
            addr: this.state.addr
        }
        // // Temp
        axios.patch('/employee/610aa0fae5eb4d00154e9954', jsonData)
            .then((res) => {
                console.warn(res)
                const empClass = new EmployeeList()
                empClass.setDataTable()
                this.setState({loading:false}) // Hide loader
            }, (err) => {
                console.log(err);
            });

        // axios.post('/saveEmployee', jsonData)
        //     .then((res) => {
        //         const tableClass = new Table()
        //         tableClass.setDataTable()
        //         hideModal()
        //     }, (err) => {
        //         console.log(err);
        //     });
    }
    render() {
        return (<div className="means-body col-md-9 bg-light">
            <h4 className="ps-4 pt-4 pb-2 mean-title">Employee Maintenance</h4>
            <hr />
            <div className="container">
                <div className="col-md-12 d-flex mt-4 emp-main">
                    <UploadCsv />
                    <div className="col-md-9 employee-list">
                        <div className="p-3">
                            <div className="col-md-12 d-flex">
                                <div className="col align-self-center w-100">
                                    <Search />
                                </div>
                                <div className="col" style={{ textAlign: "end" }}>
                                    <button type="button" className="btn_ btn-purple w-25" onClick={this.showModal}><FontAwesomeIcon icon="user-plus" /> &nbsp;Add</button>
                                </div>
                            </div>

                            <div className="shadow-sm p-3 mb-5 bg-body rounded mt-3">
                                <h5 className="pb-3">Employee List</h5>
                                <EmployeeList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={this.state.isopen} onHide={this.hideModal} size="lg">
                <Modal.Header>
                    <Modal.Title>Add Employee</Modal.Title>
                </Modal.Header>
                <form onSubmit={this.saveEmployee}>
                    <Modal.Body>
                        <div className="row m-3">
                            <div className="col-md-7 mb-2">
                                <input onChange={this.hasChanges.bind(this, 'eid')} value={this.state.eid} name="eid" type="email" className="form-control" placeholder="E.I.D" /*required*/ />
                            </div>
                            <div className="col-md-5">
                                <div className="input-group mb-2">
                                    <input onChange={this.hasChanges.bind(this, 'prefix')} value="+63" type="text" className="form-control" style={{ maxWidth: "55px" }} />
                                    <input onChange={this.hasChanges.bind(this, 'phoneno')} value={this.state.phoneno} name="phoneno" type="text" className="form-control" placeholder="___-___-__" /*required*/ />
                                </div>
                            </div>
                            <div className="col-md-4 mt-4 mb-2">
                                <input onChange={this.hasChanges.bind(this, 'lname')} value={this.state.lname} name="lname" type="text" className="form-control" placeholder="Last Name" /*required*/ />
                            </div>
                            <div className="col-md-4 mt-4 mb-2">
                                <input onChange={this.hasChanges.bind(this, 'fname')} value={this.state.fname} name="fname" type="text" className="form-control" placeholder="First Name" /*required*/ />
                            </div>
                            <div className="col-md-4 mt-4 mb-2">
                                <input onChange={this.hasChanges.bind(this, 'mname')} value={this.state.mname} name="mname" type="text" className="form-control" placeholder="Middle Name" /*required*/ />
                            </div>
                            <div className="col-md-12 mt-4 mb-2">
                                <input onChange={this.hasChanges.bind(this, 'addr')} value={this.state.addr} name="addr" type="text" className="form-control" placeholder="Address Line 1" /*required*/ />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={this.hideModal}>Cancel</button>
                        <button className="btn btn-success" type="submit" >
                            <ClipLoader color={'#fff'} loading={this.state.loading} size={10} />
                            &nbsp; Save &nbsp;
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>)

    }
}