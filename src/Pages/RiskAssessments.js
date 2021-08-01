import React from 'react'
import '../Components/riskassessment/table.modal/style.css'
import { Link } from 'react-router-dom'

import Search from '../Components/searchbox/search.component'
import Table from '../Components/riskassessment/table.modal/table.modal.component'

function RiskAssessments() {
    return (<div className="means-body col-md-9 bg-light">
        <h4 className="ps-4 pt-4 pb-2 mean-title">Risk Assessments</h4>
        <hr />
        <div className="container">
            <div className="col-md-12 d-flex pb-3 mt-4 risk-assess">
                <div className="col align-self-center w-100">
                    <Search />
                </div>
                <div className="col" style={{ textAlign: "end" }}>
                    <Link type="button" className="btn_ btn-purple w-50" to="/addriskassessments">Add Risk Assessment</Link>
                </div>
            </div>

            <div className="shadow-sm p-3 mb-5 bg-body rounded risk-assess">
                <h5 className="pb-3">Risk Assessments</h5>
                <Table />
            </div>            
        </div>
    </div>)
}

export default RiskAssessments;