import { Component } from "react";
import { Modal } from "react-bootstrap";
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { ClipLoader } from "react-spinners";
import axios from "axios";

export default class ModalDeleteUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            RA_isopen: false,
            loader: false,
            firstname: "",
            lastname: "",
        }
    }
    showModal_delete = (user) => {
        this.setState({
            showHide_delete: true,
            id: user._id,
            firstname: user.fName,
            lastname: user.lName,
        })
    }
    hideModal_delete = () => {
        this.setState({ showHide_delete: false })
    }
    render() {
        const ConfirmationButton = () => {
            const { addToast } = useToasts()
            const Delete = () => {
                this.setState({ loader: true })
                axios.delete(`/user/${this.state.id}`)
                    .then((res) => {
                        if (res.data.status) {
                            this.setState({ loader: false })
                            this.props.loadupdates()
                            addToast(res.data.msg, {
                                appearance: 'success',
                                autoDismiss: true,
                            })
                            this.hideModal_delete()
                        }
                    }, (err) => {
                        addToast(err.message, {
                            appearance: 'error',
                            autoDismiss: true,
                        })
                    });
            }
            return (<div className="p-2 mb-3 float-center" style={{ textAlign: "center" }}>
                <button className="btn btn-secondary me-2" onClick={this.hideModal_delete}>Cancel</button>
                <button className="btn btn-danger" onClick={Delete}>
                    <ClipLoader color={'#fff'} loading={this.state.loader} size={10} />
                    &nbsp; Delete &nbsp;
                </button>
            </div>)
        }
        return (
            <ToastProvider>
                <Modal show={this.state.showHide_delete} size="md" className="mt-5">
                    <Modal.Body>
                        <div className="row p-4" style={{ textAlign: "center" }}>
                            <h4 className="text-dark pb-2">You are about to delete <span className="text-primary">{this.state.lastname}, {this.state.firstname}</span>.</h4>
                            <h6 className="text-muted">Do you want to proceed?</h6>
                        </div>
                        <ConfirmationButton />
                    </Modal.Body>
                </Modal>
            </ToastProvider>
        )
    }
}