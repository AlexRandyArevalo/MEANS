import React from "react";
import '../Components/statisticreports/responsive-style/style.css'
import PieChart from '../Components/statisticreports/piechart/piechart.component'
import EmployeeAtRiskTable from '../Components/statisticreports/table/table.component'
import DropDown from '../Components/statisticreports/dropdown/dropdown.component'
import { Component } from "react";
import axios from "axios";


export default class StatisticReports extends Component {
    constructor(props) {
        super(props)
        this.elemRef = React.createRef([])
        this.state = {
            reportData: [],
        }
    }
    OnSelectRisk = (e) => {
        let riskid = e.target.value;
        this.PieChartData(riskid)
        this.prepReportData(riskid)        
    }
    PieChartData = (id) => {
        axios.get(`/statistics/${id}`)
            .then(res => {
                this.elemRef.current.loadData(res.data.data)
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    prepReportData = (id) => {
        axios.get(`/generateReport/${id}`, { responseType: 'blob' })
            .then(res => {
                this.setState({ reportData: res })
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    GenerateReport = () => {
        const url = window.URL.createObjectURL(new Blob([this.state.reportData.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'MEANS_RISK_ASSESSMENT_REPORT.xlsx');
        document.body.appendChild(link);
        link.click();
    }
    render() {
        return (<div className="means-body col-md-10 bg-light">
            <h4 className="ps-4 pt-4 pb-2 mean-title">Statistic and Reports</h4>
            <hr />
            <div className="container">
                <div className="shadow-sm mb-4 bg-body rounded mt-4">
                    <DropDown selectedrisk={this.OnSelectRisk} generatereport={this.GenerateReport} />
                    <PieChart ref={this.elemRef} />
                </div>

                {/* TABLE */}
                <div className="shadow-sm p-3 mb-5 bg-body rounded">
                    <h5 className="pb-3">List of Employees at Risk</h5>
                    <EmployeeAtRiskTable />
                </div>
            </div>
        </div>)
    }
}