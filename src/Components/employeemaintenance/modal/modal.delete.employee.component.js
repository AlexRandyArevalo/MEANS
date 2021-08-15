import { Component } from "react";
import Modal from "react-bootstrap/Modal"

export default class DeleteEmployee extends Component {
    render() {
        return (<Modal show={this.props.show} size="md">
        <Modal.Body>
            <div className="row p-4" style={{ textAlign: "center" }}>
                <h4 className="text-dark pb-2">You are about to delete <span className="text-primary">{this.props.lastname}, {this.props.firstname}</span>.</h4>
                <h6 className="text-muted">Do you want to proceed?</h6>
            </div>
            {this.props.confirmation}
        </Modal.Body>
    </Modal>)
    }
}