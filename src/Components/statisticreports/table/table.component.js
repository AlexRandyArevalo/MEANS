import { Component } from "react";
import Table from "../../table.component/table.component";
import { ClipLoader } from "react-spinners"

export default class EmployeeAtRiskTable extends Component {
    state = {
        color: "#9500f3",
        loader: false,
    }
    render() {
        return (<Table
            Header={
                <tr>
                    <th width="5%">#</th>
                    <th width="13.5%">EID</th>
                    <th width="13.5%" className="text-nowrap">Last Name</th>
                    <th width="13.5%" className="text-nowrap">First Name</th>
                    <th width="13.5%" className="text-nowrap">Middle Name</th>
                    <th width="13.5%">Contact</th>
                    <th width="13.5%">Address</th>
                </tr>
            }
            Loader={
                <tr>
                    <td className="sweet-loading pt-2 ps-1" style={{ borderBottom: "none", padding: "0px" }}>
                        <ClipLoader color={this.state.color} loading={this.state.loader} size={24} />
                    </td>
                </tr>
            }
            Body={
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            }
        />)
    }
}
