import React, { useState } from 'react'
import Swal from 'sweetalert'
import Modal from "react-bootstrap/Modal"

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTrashAlt,
    faEdit
} from '@fortawesome/free-solid-svg-icons'
library.add(
    faTrashAlt,
    faEdit
);

function Table() {
    // Edit Modal
    const [isOpen, setIsOpen] = React.useState(false);
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
                                <a href="#" class="text-muted p-2 delete" onClick={(e) => Delete(data.id)(e)}><FontAwesomeIcon icon="trash-alt" /></a>
                                <a href="#" class="text-muted p-2 edit" onClick={showModal}><FontAwesomeIcon icon="edit" /></a>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
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
    </div >)
}

export default Table;