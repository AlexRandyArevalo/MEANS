import axios from "axios";
import { Component } from "react";

export default class DropDown extends Component {
    state = {
        risklist: []
    }
    componentDidMount = () => {
        this.getRiskAssessData()
    }
    getRiskAssessData = () => {
        axios.get('/riskAssessments/')
            .then((res) => {
                if (res.data.status) {
                    this.setState({ risklist: res.data.data })
                }
            }, (err) => {
                console.log(err.message)
            });
    }
    RiskAssessList = () => {
        if (!this.state.risklist) return null;
        return (
            this.state.risklist.map((risk, key) =>
                <option key={key} value={risk._id}>{risk.title}</option>
            )
        )
    }

    render() {
        return (<div>
            <div className="card-header p-3 d-flex align-self-center bg-white">
                <div className="col-md-6 align-self-center">
                    <select className="form-select w-50" defaultValue="default" onChange={this.props.selectedrisk}>
                        <option value="default">Please select</option>
                        {this.RiskAssessList()}
                    </select>
                </div>
                <div className="col-md-6" style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button className="btn_outline btn-outline-purple" onClick={this.props.generatereport}>Generate Report</button>
                </div>
            </div>
        </div>)
    }
}