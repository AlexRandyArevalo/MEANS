import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

import '../Components/employeemaintenance/responsive-style/style.css'
import Search from '../Components/searchbox/search.component'
import UploadCsv from '../Components/employeemaintenance/csvupload/csv.component'
import Table from '../Components/employeemaintenance/table/table.component'
import AddEmployeeform from '../Components/employeemaintenance/addemployeeform/addemployee.form.component'

library.add(faUserPlus);

function EmployeeMaintenance() {
    // Modal
    const [isOpen, setIsOpen] = useState(false);
    const showModal = () => {
        setIsOpen(true);
    };
    const hideModal = () => {
        setIsOpen(false);
    };

    // Save Individual Employee
    const saveEmployee = (e) => {
        e.preventDefault();
        console.log(e.target.eid.value, '\n' +
            e.target.phoneno.value, '\n' +
        e.target.lname.value, '\n' +
        e.target.fname.value, '\n' +
        e.target.mname.value, '\n' +
        e.target.addr.value);
    }

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
                                <button type="button" className="btn_ btn-purple w-25" onClick={showModal}><FontAwesomeIcon icon="user-plus" /> &nbsp;Add</button>
                            </div>
                        </div>

                        <div className="shadow-sm p-3 mb-5 bg-body rounded mt-3">
                            <h5 className="pb-3">Employee List</h5>
                            <Table />
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
        <Modal show={isOpen} onHide={hideModal} size="lg">
            <Modal.Header>
                <Modal.Title>Add Employee</Modal.Title>
            </Modal.Header>
            <form onSubmit={saveEmployee}>
                <Modal.Body>
                    <AddEmployeeform />
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={hideModal}>Cancel</button>
                    <button className="btn btn-success" type="submit" >&nbsp; Save &nbsp;</button>
                </Modal.Footer>
            </form>
        </Modal>
    </div>)


}

export default EmployeeMaintenance;