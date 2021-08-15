import { Component } from "react";
import { Modal } from "react-bootstrap"

export default class ModalEditUser extends Component {
    render() {
        return (<div>
            {/* Edit User Modal */}
            < Modal show={this.props.show} size="lg" >
                <Modal.Header>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.props.body
                    }
                </Modal.Body>
                {
                    this.props.footer
                }
            </Modal >
        </div>)
    }
}