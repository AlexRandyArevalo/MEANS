import { Component } from "react";
import { Pie } from "react-chartjs-2";

export default class PieChart extends Component {
    state = {
        affected: {grandTotal:5, max:65, min:35},
        responds: {grandTotal:20, max:70, min:30},
        Data_I: {},
        Data_II: {},
    }

    componentDidMount = () => {
        this.loadPieChart()
    }

    BGColor_I = () => {
        return ([
            '#e35d6a',//red
            '#8540f5',//indigo
            '#3d8bfd', //blue
            // '#de5c9d',//pink
            // '#8c68cd',//purple
        ])
    }
    affectedData = () => {
        return ([
            this.state.affected.grandTotal,
            this.state.affected.max,
            this.state.affected.min,
        ])
    }

    BGColor_II = () => {
        return ([
            '#3dd5f3',//cyan
            '#4dd4ac',//teal
            '#ced4da',//gray
            // '#ffcd39',//yellow
            // '#fd9843', //orange
        ])
    }
    repondsData = () => {
        return ([
            this.state.responds.grandTotal,
            this.state.responds.max,
            this.state.responds.min,
        ])
    }

    loadData = (data) => {
        this.setState({
            affected: data.affected,
            responds: data.responds,
        })
        console.log(data)
        this.loadPieChart()
    }
    loadPieChart = () => {
        this.setState({
            Data_I: {
                // labels: [
                //     'Total Affected',
                //     'max',
                //     'min'
                // ],
                datasets: [{
                    data: this.affectedData(),
                    backgroundColor: this.BGColor_I,
                    hoverOffset: 4
                }]
            },
            Data_II: {
                // labels: [
                //     'Total Reponses',
                //     'max',
                //     'min'
                // ],
                datasets: [{
                    data: this.repondsData(),
                    backgroundColor: this.BGColor_II,
                    hoverOffset: 4
                }]
            }
        })
    }
    render() {
        return (<div className="col-md-12 d-flex means-pie-chart">
            <div className="col-md-4 means-pie-chart-I p-4 mx-auto">
                <Pie data={this.state.Data_I} />
            </div>
            <div className="col-md-4 means-pie-chart-II p-4 mx-auto">
                <Pie data={this.state.Data_II} />
            </div>
        </div>)
    }
}