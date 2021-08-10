import React from 'react'
// import axios from 'axios'
import Cards from '../Components/dashboard/cards/card.component'
import Table from '../Components/dashboard/table/table.component'

function Dashboard() {  
    
    return (<div className="means-body col-md-9 bg-light">
        <h4 className="ps-4 pt-4 pb-2 mean-title">Dashboard</h4>
        <hr />
        <div className="container">
            <div className="row">
                <Cards />
                <div className="col-md-12">
                    <div className="shadow-sm p-3 mb-5 bg-body rounded">
                        <h5 className="pb-3">Risk Assessments</h5>
                        <Table /> 
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default Dashboard;