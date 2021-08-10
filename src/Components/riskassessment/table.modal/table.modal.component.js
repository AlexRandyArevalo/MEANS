import React, { Component } from 'react'
import { Modal, OverlayTrigger, Popover } from "react-bootstrap"
import Table from '../../table.component/table.component'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { ClipLoader } from "react-spinners";

import {
    faChartBar,
    faEdit,
    faPlus
} from '@fortawesome/free-solid-svg-icons'
library.add(
    faChartBar,
    faEdit,
    faPlus
);

export default class RiskAssessmentsList extends Component {
    constructor(props) {
        super(props)
        this.elemRef = React.createRef([])
        this.elemRef.current = [];
        this.state = {
            color: "#9500f3",
            loader: {
                loading: false,
            },
            loader_edit: {
                loading_edit: false
            },
            riskassessList: [],
            risklevelList: [],
            RA_isopen: false,
            RL_isopen: false,
            isEditable: false,
            classToggle: 'bg-secondary',
            text: 'Update',
            editedData: []
        }
    }

    componentDidMount = (e) => {
        // this.props.addToast('Saved Successfully', { appearance: 'success', autoDismiss: true, });
        this.setState({ loader: { loading: true } }) // Show Loader
        this.getRiskAssessmentList()
        this.getRiskLevel()
    }

    // Get Risk Assessment List
    getRiskAssessmentList() {
        axios.get('/riskAssessments/')
            .then((res) => {
                if (res.data.status) {
                    this.setState({ riskassessList: res.data.data })
                    this.setState({ loader: { loading: false } }) // Hide Loader 
                } else {
                    console.log('unable to retrieve data -> [Risk Assessments]')
                }
            }, (err) => {
                console.log(err);
            });
    }

    // Handle Changes
    RiskLevel_hasChanges = (datahere, e) => {
        this.setState({
            [datahere]: e.target.innerText
        })
    }

    // Handle Changes
    hasChanges = (datahere, e) => {
        this.setState({
            [datahere]: e.target.value
        })
    }

    // Risk Assessment Modal
    RA_showModal = () => {
        this.setState({ RA_isopen: true })
    };
    RA_hideModal = () => {
        this.setState({ RA_isopen: false })
    };

    // Risk Level Modal
    RL_showModal = () => {
        this.setState({ RL_isopen: true })
    };
    RL_hideModal = () => {
        this.setState({ RL_isopen: false })
    };

    addToRef = (elem) => {
        if (elem && !this.elemRef.current.includes(elem)) {
            this.elemRef.current.push(elem)
            if (elem.classList.contains('autoFocus'))
                elem.focus()
        }
    }

    // Editable Content
    UpdateRiskLevel = (data) => {
        if (!this.state.isEditable) {
            let i = 0;
            this.elemRef.current.map(el => {
                if (el.classList.contains(data._id)) {
                    i += 1;
                    if (el.nodeName.indexOf('SPAN') == -1) {
                        el.contentEditable = true
                    } else {
                        el.innerText = 'Save'
                        el.classList.remove('bg-secondary')
                        el.classList.add('bg-success')
                    }
                    if (i <= 1)
                        el.focus()
                }
            })
            this.setState({ isEditable: true })
        } else {
            const jsonData = {
                def: this.state.description ? this.state.description : data.description
            }
            // console.log(this.state.desc, data.description)
            axios.patch(`/riskLevel/${data._id}`, jsonData)
                .then((res) => {
                    console.log(res.data)
                    if (res.data.status) {
                        this.elemRef.current.map(el => {
                            if (el.classList.contains(data._id)) {
                                el.contentEditable = false
                                if (el.nodeName.indexOf('SPAN') != -1) {
                                    el.innerText = 'Update'
                                    el.classList.remove('bg-success')
                                    el.classList.add('bg-secondary')
                                }
                            }
                        })
                        this.setState({ isEditable: false })
                    } else {
                        console.error('unable to update -> [Risk Level]')
                    }
                }, (err) => {
                    console.log(err);
                });
        }
    }

