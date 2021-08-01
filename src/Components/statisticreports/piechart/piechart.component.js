import { Pie } from "react-chartjs-2";

function PieChart() {
    // Pie Data I
    const Data_I = {
        // labels: [
        //   'Red',
        //   'Blue',
        //   'Yellow'
        // ],
        datasets: [{
            label: 'My First Dataset',
            data: [40, 50, 35, 87, 65],
            backgroundColor: [
                '#e35d6a',//red
                '#de5c9d',//pink
                '#8c68cd',//purple
                '#8540f5',//indigo
                '#3d8bfd' //blue
            ],
            hoverOffset: 4
        }]
    };

    // Pie Data II
    const Data_II = {
        // labels: [
        //   'Red',
        //   'Blue',
        //   'Yellow'
        // ],
        datasets: [{
            label: 'My First Dataset',
            data: [65, 87, 35, 50, 40],
            backgroundColor: [
                '#3dd5f3',//cyan
                '#4dd4ac',//teal
                '#ced4da',//gray
                '#ffcd39',//yellow
                '#fd9843' //orange
            ],
            hoverOffset: 4
        }]
    };
    return (<div className="col-md-12 d-flex means-pie-chart">
        <div className="col-md-4 means-pie-chart-I p-4 mx-auto">
            <Pie data={Data_I} />
        </div>
        <div className="col-md-4 means-pie-chart-II p-4 mx-auto">
            <Pie data={Data_II} />
        </div>
    </div>)
}

export default PieChart;