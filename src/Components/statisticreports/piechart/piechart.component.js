import { Component } from "react";
import { Pie } from "react-chartjs-2";
import { BeatLoader } from "react-spinners"

export default class PieChart extends Component {
    state = {
        color_green: "#36d7b7",
        loader: true,
        beatloader_toggle: false,
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
                datasets: [{
                    data: this.affectedData(),
                    backgroundColor: this.BGColor_I,
                    hoverOffset: 4,
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let labeltext = ['Not Affected', 'Affected']
                                let Alex_label = labeltext[context.dataIndex] + ': ' + context.parsed + '%';
                                return Alex_label;
                            }
                        }
                    }
                }]
            },
            Data_II: {
                datasets: [{
                    data: this.repondsData(),
                    backgroundColor: this.BGColor_II,
                    hoverOffset: 4,
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let labeltext = ['Total Employees', 'Responds']
                                let Alex_label = labeltext[context.dataIndex] + ': ' + context.parsed + '%';
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
            beatloader_toggle: true,
        })
    }
    render() {
        return (
            <div className="border rounded m-4">
                <div className="col-md-12 d-flex means-pie-chart">
                    <div className="col-md-12" hidden={this.state.beatloader_toggle}>
                        <div className=" d-flex justify-content-center" style={{ paddingTop: "15%" }}>
                            <BeatLoader color={this.state.color_green} loading={this.state.loader} size={15} />
                        </div>
                    </div>
                    <div className="col-md-6 d-flex means-pie-chart-II">
                        <div className="col-md-4 text-center my-auto" hidden={this.state.ishidden}>
                            <span className="fw-bold fs-5 pb-4" style={{ color: `${this.BGColor_II()[0]}` }}>{this.state.responds.totalAffected}%</span>
                            <p className="fs-13 text-muted mb-5">Total Employees</p>
                            <span className="fw-bold fs-5" style={{ color: `${this.BGColor_II()[1]}` }}>{this.state.responds.totalResponds}%</span>
                            <p className="fs-13 text-muted">Responds</p>
                        </div>
                        <div className="col-md-8 p-3">
                            <Pie data={this.state.Data_II} />
                        </div>
                    </div>
                    <div className="col-md-6 d-flex means-pie-chart-I">
                        <div className="col-md-4 text-center my-auto" hidden={this.state.ishidden}>
                            <span className="fw-bold fs-5 pb-4" style={{ color: `${this.BGColor_I()[0]}` }}>{this.state.affected.totalEmployees}%</span>
                            <p className="fs-13 text-muted mb-5">Not Affected</p>
                            <span className="fw-bold fs-5" style={{ color: `${this.BGColor_I()[1]}` }}>{this.state.affected.totalAffected}%</span>
                            <p className="fs-13 text-muted">Affected</p>
                        </div>
                        <div className="col-md-8 p-3">
                            <Pie data={this.state.Data_I} />
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}