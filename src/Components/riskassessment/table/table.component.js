import React, { Component } from 'react'
import Tippy from '@tippyjs/react';
import "tippy.js/dist/tippy.css";
import 'tippy.js/animations/scale.css';
import Table from '../../table.component/table.component'
import axios from 'axios'
import { ClipLoader, BeatLoader } from "react-spinners";
import { Link } from 'react-router-dom'
import Search from '../../searchbox/search.component'
import ModalEditRiskAssess from '../modal/modal.edit.risk.assess.component'
import ModalDeleteRiskAssess from '../modal/modal.delete.risk.assess.component'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPaperPlane,
    faTrashAlt,
    faChartBar,
    faEdit,
    faPlus
} from '@fortawesome/free-solid-svg-icons'
import ModalUpdateRiskLevel from '../modal/modal.update.risk.level.component';
import ModalAddRiskLevel from '../modal/modal.add.risk.level.component';
import MassSms from '../mass.sms/mass.sms.lib';
import reactDom from 'react-dom';

library.add(
    faPaperPlane,
    faTrashAlt,
    faChartBar,
    faEdit,
    faPlus
);

export default class RiskAssessmentsList extends Component {
    constructor(props) {
        super(props)
        this.addmodal = React.createRef([])
        this.updatemodal = React.createRef([])
        this.deletemodal = React.createRef([])
        this.editmodal = React.createRef([])
        this.massSms = React.createRef([])
        this.state = {
            ishidden: true,
            color_red: "#dc3545",
            loader: {
                loading: false,
            },
            loader_risklevel: {
                loading_rl: false,
            },
            riskassessList: [],
            risklevelList: [],
            RA_isopen: false,
            risk_title: "",
            riskid: "",
        }
        this.getRiskAssessmentList = this.getRiskAssessmentList.bind(this)
    }

    componentDidMount = () => {
        this.setState({ loader: { loading: true } }) // Show Loader
        this.getRiskAssessmentList()
    }

    // Get Risk Assessment List
    getRiskAssessmentList() {
        axios.get('/riskAssessments/')
            .then((res) => {
                this.setState({
                    riskassessList: res.data.data,
                    loader: {
                        loading: false
                    }
                })
            }, (err) => {
                console.log(err);
            });
    }

    // Display List of Risk Assessment
    RiskAssessmentsTable = () => {
        if (!this.state.riskassessList) return null
        return (
            <Table
                class={'table table-hover'}
                Header={
                    <tr>
                        <th width="5%">#</th>
                        <th width="15%">Title</th>
                        <th width="15%">Address</th>
                        <th width="15%">City</th>
                        <th width="15%">Region</th>
                        <th width="15%">Description</th>
                        <th width="10%">Mass sms</th>
                        <th width="5%"></th>
                    </tr>
                }
                Loader={
                    <tr>
                        <td className="sweet-loading pt-2 ps-1" style={{ borderBottom: "none", padding: "0px" }}>
                            <ClipLoader color={this.state.color_red} loading={this.state.loader.loading} size={24} />
                        </td>
                    </tr>
                }
                Body={
                    this.state.riskassessList.map((riskassess, key) =>
                    (<tr className={'rows ' + riskassess._id} role="button" key={key}>
                        <th onClick={() => this.getRiskLevel(riskassess)}>{key + 1}.</th>
                        <td onClick={() => this.getRiskLevel(riskassess)} className="text-truncate td-mw-12 text-muted" title={riskassess.title}>{riskassess.title}</td>
                        <td onClick={() => this.getRiskLevel(riskassess)} className="text-truncate td-mw-12 text-muted" title={riskassess.address}>{riskassess.address}</td>
                        <td onClick={() => this.getRiskLevel(riskassess)} className="text-truncate td-mw-12 text-muted" title={riskassess.city}>{riskassess.city}</td>
                        <td onClick={() => this.getRiskLevel(riskassess)} className="text-truncate td-mw-12 text-muted" title={riskassess.region}>{riskassess.region}</td>
                        <td onClick={() => this.getRiskLevel(riskassess)} className="text-truncate td-mw-12 text-muted" title={riskassess.description}>{riskassess.description}</td>
                        <td><MassSms ref={this.massSms} riskdata={riskassess} /></td>
                        <td>
                            <Tippy
                                offset={[0, -3]}
                                interactive={true}
                                animation="scale"
                                placement="top"
                                trigger="click"
                                content={
                                    <div className="pt-2 pb-2">
                                        <a href="#" className="text-white p-2" onClick={() => this.deletemodal.current.showModal_delete(riskassess)} title="Delete"><FontAwesomeIcon icon="trash-alt" /></a>
                                        <a href="#" className="text-white p-2" onClick={() => this.Edit(riskassess)} title="Edit"><FontAwesomeIcon icon="edit" /></a>
                                    </div>
                                }
                            >
                                <a href="#" className="text-muted p-2" id={`Popover${key + 1}`}><FontAwesomeIcon icon="ellipsis-h" /></a>
                            </Tippy>
                        </td>
                    </tr>)
                    )
                } />
        )
    }

    getRiskLevel = (data) => {
        if (!!data._id) {
            let toggle = (this.state.ishidden) ? true : false;
            this.setState({
                loader_risklevel: {
                    loading_rl: toggle,
                },
                risk_title: data.title,
                ishidden: false,
                riskid: data._id,
            })
            this.HighLight_Row(data)
            this.updateRiskLevelData(data._id)
        }
    }

