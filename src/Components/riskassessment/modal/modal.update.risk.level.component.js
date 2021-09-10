import { Component } from "react";
import { Modal } from "react-bootstrap";
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { ClipLoader } from "react-spinners";
import axios from "axios";

export default class ModalUpdateRiskLevel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showHide_update: false,
            loader_update: {
                loading_update: false,
            },
            riskid: "",
            risklevelId: "",
        }
    }

    RL_Update_showModal = (data, riskid) => {
        this.setState({
            showHide_update: true,
            level: data.level,
            desc: data.description,
            riskid: riskid,
            risklevelId: data._id,
        })
    }

    RL_Update_hideModal = () => {
        this.setState({ showHide_update: false })
    }

    hasChanges = (datahere, e) => {
        this.setState({
            [datahere]: e.target.value
        })
    }

    Form = () => {
        return (
            <div className="row m-3">
                <div className="col-md-12">
                    <table>
                        <tr className="p-2">
                            <th width="150">Risk Level: </th>
                            <td>
                                <input onChange={this.hasChanges.bind(this, 'level')} value={this.state.level} type="text" className="form-control" disabled />
                            </td>
                        </tr>
                        <tr><td colSpan="2" height="10"></td></tr>
                        <tr className="p-2">
                            <th>Description: </th>
                            <td>
                                <input onChange={this.hasChanges.bind(this, 'desc')} value={this.state.desc} type="text" className="form-control" />
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }

    render() {
        const FooterButton_Update = () => {
            const { addToast } = useToasts()
            const OnSave = (e) => {
                this.setState({ loader_update: { loading_update: true } }) // Show Loader
                axios.patch(`/riskLevel/${this.state.risklevelId}`, { def: this.state.desc })
                    .then((res) => {
                        this.props.loadupdates(this.state.riskid)
                        this.RL_Update_hideModal()
                        this.setState({ loader_update: { loading_update: false } }) // Hide Loader
                        addToast(res.data.msg, {
                            appearance: 'success',
                            autoDismiss: true,
                        })
                    }, (err) => {
                        addToast(err.message, {
                            appearance: 'error',
                            autoDismiss: true,
                        })
                    });
            }
            return (
                <Modal.Footer>
                    <button className="btn btn-secondary me-2" onClick={this.RL_Update_hideModal}>Cancel</button>
                    <button onClick={OnSave} className="btn btn-success">
                        <ClipLoader color={'#fff'} loading={this.state.loader_update.loading_update} size={10} />
                        &nbsp; Save &nbsp;
                    </button>
                </Modal.Footer>
            )
        }
        return (
            <ToastProvider>
                <Modal show={this.state.showHide_update} size="md" className="mt-5">
                    <Modal.Header>
                        <Modal.Title>Update Risk Level</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.Form()}
                    </Modal.Body>
                    <FooterButton_Update />
                </Modal>
            </ToastProvider>
        )
    }
}