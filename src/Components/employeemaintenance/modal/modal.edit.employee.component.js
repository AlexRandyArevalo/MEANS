import { Component } from "react";
import Modal from "react-bootstrap/Modal"

export default class EditEmployee extends Component {
    render() {
        return (<Modal show={this.props.show} size="lg">
            <Modal.Header>
                <Modal.Title>Edit Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.props.editform}
            </Modal.Body>
            {this.props.footer}
        </Modal>)
    }
}