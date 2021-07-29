import React, { useState } from 'react'
import Header from './Header';
import Menubar from './Menubar';
import { Link } from 'react-router-dom'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
library.add(faPlus, faArrowLeft);

function AddRiskAssessments() {
    // Add Risk Assessments
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [region, setRegion] = useState('')
    const [desc, setDesc] = useState('')
    const AddRiskAssess = (e) => {
        e.preventDefault()
        console.log(title, '\n' + address, '\n' + city, '\n' + region, '\n' + desc);
    }

    // Add Risk Level
    const [risklevel, setRiskLevel] = useState('')
    const [def, setDef] = useState('')
    const AddRiskLevel = (e) => {
        e.preventDefault()
        console.log(risklevel, '\n' + def);
    }

    // Static Data
    const DataTable = [
        {
            id: 1,
            title: "[Empty]",
            location: "[Empty]",
            description: "[Empty]"
        },
        {
            id: 2,
            title: "[Empty]",
            location: "[Empty]",
            description: "[Empty]"
        },
        {
            id: 3,
            title: "[Empty]",
            location: "[Empty]",
            description: "[Empty]"
        }
    ]

    return (<div>
        <Header />
        <div className="d-flex">
            <Menubar />
            <div className="means-body col-md-9 bg-light">
                <h4 className="ps-4 pt-4 pb-2 mean-title">Add Risk Assessments</h4>
                <hr />
                <div className="container">
                    <div className="row">
                        <Link type="button" className="btn btn-default means-back-btn ms-2" to="/riskassessments"><FontAwesomeIcon icon="arrow-left" /> Back</Link>
                        <div className="shadow-sm p-3 mt-2 mb-4 bg-body rounded">
                            <form onSubmit={AddRiskAssess}>
                                <div className="col-md-12 d-flex">
                                    <div className="col-md-6 p-3">
                                        <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" className="form-control" placeholder="Title" required />
                                    </div>
                                    <div className="col-md-6 p-3">
                                        <input onChange={(e) => setAddress(e.target.value)} value={address} type="text" className="form-control" placeholder="Address" required />
                                    </div>
                                </div>
                                <div className="col-md-12 d-flex">
                                    <div className="col-md-6 p-3">
                                        <input onChange={(e) => setCity(e.target.value)} value={city} type="text" className="form-control" placeholder="City" required />
                                    </div>
                                    <div className="col-md-6 p-3">
                                        <input onChange={(e) => setRegion(e.target.value)} value={region} type="text" className="form-control" placeholder="Region" required />
                                    </div>
                                </div>
                                <div className="col-md-12 mb-5">
                                    <div className="col p-3">
                                        <textarea onChange={(e) => setDesc(e.target.value)} value={desc} class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Description" required></textarea>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <h5 className="ps-3">Risk Levels</h5>
                                    <form onSubmit={AddRiskLevel}>
                                        <div className="col-md-12 d-flex add-risk">
                                            <div className="col-md-4 p-3 align-self-center add-risk-list">
                                                <input onChange={(e) => setRiskLevel(e.target.value)} value={risklevel} type="text" className="form-control w-100" placeholder="Risk Assessment Level" required />
                                            </div>
                                            <div className="col-md-6 p-3 align-self-center add-risk-list">
                                                <input onChange={(e) => setDef(e.target.value)} value={def} type="text" className="form-control w-100" placeholder="Definition" required />
                                            </div>
                                            <div className="col-md-2 p-3 align-self-center add-risk-list" style={{ textAlign: "end" }}>
                                                <button type="submit" className="btn_ btn-purple w-100"><FontAwesomeIcon icon="plus" /> Add</button>
                                            </div>
                                        </div>
                                    </form>

                                    {/* TABLE */}
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th width="5%">#</th>
                                                <th width="25%">Title</th>
                                                <th width="20%">Location</th>
                                                <th width="20%">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                DataTable.map(data =>
                                                    <tr>
                                                        <th scope="row">{data.id}</th>
                                                        <td>{data.title}</td>
                                                        <td>{data.location}</td>
                                                        <td>{data.description}</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>

                                </div>
                                <div className="p-3 fs-3 col-6 mx-auto d-flex justify-content-center">
                                    <button type="submit" className="btn_ btn-purple w-50">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div >)


}

export default AddRiskAssessments;