    // Display List of Risk Assessment
    RiskAssessmentsTable = () => {
        if (!this.state.riskassessList) return null
        return (
            <Table
                Header={
                    <tr>
                        <th width="5%">#</th>
                        <th width="15%">Title</th>
                        <th width="15%">Address</th>
                        <th width="15%">City</th>
                        <th width="15%">Region</th>
                        <th width="15%">Description</th>
                        <th width="5%"></th>
                    </tr>
                }
                Loader={
                    <div className="sweet-loading pt-2 ps-1">
                        <ClipLoader color={this.state.color} loading={this.state.loader.loading} size={24} />
                    </div>
                }
                Body={
                    this.state.riskassessList.map((riskassess, key) =>
                    (<tr key={key}>
                        <th>{key + 1}</th>
                        <td className="text-truncate td-mw-12 text-muted" title={riskassess.title}>{riskassess.title}</td>
                        <td className="text-truncate td-mw-12 text-muted" title={riskassess.address}>{riskassess.address}</td>
                        <td className="text-truncate td-mw-12 text-muted" title={riskassess.city}>{riskassess.city}</td>
                        <td className="text-truncate td-mw-12 text-muted" title={riskassess.region}>{riskassess.region}</td>
                        <td className="text-truncate td-mw-12 text-muted" title={riskassess.description}>{riskassess.description}</td>
                        <td>
                            <OverlayTrigger
                                trigger={'click'}
                                rootClose={true}
                                key={'top'}
                                placement={'top'}
                                overlay={
                                    <Popover>
                                        <Popover.Content>
                                            <a href="#" className="p-2 text-dark" onClick={() => this.getRiskLevel(riskassess._id)} title="Risk Levels"><FontAwesomeIcon icon="chart-bar" /></a>
                                            <a href="#" className="p-2 text-dark" onClick={() => this.Edit(riskassess._id)} title="Edit"><FontAwesomeIcon icon="edit" /></a>
                                        </Popover.Content>
                                    </Popover>
                                }>
                                <a href="#" className="text-muted p-2 ellipsis" id={`Popover${key + 1}`}><FontAwesomeIcon icon="ellipsis-h" /></a>
                            </OverlayTrigger>
                        </td>
                    </tr>)
                    )
                } />
        )
    }

    getRiskLevel = (id) => {
        if (!!id) {
            axios.get(`/riskLevels/${id}`)
                .then((res) => {
                    if (res.data.status) {
                        console.log(res.data.data)
                        this.setState({ risklevelList: res.data.data })
                        this.RL_showModal()
                    } else {
                        console.log('unable to retrieve data [Risk Levels]')
                    }
                }, (err) => {
                    console.error(err);
                });
        } else {
            console.error('Empty -> [Risk Assessment ID]')
        }
    }

    // Add Row -> Risk Level
    AddRow = () => {
        let Row = {
            _id: "",
            riskId: this.state.risklevelList[0].riskId,
            level: "",
            description: "",
        }
        this.state.risklevelList.push(Row)
    }

    // Save Risk Level
    SaveRiskLevel = (data) => {
        let addedata = []
        addedata.push({
            risklevel: this.state.level,
            def: this.state.description,
        })
        let risklevelData = {}
        let raID = data.riskId
        risklevelData[raID] = addedata
        console.log(risklevelData)
        axios.post('/saveRiskLevel', risklevelData)
            .then((res) => {
                console.log(res)
                this.elemRef.current.map(el => {
                    el.contentEditable = false
                    if (el.nodeName.indexOf('SPAN') != -1) {
                        el.innerText = 'Update'
                        el.classList.remove('bg-success')
                        el.classList.add('bg-secondary')
                    }
                })
            }, (err) => {
                console.log(err);
            });
    }

