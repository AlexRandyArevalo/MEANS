import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import Header from './Header';
import Menubar from './Menubar';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import CSVReader from 'react-csv-reader'

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

    // Individual Employee Data
    const [eid, setEid] = useState('')
    const [phoneno, setPhoneno] = useState('')
    const [lname, setLname] = useState('')
    const [fname, setFname] = useState('')
    const [mname, setMname] = useState('')
    const [addr, setAddr1] = useState('')

    // Save Individual Employee
    const saveEmployee = (e) => {
        e.preventDefault();
        console.log(eid, '\n' +
            phoneno, '\n' +
        lname, '\n' +
        fname, '\n' +
        mname, '\n' +
        addr);
    }

    // Upload Multiple Employees    
    const parseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header =>
            header
                .toLowerCase()
                .replace(/\W/g, '_')
    }

    // Handle CSV Data On Upload
    const [csvData, setCsvData] = useState([]);
    const handleData = (data, info) => {
        setCsvData(data)
    }
    const onError = (err) => {
        console.log(err)
    }

    // Save CSV Data to DB
    const SaveToDB = () => {
        console.log(csvData)
    }

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
                <h4 className="ps-4 pt-4 pb-2 mean-title">Employee Maintenance</h4>
                <hr />
                <div className="container">
                    <div className="col-md-12 d-flex mt-4 emp-main">
                        <div className="col-md-3 upload-employees">
                            <div className="shadow-sm p-4 mb-5 bg-body rounded h-75">
                                <CSVReader
                                    className=""
                                    cssClassName="csv-reader-input form-control"
                                    label="File Upload"
                                    cssLabelClass="fs-5 pb-3"
                                    onFileLoaded={handleData}
                                    onError={onError}
                                    parserOptions={parseOptions}
                                    inputId="Alex"
                                    inputName="Arev"
                                    inputStyle={{
                                        color: '#444',
                                        border: "solid 1px #ccc",
                                        borderRadius: "4px",
                                        lineHeight: "29px",
                                        width: "100%"
                                    }}
                                />
                                <br />
                                <br />
                                <button type="button" className="btn_ btn-purple w-100" onClick={SaveToDB}>Submit</button>
                            </div>
                        </div>
                        <div className="col-md-9 employee-list">
                            <div className="p-3">
                                <div className="col-md-12 d-flex">
                                    <div className="col align-self-center w-100">
                                        <div className="form-group">
                                            <div className="icon-addon addon-md">
                                                <input type="text" placeholder="Search" className="form-control w-50 search" />
                                                <label htmlFor="Search" className="glyphicon glyphicon-search" rel="tooltip" title="Search"><FontAwesomeIcon icon="search" /></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col" style={{ textAlign: "end" }}>
                                        <button type="button" className="btn_ btn-purple w-25" onClick={showModal}><FontAwesomeIcon icon="user-plus" /> &nbsp;Add</button>
                                    </div>
                                </div>

                                {/* TABLE */}
                                <div className="shadow-sm p-3 mb-5 bg-body rounded mt-3">
                                    <h5 className="pb-3">Employee List</h5>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th width="5%">#</th>
                                                <th width="25%">Empty</th>
                                                <th width="20%">Empty</th>
                                                <th width="20%">Empty</th>
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
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
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

                            <div className="row m-3">
                                <div className="col-md-7 mb-2">
                                    <input onChange={(e) => setEid(e.target.value)} value={eid} type="email" className="form-control" placeholder="E.I.D" required />
                                </div>
                                <div className="col-md-5">
                                    <div className="input-group mb-2">
                                        <input type="text" className="form-control" value="+63" style={{ maxWidth: "55px" }} />
                                        <input onChange={(e) => setPhoneno(e.target.value)} value={phoneno} type="text" className="form-control" placeholder="___-___-__" required />
                                    </div>
                                </div>
                                <div className="col-md-4 mt-4 mb-2">
                                    <input onChange={(e) => setLname(e.target.value)} value={lname} type="text" className="form-control" placeholder="Last Name" required />
                                </div>
                                <div className="col-md-4 mt-4 mb-2">
                                    <input onChange={(e) => setFname(e.target.value)} value={fname} type="text" className="form-control" placeholder="First Name" required />
                                </div>
                                <div className="col-md-4 mt-4 mb-2">
                                    <input onChange={(e) => setMname(e.target.value)} value={mname} type="text" className="form-control" placeholder="Middle Name" required />
                                </div>
                                <div className="col-md-12 mt-4 mb-2">
                                    <input onChange={(e) => setAddr1(e.target.value)} value={addr} type="text" className="form-control" placeholder="Address Line 1" required />
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
    </div>)


}

export default EmployeeMaintenance;