import React, { Component } from "react";
import Table from "../../table.component/table.component";
import { ClipLoader } from "react-spinners"
import axios from "axios";

export default class EmployeeAtRiskTable extends Component {
    state = {
        color_red: "#dc3545",
        loader: false,
        dataTable: [],
    }

    EmployeeAtRiskList = (id) => {
        this.setState({ loader: true, dataTable: [] })
        axios.get(`/riskData/${id}`)
            .then(res => {
                this.setState({
                    loader: false,
                    dataTable: res.data.data,
                })
            })
            .catch(err => {
                console.error(err.message)
            })
    }

    render() {
        return (<Table
            class={'table'}
            Header={
                <tr>
                    <th width="5%">#</th>
                    <th>EID</th>
                    <th className="text-nowrap">Name</th>
                    <th className="text-nowrap">Workflow</th>
                    <th className="text-nowrap">Contact</th>
                    <th>Respond</th>
                    <th>Risk Level</th>
                    <th>Evacuation</th>
                    <th>Address</th>
                </tr>
            }
            Loader={
                <tr>
                    <td className="sweet-loading pt-2 ps-1" style={{ borderBottom: "none", padding: "0px" }}>
                        <ClipLoader color={this.state.color_red} loading={this.state.loader} size={24} />
                    </td>
                </tr>
            }
            Body={
                this.state.dataTable.map((emp, index) =>
                    <tr key={index}>
                        <th>{index + 1}.</th>
                        <td className="text-truncate td-mw-12 text-muted" title={emp.eid}>{emp.eid}</td>
                        <td className="text-truncate td-mw-12 text-muted" title={emp.name}>{emp.name}</td>
                        <td className="text-truncate td-mw-12 text-muted" title={emp.workflow}>{emp.workflow}</td>
                        <td className="text-truncate td-mw-12 text-muted" title={emp.addr}>{emp.addr}</td>
                        <td className="text-truncate td-mw-12 text-muted" title={emp.contact}>{emp.contact}</td>
                        <td className="text-truncate td-mw-12 text-muted" title={emp.respondTag}>{emp.respondTag}</td>
                        <td className="text-truncate td-mw-12 text-muted" title={emp.riskLevel}>{emp.riskLevel}</td>
                        <td className="text-truncate td-mw-12 text-muted" title={emp.needEvac}>{emp.needEvac}</td>
                    </tr>
                )
            }
        />)
    }
}
