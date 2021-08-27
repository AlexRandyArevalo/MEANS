import { Component } from "react";
import { Modal } from "react-bootstrap";
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { ClipLoader } from "react-spinners";
import axios from "axios";

export default class ModalEditRiskAssess extends Component {
    constructor(props) {
        super(props)
        this.state = {
            RA_isopen: false,
            loader_edit: {
                loading_edit: false,
            },
        }
    }
    RA_showModal = (id) => {
        this.prepData(id)
    }
    RA_hideModal = () => {
        this.setState({ RA_isopen: false })
    }
    hasChanges = (datahere, e) => {
        this.setState({
            [datahere]: e.target.value
        })
    }
    prepData = (risk) => {
        this.setState({
            RA_isopen: true,
            id: risk._id,
            title: risk.title,
            address: risk.address,
            city: risk.city,
            region: risk.region,
            description: risk.description
        })
    }
    Form = () => {
        return (
            <div className="row m-3">
                <div className="col-md-6">
                    <label className="pb-1 fw-bold fs-13 ps-1">Title</label>
                    <input onChange={this.hasChanges.bind(this, 'title')} value={this.state.title} type="text" className="form-control" required />
                </div>
                <div className="col-md-6">
                    <label className="pb-1 fw-bold fs-13 ps-1">Address</label>
                    <input onChange={this.hasChanges.bind(this, 'address')} value={this.state.address} type="text" className="form-control" required />
                </div>
                <div className="col-md-6 mt-4">
                    <label className="pb-1 fw-bold fs-13 ps-1">City</label>
                    <input onChange={this.hasChanges.bind(this, 'city')} value={this.state.city} type="text" className="form-control" required />
                </div>
                <div className="col-md-6 mt-4">
                    <label className="pb-1 fw-bold fs-13 ps-1">Region</label>
                    <input onChange={this.hasChanges.bind(this, 'region')} value={this.state.region} type="text" className="form-control" required />
                </div>
                <div className="col-md-12 mt-4">
                    <label className="pb-1 fw-bold fs-13 ps-1">Description</label>
                    <textarea onChange={this.hasChanges.bind(this, 'description')} value={this.state.description} type="text" className="form-control" required ></textarea>
                </div>
                <input id="_riskid" name="id" value={this.state.id} type="hidden" />
            </div>
        )
    }
    render() {
        const FooterButton = () => {
            const { addToast } = useToasts()
            const UpdateRiskAssessment = (e) => {
                e.preventDefault()
                let id = document.getElementById('_riskid').value
                if (id) {
                    this.setState({ loader_edit: { loading_edit: true } }) // Show Loader
                    const jsonData = {
                        title: this.state.title,
                        address: this.state.address,
                        city: this.state.city,
                        region: this.state.region,
                        desc: this.state.description
                    }
                    axios.patch(`/riskAssessment/${id}`, jsonData)
                        .then(res => {
                            if (res.data.status) {
                                this.setState({ loader_edit: { loading_edit: false } }) // Hide Loader
                                this.props.loadupdates()
                                this.RA_hideModal()
                                addToast(res.data.msg, {
                                    appearance: 'success',
                                    autoDismiss: true,
                                })
                            }
                        })
                        .catch(err => {
                            addToast(err.message, {
                                appearance: 'error',
                                autoDismiss: true,
                            })
                        })

                } else {
                    addToast('Empty -> [Risk Assessment ID]', {
                        appearance: 'error',
                        autoDismiss: true,
                    })
                }
            }
            return (
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={this.RA_hideModal}>Cancel</button>
                    <button className="btn btn-success" onClick={UpdateRiskAssessment}>
                        <ClipLoader color={'#fff'} loading={this.state.loader_edit.loading_edit} size={10} />
                        &nbsp; Save &nbsp;
                    </button>
                </Modal.Footer>
            )
        }
        return (
            <ToastProvider>
                <Modal show={this.state.RA_isopen} onHide={this.RA_hideModal} size="lg" className="mt-5">
                    <Modal.Header>
                        <Modal.Title>Edit Risk Assessment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.Form()}
                    </Modal.Body>
                    <FooterButton />
                </Modal>
            </ToastProvider>
        )
    }
}