import { Component } from "react";
import { Modal } from "react-bootstrap";
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { ClipLoader } from "react-spinners";
import axios from "axios";

export default class ModalAddRiskLevel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showHide_Add: false,
            loader_add: {
                loading_add: false,
            },
            riskid: "",
        }
    }

    RL_Add_showModal = (id) => {
        this.setState({
            showHide_Add: true,
            riskid: id,
        })
    }

    RL_Add_hideModal = () => {
        this.setState({ showHide_Add: false })
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
                                <input onChange={this.hasChanges.bind(this, 'level')} value={this.state.level} type="text" placeholder="Enter risk level" className="form-control" />
                            </td>
                        </tr>
                        <tr><td colspan="2" height="10"></td></tr>
                        <tr className="p-2">
                            <th>Description: </th>
                            <td>
                                <input onChange={this.hasChanges.bind(this, 'desc')} value={this.state.desc} type="text" placeholder="Enter description" className="form-control" />
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
    render() {
        const FooterButton_Add = () => {
            const { addToast } = useToasts()
            const OnSave = (e) => {
                this.setState({ loader_add: { loading_add: true } }) // Show Loader
                let addedata = []
                addedata.push({
                    risklevel: this.state.level,
                    def: this.state.desc,
                })
                let risklevelData = {}
                let raID = this.state.riskid
                risklevelData[raID] = addedata
                axios.post('/saveRiskLevel', risklevelData)
                    .then((res) => {
                        this.setState({ loader_add: { loading_add: false } }) // Hide Loader
                        this.RL_Add_hideModal()
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
                    <button className="btn btn-secondary me-2" onClick={this.RL_Add_hideModal}>Cancel</button>
                    <button onClick={OnSave} className="btn btn-success">
                        <ClipLoader color={'#fff'} loading={this.state.loader_add.loading_add} size={10} />
                        &nbsp; Save &nbsp;
                    </button>
                </Modal.Footer>
            )
        }
        return (
            <ToastProvider>
                <Modal show={this.state.showHide_Add} size="md">
                    <Modal.Header>
                        <Modal.Title>Add Risk Level</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.Form()}
                    </Modal.Body>
                    <FooterButton_Add />
                </Modal>
            </ToastProvider>
        )
    }
}