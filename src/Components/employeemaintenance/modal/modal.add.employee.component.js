import { Component } from "react";
import Modal from "react-bootstrap/Modal"

export default class AddEmployee extends Component {
    render() {
        return (<Modal show={this.props.show} onHide={this.props.hidemodal} size="lg">
            <Modal.Header>
                <Modal.Title>Add Employee</Modal.Title>
            </Modal.Header>
            <form onSubmit={this.props.saveemployee}>
                <Modal.Body>
                    {this.props.form}
                </Modal.Body>
                {this.props.footer}                
            </form>
        </Modal>)
    }
}