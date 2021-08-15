import React, { Component } from 'react'
import '../Components/riskassessment/table.modal/style.css'
import Table from '../Components/riskassessment/table.modal/table.modal.component'

export default class RiskAssessments extends Component {
    render() {
        return (<div className="means-body col-md-10 bg-light">
            <h4 className="ps-4 pt-4 pb-2 mean-title">Risk Assessments</h4>
            <hr />
            <div className="container">
                <Table />
            </div>
        </div>)
    }
}