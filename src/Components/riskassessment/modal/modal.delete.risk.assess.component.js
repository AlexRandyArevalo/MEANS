import { Component } from "react";
import { Modal } from "react-bootstrap";
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { ClipLoader } from "react-spinners";
import axios from "axios";

export default class ModalDeleteRiskAssess extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showHide_delete: false,
            loader_del: {
                loading_del: false,
            },
            title: "",
            id: "",
        }
    }
    showModal_delete = (riskassess) => {
        console.log(riskassess)
        this.setState({
            showHide_delete: true,
            id: riskassess._id,
            title: riskassess.title,
        })
    }
    hideModal_delete = () => {
        this.setState({ showHide_delete: false })
    }
    render() {
        const ConfirmationButton = () => {
            const { addToast } = useToasts()
            const Delete = () => {
                this.setState({ loader_del: { loading_del: true } }) // Show Loader
                axios.delete(`/riskAssessment/${this.state.id}`)
                    .then((res) => {
                        if (res.data.status) {
                            this.props.loadupdates()
                            addToast(res.data.msg, {
                                appearance: 'success',
                                autoDismiss: true,
                            })
                            this.setState({ loader_del: { loading_del: false } }) // Hide Loader
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
                <button className="btn btn-outline-secondary me-2" onClick={this.hideModal_delete}>Cancel</button>
                <button className="btn btn-outline-danger" onClick={Delete}>
                    <ClipLoader color={'#dc3545'} loading={this.state.loader_del.loading_del} size={10} />
                    &nbsp; Delete &nbsp;
                </button>
            </div>)
        }
        return (
            <ToastProvider>
                <Modal show={this.state.showHide_delete} size="md">
                    <Modal.Body>
                        <div className="row p-4" style={{ textAlign: "center" }}>
                            <h4 className="text-dark pb-2">You are about to delete <span className="text-primary">{this.state.title}</span>.</h4>
                            <h6 className="text-muted">Do you want to proceed?</h6>
                        </div>
                        <ConfirmationButton />
                    </Modal.Body>
                </Modal>
            </ToastProvider>
        )
    }
}