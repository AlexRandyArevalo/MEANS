import React from 'react'

import Table from '../table/table.component'
import AddRiskForm from './add.risk.form.component'
import AddRiskLevelForm from './add.risk.level.form.component'

function AddRiskAssessForm() {

    const AddRiskAssess = (e) => {
        e.preventDefault()
        console.log(e.target.title.value, '\n' 
        + e.target.address.value, '\n' 
        + e.target.city.value, '\n' 
        + e.target.region.value, '\n' 
        + e.target.desc.value);
    }

    return (<div>
        <form onSubmit={AddRiskAssess}>
            <AddRiskForm />
            <div className="col-md-12">
                <h5 className="ps-3">Risk Levels</h5>
                <AddRiskLevelForm />
                <Table />
            </div>
            <div className="p-3 fs-3 col-6 mx-auto d-flex justify-content-center">
                <button type="submit" className="btn_ btn-purple w-50">Submit</button>
            </div>
        </form>
    </div>)
}
export default AddRiskAssessForm;