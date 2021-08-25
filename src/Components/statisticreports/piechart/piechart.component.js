import { Component } from "react";
import { Pie } from "react-chartjs-2";
import { BeatLoader } from "react-spinners"
import AddEmployee from "../../employeemaintenance/modal/modal.add.employee.component";

export default class PieChart extends Component {
    state = {
        color_green: "#36d7b7",
        loader: true,
        ishidden: true,
        affected: [],
        responds: [],
        Data_I: {},
        Data_II: {},
    }

    componentDidMount = () => {
        this.setState({ loader: true })
        this.loadPieChart()
    }

    BGColor_I = () => {
        return ([
            '#36d7b7', //green
            '#ea868f',//red
            '#8540f5',//indigo
            '#de5c9d',//pink
            '#8c68cd',//purple
        ])
    }
    affectedData = () => {
        return ([
            this.state.affected.totalEmployees,
            this.state.affected.totalAffected,
        ])
    }

    BGColor_II = () => {
        return ([
            '#6ea8fe', //blue
            '#ffda6a',//yellow
            '#4dd4ac',//teal
            '#3dd5f3',//cyan
            '#ced4da',//gray
        ])
    }
    repondsData = () => {
        return ([
            this.state.responds.totalAffected,
            this.state.responds.totalResponds,
        ])
    }

    loadData = (data) => {
        this.setState({
            affected: data.affected,
            responds: data.responds,
        })
        this.loadPieChart()
    }

    loadPieChart = () => {
        this.setState({
            Data_I: {
                labels: [
                    'Not Affected',
                    'Affected'
                ],
                datasets: [{
                    data: this.affectedData(),
                    backgroundColor: this.BGColor_I,
                    hoverOffset: 4,
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let Alex_label = context.label + ': ' + context.parsed + '%';
                                return Alex_label;
                            }
                        }
                    }
                }]
            },
            Data_II: {
                labels: [
                    'Total Employees',
                    'Responds'
                ],
                datasets: [{
                    data: this.repondsData(),
                    backgroundColor: this.BGColor_II,
                    hoverOffset: 4,
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let Alex_label = context.label + ': ' + context.parsed + '%';
                                return Alex_label;
                            }
                        }
                    }
                }]
            }
        })
    }
    changeState = () => {
        this.setState({
            loader: false,
            ishidden: false,
        })
    }
    render() {
        return (<div className="col-md-12 d-flex means-pie-chart">
            <div className="loader">
                <BeatLoader color={this.state.color_green} loading={this.state.loader} size={15} />
            </div>
            <div className="col-md-4 means-pie-chart-II p-4 mx-auto" >
                <Pie data={this.state.Data_II} hidden={this.state.ishidden} />
            </div>
            <div className="col-md-4 means-pie-chart-I p-4 mx-auto" style={{ height: "46vh" }} >
                <Pie data={this.state.Data_I} hidden={this.state.ishidden} />
            </div>
        </div>)
    }
}