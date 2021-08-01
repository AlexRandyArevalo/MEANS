import React, { useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
library.add(faPlus, faArrowLeft);

function AddRiskLevelForm() {
    // Add Risk Level
    const [risklevel, setRiskLevel] = useState('')
    const [def, setDef] = useState('')
    const AddRiskLevel = (e) => {
        e.preventDefault()
        console.log(risklevel, '\n' + def);
    }

    return (<div>
        <div className="col-md-12 d-flex add-risk">
            <div className="col-md-4 p-3 align-self-center add-risk-list">
                <input onChange={(e) => setRiskLevel(e.target.value)} value={risklevel} type="text" className="form-control w-100" placeholder="Risk Assessment Level" required />
            </div>
            <div className="col-md-6 p-3 align-self-center add-risk-list">
                <input onChange={(e) => setDef(e.target.value)} value={def} type="text" className="form-control w-100" placeholder="Definition" required />
            </div>
            <div className="col-md-2 p-3 align-self-center add-risk-list" style={{ textAlign: "end" }}>
                <button onClick={AddRiskLevel} type="button" className="btn_ btn-purple w-100"><FontAwesomeIcon icon="plus" /> Add</button>
            </div>
        </div>
    </div>)
}

export default AddRiskLevelForm;