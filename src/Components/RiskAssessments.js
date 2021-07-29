import React, { useState } from 'react'
import Header from './Header';
import Menubar from './Menubar';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert'
import Modal from "react-bootstrap/Modal";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSearch,
    faTrashAlt,
    faEdit
} from '@fortawesome/free-solid-svg-icons'
library.add(
    faSearch,
    faTrashAlt,
    faEdit
);

function RiskAssessments() {
    // Delete Employee
    const Delete = param => event => {
        console.log(param);
        Swal({
            title: "Delete [Employee]?",
            text: "You won't be able to revert this!",
            icon: "warning",
            buttons: [
                'Cancel',
                'Delete'
            ],
            dangerMode: true,
        }).then(function (isConfirm) {
            if (isConfirm) {
                Swal({
                    title: 'Deleted!',
                    text: '[Employee] has been deleted.',
                    icon: 'success'
                }).then(function () {
                    // form.submit(); // <--- submit form programmatically
                });
            } else {
                Swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
        })
    }

    // Edit Modal
    const [isOpen, setIsOpen] = useState(false);
    const showModal = () => {
        setIsOpen(true);
    };
    const hideModal = () => {
        setIsOpen(false);
    };

    // Add Employee
    const [title, setTitle] = useState('')
    const [loc, setLoc] = useState('')
    const [desc, setDesc] = useState('')
    const saveEmployee = (e) => {
        e.preventDefault();
        console.log(title, '\n' +
            loc, '\n' +
        desc);
    }

    // Static Data
    const DataTable = [
        {
            id: 1,
            title: "[Empty]",
            location: "[Empty]",
            description: "[Empty]"
        },
        {
            id: 2,
            title: "[Empty]",
            location: "[Empty]",
            description: "[Empty]"
        },
        {
            id: 3,
            title: "[Empty]",
            location: "[Empty]",
            description: "[Empty]"
        }
    ]

    return (<div>
        <Header />
        <div className="d-flex">
            <Menubar />
            <div className="means-body col-md-9 bg-light">
                <h4 className="ps-4 pt-4 pb-2 mean-title">Risk Assessments</h4>
                <hr />
                <div className="container">
                    <div className="col-md-12 d-flex pb-3 mt-4 risk-assess">
                        <div className="col align-self-center w-100">
                            <div className="form-group">
                                <div className="icon-addon addon-md">
                                    <input type="text" placeholder="Search" className="form-control w-50 search" />
                                    <label for="Search" className="glyphicon glyphicon-search" rel="tooltip" title="Search"><FontAwesomeIcon icon="search" /></label>
                                </div>
                            </div>
                        </div>
                        <div className="col" style={{ textAlign: "end" }}>
                            <Link type="button" className="btn_ btn-purple w-50" to="/addriskassessments">Add Risk Assessment</Link>
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="shadow-sm p-3 mb-5 bg-body rounded risk-assess">
                        <h5 className="pb-3">Risk Assessments</h5>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th width="5%">#</th>
                                    <th width="25%">Title</th>
                                    <th width="20%">Location</th>
                                    <th width="20%">Description</th>
                                    <th width="20%">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    DataTable.map(data =>
                                        <tr>
                                            <th scope="row">{data.id}</th>
                                            <td>{data.title}</td>
                                            <td>{data.location}</td>
                                            <td>{data.description}</td>
                                            <td>
                                                <a href="#" class="text-muted p-2 delete" onClick={(e) => Delete(1)(e)}><FontAwesomeIcon icon="trash-alt" /></a>
                                                <a href="#" class="text-muted p-2 edit" onClick={showModal}><FontAwesomeIcon icon="edit" /></a>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <Modal show={isOpen} onHide={hideModal} size="md">
                        <Modal.Header>
                            <Modal.Title>Edit Risk Assessment</Modal.Title>
                        </Modal.Header>
                        <form onSubmit={saveEmployee}>
                            <Modal.Body>

                                <div className="row m-3">
                                    <div className="col-md-12 mt-2 mb-2">
                                        <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" className="form-control" placeholder="Title" required />
                                    </div>
                                    <div className="col-md-12 mt-2 mb-2">
                                        <input onChange={(e) => setLoc(e.target.value)} value={loc} type="text" className="form-control" placeholder="Location" required />
                                    </div>
                                    <div className="col-md-12 mt-2 mb-2">
                                        <textarea onChange={(e) => setDesc(e.target.value)} value={desc} type="text" className="form-control" rows="3" placeholder="Description" required ></textarea>
                                    </div>
                                </div>

                            </Modal.Body>
                            <Modal.Footer>
                                <button className="btn btn-secondary" onClick={hideModal}>Cancel</button>
                                <button className="btn btn-success" type="submit" >&nbsp; Save &nbsp;</button>
                            </Modal.Footer>
                        </form>
                    </Modal>
                </div>
            </div>
        </div>
    </div>)


}

export default RiskAssessments;