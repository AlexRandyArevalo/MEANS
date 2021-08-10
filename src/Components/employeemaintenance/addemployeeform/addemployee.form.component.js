import { Component } from "react";
import { ClipLoader } from "react-spinners";
import Modal from "react-bootstrap/Modal"

export default class AddEmployeeform extends Component {
    
    render() {
        return (<Modal show={this.state.isopen} onHide={this.hideModal} size="lg">
            <Modal.Header>
                <Modal.Title>Add Employee</Modal.Title>
            </Modal.Header>
            <form onSubmit={this.saveEmployee}>
                <Modal.Body>
                    <div className="row m-3">
                        <div className="col-md-7 mb-2">
                            <input onChange={this.handleText.bind(this, 'eid')} value={this.state.eid} name="eid" type="email" className="form-control" placeholder="E.I.D" />
                        </div>
                        <div className="col-md-5">
                            <div className="input-group mb-2">
                                <input onChange={this.handleText.bind(this, 'prefix')} value="+63" type="text" className="form-control" style={{ maxWidth: "55px" }} />
                                <input onChange={this.handleText.bind(this, 'phoneno')} value={this.state.phoneno} name="phoneno" type="text" className="form-control" placeholder="___-___-__" />
                            </div>
                        </div>
                        <div className="col-md-4 mt-4 mb-2">
                            <input onChange={this.handleText.bind(this, 'lname')} value={this.state.lname} name="lname" type="text" className="form-control" placeholder="Last Name" />
                        </div>
                        <div className="col-md-4 mt-4 mb-2">
                            <input onChange={this.handleText.bind(this, 'fname')} value={this.state.fname} name="fname" type="text" className="form-control" placeholder="First Name" />
                        </div>
                        <div className="col-md-4 mt-4 mb-2">
                            <input onChange={this.handleText.bind(this, 'mname')} value={this.state.mname} name="mname" type="text" className="form-control" placeholder="Middle Name" />
                        </div>
                        <div className="col-md-12 mt-4 mb-2">
                            <input onChange={this.handleText.bind(this, 'addr')} value={this.state.addr} name="addr" type="text" className="form-control" placeholder="Address Line 1" />
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
        </Modal>)
    }
}
