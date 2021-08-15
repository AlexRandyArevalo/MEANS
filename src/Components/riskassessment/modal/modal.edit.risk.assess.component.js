import { Component } from "react";
import { Modal } from "react-bootstrap";

export default class ModalEditRiskAssess extends Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.hide} size="lg">
                <Modal.Header>
                    <Modal.Title>Edit Risk Assessmentx</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.form}
                </Modal.Body>
                {this.props.footer}
            </Modal>
        )
    }
}