import React from "react";
import '../Components/statisticreports/responsive-style/style.css'
import PieChart from '../Components/statisticreports/piechart/piechart.component'
import Table from '../Components/statisticreports/table/table.component'
import DropDown from '../Components/statisticreports/dropdown/dropdown.component'
// import DateRangePicker from '@wojtekmaj/react-daterange-picker';


function StatisticReports() {
    return (<div className="means-body col-md-9 bg-light">
        <h4 className="ps-4 pt-4 pb-2 mean-title">Statistic and Reports</h4>
        <hr />
        <div className="container">
            <div className="shadow-sm mb-3 bg-body rounded mt-4">
                <DropDown />
                <PieChart />
            </div>

            {/* TABLE */}
            <div className="shadow-sm p-3 mb-5 bg-body rounded">
                <h5 className="pb-3">List of Employees at Risk</h5>
                <Table />
            </div>
        </div>
    </div>)
}

export default StatisticReports;