    updateRiskLevelData = (id) => {
        axios.get(`/riskLevels/${id}`)
            .then((res) => {
                this.setState({
                    risklevelList: res.data.data,
                    // ishidden: false,
                    loader_risklevel: {
                        loading_rl: false,
                    }
                })
                this.DisplayRiskLevel()
            }, (err) => {
                console.error(err);
            });

    }

    HighLight_Row = (data) => {
        let rows = document.getElementsByClassName('rows');
        let row = document.getElementsByClassName(data._id)[0];
        for (let index = 0; index < rows.length; index++) {
            const element = rows[index];
            element.classList.remove('table-active')
        }
        row.classList.add('table-active')
    }

    // Show Risk Level
    DisplayRiskLevel = () => {
        let colors = ["primary", "secondary", "success", "danger", "info"];
        // colors = colors.sort(() => Math.random() - 0.5)

        const risklevelContainer = document.getElementById('risk-level');
        reactDom.render(
            <div>
                <div className="p-4 border rounded m-3 mt-0">
                    <div className="d-flex">
                        <div className="col pt-2">
                            <h5 className="text-dark">Risk Assessment Level</h5>
                        </div>
                        <div className="col text-end">
                            <button onClick={() => this.addmodal.current.RL_Add_showModal(this.state.riskid)} className="btn btn-outline-primary fs-13" ><FontAwesomeIcon icon="plus" /> Add</button>
                        </div>
                    </div>
                    <hr />
                    {
                        this.state.risklevelList.map((data, key) =>
                            <div className={"mt-4 bg-white alert alert-danger"} key={key} role="alert">
                                {/* <div className={"mt-4 bg-white alert alert-" + colors[key]} key={key} role="alert"> */}
                                <div className="d-flex w-100 justify-content-between pb-2">
                                    <h5 className="mb-1 text-capitalize">{this.state.risk_title}</h5>
                                    <small>
                                        <span
                                            onClick={() => this.updatemodal.current.RL_Update_showModal(data, this.state.riskid)}
                                            // ref={this.addToRef}
                                            style={{ float: "right" }}
                                            role="button"
                                            className={"badge rounded-pill bg-danger " + data._id}>
                                            {/* className={"badge rounded-pill bg-" + colors[key] + " " + data._id}> */}
                                            Update
                                        </span>
                                    </small>
                                </div>
                                <table>
                                    <tr>
                                        <td width="150">Risk Level :</td>
                                        <td>{data.level}</td>
                                    </tr>
                                    <tr>
                                        <td width="150">Description :</td>
                                        <td><small className="text-capitalize">{data.description}</small></td>
                                    </tr>
                                </table>
                            </div>
                        )
                    }
                </div>
            </div>
            , risklevelContainer);

    }

    Edit = (riskassess) => {
        this.editmodal.current.RA_showModal(riskassess)
    }

    // Search Function -> Get Data
    GetSearchItems = () => {
        let items = [];
        if (this.state.riskassessList) {
            this.state.riskassessList.map(riskassess => {
                items.push({
                    _id: riskassess._id,
                    name: riskassess.title,
                    title: riskassess.title,
                    city: riskassess.city,
                    address: riskassess.address,
                    region: riskassess.region,
                    description: riskassess.description,
                })
            })
        }
        return items;
    }
    // Search Function -> On Select
    OnSelect = (item) => {
        this.setState({ riskassessList: [item] })
    };
    // Search Function -> On Clear
    OnClear = () => {
        this.getRiskAssessmentList()
    };

    render() {
        return (<div>
            <div className="col-md-12 d-flex pb-3 mt-4 risk-assess">
                <div className="col align-self-center w-100">
                    <Search
                        items={this.GetSearchItems()}
                        onselect={this.OnSelect}
                        onclear={this.OnClear}
                    // fuseoptions={{ keys: ["name", "title", "address", "city", "region"] }}
                    />
                </div>
                <div className="col" style={{ textAlign: "end" }}>
                    <Link type="button" className="btn_ btn-purple w-50" to="/addriskassessments">Add Risk Assessment</Link>
                </div>
            </div>
            <div className="shadow-sm p-3 mb-5 bg-body rounded risk-assess">
                <h5 className="p-3 pb-0">Risk Assessments</h5>
                {/* Risk Level List */}
                <div className="border rounded p-4 m-3">
                    {this.RiskAssessmentsTable()}
                </div>

                <div className="text-center pt-4">
                    <BeatLoader color={this.state.color_red} loading={this.state.loader_risklevel.loading_rl} size={10} />
                </div>
                <div id="risk-level"></div>
                {/* {this.DisplayRiskLevel()} */}
            </div>

            {/* Edit Risk Assessment */}
            <ModalEditRiskAssess
                ref={this.editmodal}
                loadupdates={this.getRiskAssessmentList}
            />
            {/* Delete Modal */}
            <ModalDeleteRiskAssess
                ref={this.deletemodal}
                loadupdates={this.getRiskAssessmentList}
            />
            {/* Update Risk Level Modal */}
            <ModalUpdateRiskLevel
                ref={this.updatemodal}
                loadupdates={this.updateRiskLevelData}
            />
            {/* Update Risk Level Modal */}
            <ModalAddRiskLevel
                ref={this.addmodal}
            />
        </div >)
    }
}