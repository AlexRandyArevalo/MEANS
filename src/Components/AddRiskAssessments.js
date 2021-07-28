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
    const [loc, setLoc] = useState('')
    const [desc, setDesc] = useState('')
    const AddRiskAssess = (e) => {
        e.preventDefault()
        console.log(title, '\n' + loc, '\n' + desc);
    }

    // Add Risk Level
    const [risklevel, setRiskLevel] = useState('')
    const [def, setDef] = useState('')
    const AddRiskLevel = (e) => {
        e.preventDefault()
        console.log(risklevel, '\n' + def);
    }

    return (<div>
        <Header />
        <div className="d-flex">
            <Menubar />
            <div className="means-body col-md-9 bg-light">
                <h4 className="ps-5 pt-4 pb-2 mean-title">Add Risk Assessments</h4>
                <hr />
                <div className="container">
                    <div className="row">
                        <small><Link type="button" className="btn btn-default text-muted" to="/riskassessments"><FontAwesomeIcon icon="arrow-left" /> Back</Link></small>
                        <form onSubmit={AddRiskAssess}>
                            <div className="col-md-12">
                                <div className="shadow-sm p-3 mt-2 mb-4 bg-body rounded">
                                    <div className="p-3 pb-1 mt-2">
                                        <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title" required />
                                    </div>
                                    <div className="p-3 pb-1">
                                        <input onChange={(e) => setLoc(e.target.value)} value={loc} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Location" required />
                                    </div>
                                    <div className="p-3">
                                        <textarea onChange={(e) => setDesc(e.target.value)} value={desc} class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Description" required></textarea>
                                    </div>
                                    <div className="p-3 fs-3 align-self-center col-2">
                                        <button type="submit" className="btn_ btn-purple">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div className="col-md-12">
                            <div className="shadow-sm p-3 mb-5 bg-body rounded">
                                <h5>Risk Levels</h5>
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
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">First</th>
                                            <th scope="col">Last</th>
                                            <th scope="col">Handle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div >)


}

export default AddRiskAssessments;