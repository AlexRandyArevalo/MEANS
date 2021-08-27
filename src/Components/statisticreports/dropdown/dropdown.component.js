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
                    let id = (this.props._riskid.length <= 0)
                        ?
                        res.data.data[this.props._riskid.length]._id
                        :
                        this.props._riskid[this.props._riskid.length - 1]

                    this.props.loaddefault(id)
                }
            }, (err) => {
                console.log(err.message)
            });
    }
    RiskAssessList = () => {
        if (!this.state.risklist) return null;
        return (
            this.state.risklist.map((risk, key) =>
                <option className="text-capitalize" key={key} value={risk._id}>{risk.title}</option>
            )
        )
    }

    render() {
        return (<div>
            <div className="p-4 pb-0 d-flex align-self-center bg-white">
                <div className="col-md-6 align-self-center">
                    <select className="form-select text-capitalize text-muted w-50" onChange={this.props.selectedrisk}>
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