    // Show Risk Level
    DisplayRiskLevel = () => {
        if (!this.state.risklevelList) return null
        return (
            <div className="border rounded p-2">
                <Table
                    Header={
                        <tr style={{ backgroundColor: "#e6e6e673" }}>
                            <th width="5%">#</th>
                            <th width="25%">Risk Level</th>
                            <th width="65%">Definition</th>
                            <th width="5%">
                                <a onClick={this.AddRow} title="Add Risk Level" href="#" className="text-success ps-4" type="button"><FontAwesomeIcon icon="plus" /></a>
                            </th>
                        </tr>
                    }
                    Body={
                        this.state.risklevelList.map((data, key) =>
                        (<tr key={key}>
                            <th className="text-muted">{key + 1}</th>
                            {
                                data._id
                                    ?
                                    <td
                                        className="text-muted ">
                                        {data.level}
                                    </td>
                                    :
                                    <td
                                        onInput={this.RiskLevel_hasChanges.bind(this, 'level')}
                                        className={"text-muted autoFocus"}
                                        ref={this.addToRef}
                                        contentEditable="true">
                                        {data.level}
                                    </td>
                            }
                            <td
                                onInput={this.RiskLevel_hasChanges.bind(this, 'description')}
                                className={"text-muted " + data._id}
                                ref={this.addToRef}
                                contentEditable={data._id ? "false" : "true"}>
                                {data.description}
                            </td>
                            <td className={data._id}>
                                {
                                    data._id
                                        ?
                                        <span
                                            onClick={() => this.UpdateRiskLevel(data)}
                                            ref={this.addToRef}
                                            style={{ float: "right" }}
                                            role="button"
                                            className={"badge rounded-pill bg-secondary " + data._id}>
                                            Update
                                        </span>
                                        :
                                        <span
                                            onClick={() => this.SaveRiskLevel(data)}
                                            ref={this.addToRef}
                                            style={{ float: "right" }}
                                            role="button"
                                            className={"badge rounded-pill bg-success " + data._id}>
                                            Save
                                        </span>
                                }
                            </td>
                        </tr>)
                        )
                    }
                />
            </div>
        )
    }

    // Edit User
    Edit = (id) => {
        axios.get(`/riskAssessment/${id}`)
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        id: res.data.data._id,
                        title: res.data.data.title,
                        address: res.data.data.address,
                        city: res.data.data.city,
                        region: res.data.data.region,
                        description: res.data.data.description
                    })
                    this.RA_showModal()
                } else {
                    console.error('User not found')
                }
            })
            .catch(err => console.error(err))
    }

    updateRiskAssessment = (e) => {
        e.preventDefault()
        let id = e.target.id.value
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
                        this.getRiskAssessmentList()
                        this.RA_hideModal()
                    } else {
                        console.error('User not found')
                    }
                })
                .catch(err => console.error(err))
        } else {
            console.log('Empty -> [Risk Assessment ID]')
        }
    }

    render() {

        // this.Toasts()
        return (<div>
            {/* Risk Level List */}
            {this.RiskAssessmentsTable()}
            {/* Edit Risk Assessment */}
            <Modal show={this.state.RA_isopen} onHide={this.RA_hideModal} size="lg">
                <Modal.Header>
                    <Modal.Title>Edit Risk Assessment</Modal.Title>
                </Modal.Header>
                <form onSubmit={this.updateRiskAssessment}>
                    <Modal.Body>
                        <div className="row m-3">
                            <div className="col-md-6">
                                <label className="text-muted ps-1 fs-13">Title</label>
                                <input onChange={this.hasChanges.bind(this, 'title')} value={this.state.title} type="text" className="form-control" required />
                            </div>
                            <div className="col-md-6">
                                <label className="text-muted ps-1 fs-13">Address</label>
                                <input onChange={this.hasChanges.bind(this, 'address')} value={this.state.address} type="text" className="form-control" required />
                            </div>
                            <div className="col-md-6 mt-4">
                                <label className="text-muted ps-1 fs-13">City</label>
                                <input onChange={this.hasChanges.bind(this, 'city')} value={this.state.city} type="text" className="form-control" required />
                            </div>
                            <div className="col-md-6 mt-4">
                                <label className="text-muted ps-1 fs-13">Region</label>
                                <input onChange={this.hasChanges.bind(this, 'region')} value={this.state.region} type="text" className="form-control" required />
                            </div>
                            <div className="col-md-12 mt-4">
                                <label className="text-muted ps-1 fs-13">Description</label>
                                <textarea onChange={this.hasChanges.bind(this, 'description')} value={this.state.description} type="text" className="form-control" required ></textarea>
                            </div>
                            <input name="id" value={this.state.id} type="hidden" />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={this.RA_hideModal}>Cancel</button>
                        <button className="btn btn-success" type="submit">
                            <ClipLoader color={'#fff'} loading={this.state.loader_edit.loading_edit} size={10} />
                            &nbsp; Save &nbsp;
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>

            {/* Risk Level */}
            <Modal show={this.state.RL_isopen} onHide={this.RL_hideModal} size="lg">
                <Modal.Header>
                    <Modal.Title>Risk Level</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.DisplayRiskLevel()}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-outline-secondary" onClick={this.RL_hideModal}>Close</button>
                </Modal.Footer>
            </Modal>

        </div >)
    }
}
