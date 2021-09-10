import { Component } from "react";
import { Modal } from "react-bootstrap";

export default class ModalRiskLevel extends Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.hide} size="lg">
                <Modal.Header>
                    <Modal.Title>Risk Level</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.displayrisklevel}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-outline-secondary" onClick={this.props.onclick}>Close</button>
                </Modal.Footer>
            </Modal>
        )
    }
}