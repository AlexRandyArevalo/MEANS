import React, { Component } from 'react'
import { ClipLoader } from "react-spinners";
import axios from 'axios'
import Modal from "react-bootstrap/Modal"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import '../Components/employeemaintenance/responsive-style/style.css'
import UploadCsv from '../Components/employeemaintenance/csvupload/csv.component'
import EmployeeList from '../Components/employeemaintenance/table/table.component'
import { ToastProvider, useToasts } from 'react-toast-notifications'
import AddEmployee from '../Components/employeemaintenance/modal/modal.add.employee.component';

library.add(faUserPlus);

export default class EmployeeMaintenance extends Component {
    constructor(props) {
        super(props)
        this.elemRef = React.createRef([])
        this.state = {
            loading: false,
            isopen: false,
        }
    }

    // Show Modal
    showModal = () => {
        this.setState({ isopen: true })
    }

    // Hide Modal
    hideModal = () => {
        this.setState({ isopen: false })
    }

    // Handle Changes
    hasChanges = (datahere, e) => {
        this.setState({
            [datahere]: e.target.value
        })
    }

    getTemplate = () => {
        axios.get('/employees/excelFormat')
            .then((res) => {
                const url = window.URL.createObjectURL(new Blob([res.data], { type: 'text/csv; charset=utf-8' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'MEANS_EMPLOYEE_LIST_FORMAT.csv');
                document.body.appendChild(link);
                link.click();
            }, (err) => {

            });
    }

    Form = () => {
        return (<div className="row m-3">
            <div className="col-md-7 mb-2">
                <input onChange={this.hasChanges.bind(this, 'eid')} value={this.state.eid} name="eid" type="email" className="form-control" placeholder="E.I.D" required />
            </div>
            <div className="col-md-5">
                <div className="input-group mb-2">
                    <input onChange={this.hasChanges.bind(this, 'prefix')} value="+63" type="text" className="form-control" style={{ maxWidth: "55px" }} />
                    <input onChange={this.hasChanges.bind(this, 'phoneno')} value={this.state.phoneno} name="phoneno" type="text" className="form-control" placeholder="___-___-__" required />
                </div>
            </div>
            <div className="col-md-4 mt-4 mb-2">
                <input onChange={this.hasChanges.bind(this, 'lname')} value={this.state.lname} name="lname" type="text" className="form-control" placeholder="Last Name" required />
            </div>
            <div className="col-md-4 mt-4 mb-2">
                <input onChange={this.hasChanges.bind(this, 'fname')} value={this.state.fname} name="fname" type="text" className="form-control" placeholder="First Name" required />
            </div>
            <div className="col-md-4 mt-4 mb-2">
                <input onChange={this.hasChanges.bind(this, 'mname')} value={this.state.mname} name="mname" type="text" className="form-control" placeholder="Middle Name" required />
            </div>
            <div className="col-md-12 mt-4 mb-2">
                <input onChange={this.hasChanges.bind(this, 'addr')} value={this.state.addr} name="addr" type="text" className="form-control" placeholder="Address Line 1" required />
            </div>
        </div>)
    }

    refreshTable = () => {
        this.elemRef.current.setDataTable()
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
                // console.log(jsonData)
                axios.post('/saveEmployee', jsonData)
                    .then((res) => {
                        this.refreshTable()
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
                <div className="means-body col-md-10 bg-light">
                    <h4 className="ps-4 pt-4 pb-2 mean-title">Employee Maintenance</h4>
                    <hr />
                    <div className="container">
                        <div className="col-md-12 d-flex mt-4 emp-main">
                            <UploadCsv template={this.getTemplate} reloadtable={this.refreshTable} />
                            <div className="col-md-9 employee-list">
                                <div className="p-3 pt-1">
                                    <EmployeeList add_emp_modal={this.showModal} ref={this.elemRef} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AddEmployee
                    show={this.state.isopen}
                    hidemodal={this.hideModal}
                    saveemployee={this.saveEmployee}
                    form={this.Form()}
                    footer={<Footer />}
                />
            </ToastProvider>
        )

    }
}