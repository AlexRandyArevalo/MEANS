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
        this.piechartdata = React.createRef([])
        this.AtRiskList = React.createRef([])
        this.state = {
            risk_id: [],
            reportData: [],
        }
    }
    OnSelectRisk = (e) => {
        let riskid = e.target.value
        this.PieChartData(riskid)
        this.state.risk_id.push(riskid)
        this.AtRiskList.current.EmployeeAtRiskList(riskid)
    }
    PieChartData = (id) => {
        axios.get(`/statistics/${id}`)
            .then(res => {
                console.log(res.data.data)
                this.piechartdata.current.changeState()
                this.piechartdata.current.loadData(res.data.data)
                this.AtRiskList.current.EmployeeAtRiskList(id)
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    GenerateReport = () => {
        axios.get(`/generateReport/${this.state.risk_id[this.state.risk_id.length - 1]}`, { responseType: 'blob' })
            .then(res => {
                // this.setState({ reportData: res })
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'MEANS_RISK_ASSESSMENT_REPORT.xlsx');
                document.body.appendChild(link);
                link.click();
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    render() {
        return (<div className="means-body col-md-10 bg-light">
            <h4 className="ps-4 pt-4 pb-2 mean-title">Dashboard</h4>
            <hr />
            <div className="container">
                <div className="shadow-sm mb-4 bg-body rounded mt-4">
                    <DropDown
                        loaddefault={this.PieChartData}
                        selectedrisk={this.OnSelectRisk}
                        generatereport={this.GenerateReport}
                    />
                    <PieChart
                        ref={this.piechartdata}
                    />
                </div>

                {/* TABLE */}
                <div className="shadow-sm p-3 mb-5 bg-body rounded">
                    <h5 className="pb-3">List of Employees at Risk</h5>
                    <EmployeeAtRiskTable
                        ref={this.AtRiskList}
                    />
                </div>
            </div>
        </div>)
    }
}