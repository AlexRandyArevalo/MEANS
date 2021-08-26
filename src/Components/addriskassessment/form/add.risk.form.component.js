import React, { Component } from 'react';
import Table from '../../table.component/table.component'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { ClipLoader } from "react-spinners"
import { ToastProvider, useToasts } from 'react-toast-notifications'

library.add(faPlus, faArrowLeft);

export default class AddRiskForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            risklevelList: [],
            empty: null,
            loader: false,
            rl_isHidden: true,
        }

    }

    // Add Risk Level
    AddRiskLevel = () => {
        if (!this.state.risklevel || !this.state.def) return;
        this.state.risklevelList.push({
            risklevel: this.state.risklevel,
            def: this.state.def,
        })
        this.setState({
            empty: null,
            risklevel: "",
            def: "",
            rl_isHidden: false,
        })
    }

    // Display Table
    getRisLevelList = () => {
        if (!this.state.risklevelList) return null
        return (
            <div className="bg-white p-4 border rounded">
                <Table
                    class={'table'}
                    Header={
                        <tr>
                            <th width="5%">#</th>
                            <th width="35%">Risk Level</th>
                            <th width="60%">Definition</th>
                        </tr>
                    }
                    Body={
                        this.state.risklevelList.map((risklevel, key) =>
                        (<tr key={key}>
                            <th className="text-muted">{key + 1}</th>
                            <td className="text-muted">{risklevel.risklevel}</td>
                            <td className="text-muted">{risklevel.def}</td>
                        </tr>)
                        )
                    } />
            </div>
        )
    }

    // Handle Changes
    hasChanges = (datahere, e) => {
        this.setState({
            [datahere]: e.target.value
        })
    }

    Form = () => {
        return (<div>
            <div className="col-md-12 d-flex">
                <div className="col-md-6 p-3">
                    <label className="pb-1 fw-bold fs-13 ps-1">Title</label>
                    <input onChange={this.hasChanges.bind(this, 'title')} value={this.state.title} name="title" type="text" className="form-control" placeholder="Enter title" required />
                </div>
                <div className="col-md-6 p-3">
                    <label className="pb-1 fw-bold fs-13 ps-1">Address</label>
                    <input onChange={this.hasChanges.bind(this, 'address')} value={this.state.address} name="address" type="text" className="form-control" placeholder="Enter your address" required />
                </div>
            </div>
            <div className="col-md-12 d-flex">
                <div className="col-md-6 p-3">
                    <label className="pb-1 fw-bold fs-13 ps-1">City</label>
                    <input onChange={this.hasChanges.bind(this, 'city')} value={this.state.city} name="city" type="text" className="form-control" placeholder="Enter your city" required />
                </div>
                <div className="col-md-6 p-3">
                    <label className="pb-1 fw-bold fs-13 ps-1">Region</label>
                    <input onChange={this.hasChanges.bind(this, 'region')} value={this.state.region} name="region" type="text" className="form-control" placeholder="Enter your region" required />
                </div>
            </div>
            <div className="col-md-12">
                <div className="col p-3">
                    <label className="pb-1 fw-bold fs-13 ps-1">Description</label>
                    <textarea onChange={this.hasChanges.bind(this, 'desc')} value={this.state.desc} name="desc" className="form-control" rows="3" placeholder="Enter description" required></textarea>
                </div>
            </div>
            <div className="col-md-12">
                <div className="bg-light p-4 m-3 border rounded">
                    <h5 className="ps-3">Risk Levels</h5>
                    <div className="col-md-12 d-flex add-risk">
                        <div className="col-md-4 p-3 align-self-center add-risk-list">
                            <label className="pb-1 fw-bold fs-13 ps-1">Risk Assessment Level</label>
                            <input onChange={this.hasChanges.bind(this, 'risklevel')} value={this.state.risklevel} name="risklevel" type="text" className="form-control w-100 risk-level-field" placeholder="Enter risk level" />
                        </div>
                        <div className="col-md-6 p-3 align-self-center add-risk-list">
                            <label className="pb-1 fw-bold fs-13 ps-1">Definition</label>
                            <input onChange={this.hasChanges.bind(this, 'def')} value={this.state.def} name="def" type="text" className="form-control w-100 risk-level-field" placeholder="Enter definition" />
                        </div>
                        <div className="col-md-2 p-3 align-self-center add-risk-list" style={{ textAlign: "end" }}>
                            <button onClick={this.AddRiskLevel} type="button" className="btn_ btn-purple w-100"><FontAwesomeIcon icon="plus" /> Add</button>
                        </div>
                    </div>
                    <div className="p-3" hidden={this.state.rl_isHidden}>
                        {this.getRisLevelList()}
                    </div>
                </div>
            </div>
        </div>)
    }
    // Save Risk Assessment to DB

    render() {
        const SubmitButton = (e) => {
            const { addToast } = useToasts()
            const AddRiskAssess = () => {
                this.setState({ loader: true }) // Show Loader
                const jsonData = {
                    title: this.state.title,
                    address: this.state.address,
                    city: this.state.city,
                    region: this.state.region,
                    desc: this.state.desc,
                }
                // console.log(jsonData)
                axios.post('/saveRiskAssessment', jsonData)
                    .then((res) => {
                        if (res.data.status) {
                            let risklevelData = {}
                            let raID = res.data.id
                            risklevelData[raID] = this.state.risklevelList
                            // Save Risk Level
                            axios.post('/saveRiskLevel', risklevelData)
                                .then((res) => {
                                    if (res.data.status) {
                                        addToast(res.data.msg, {
                                            appearance: 'success',
                                            autoDismiss: true,
                                        })
                                        this.setState({ loader: false }) // Hide Loader
                                    }
                                }, (err) => {
                                    addToast(err.message, {
                                        appearance: 'error',
                                        autoDismiss: true,
                                    })
                                    this.setState({ loader: false }) // Hide Loader
                                });
                        }
                    }, (err) => {
                        addToast(err.message, {
                            appearance: 'error',
                            autoDismiss: true,
                        })
                        this.setState({ loader: false }) // Hide Loader
                    });
            }
            return (<div className="p-3 fs-3 col-6 mx-auto d-flex justify-content-center">
                <button onClick={AddRiskAssess} type="submit" className="btn_ btn-purple w-50">
                    <ClipLoader color={'#fff'} loading={this.state.loader} size={10} />
                    &nbsp; Submit &nbsp;
                </button>
            </div>)
        }
        return (<div>
            <ToastProvider>
                {this.Form()}
                <SubmitButton />
            </ToastProvider>
        </div>)
    }
}
