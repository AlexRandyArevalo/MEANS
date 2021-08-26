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
        axios.get('/riskAssessments')
            .then((res) => {
                if (res.data.status) {
                    this.setState({
                        risklist: res.data.data,
                    })
                    setTimeout(() => {
                        let id = document.getElementById('_risklist').value;
                        this.props.loaddefault(id)
                    }, 100);
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
            <div className="p-4 pb-0 d-flex align-self-center bg-white">
                <div className="col-md-6 align-self-center">
                    <select id="_risklist" className="form-select w-50" onChange={this.props.selectedrisk}>
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