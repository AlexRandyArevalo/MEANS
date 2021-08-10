import { Link } from 'react-router-dom'
import '../Components/addriskassessment/responsive-style/style.css'
import AddRiskForm from '../Components/addriskassessment/form/add.risk.form.component'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
library.add(faPlus, faArrowLeft);

function AddRiskAssessments() {
    return (<div className="means-body col-md-9 bg-light">
        <h4 className="ps-4 pt-4 pb-2 mean-title">Add Risk Assessments</h4>
        <hr />
        <div className="container">
            <div className="row">
                <Link type="button" className="btn btn-default means-back-btn ms-2" to="/riskassessments"><FontAwesomeIcon icon="arrow-left" /> Back</Link>
                <div className="shadow-sm p-3 mt-2 mb-4 bg-body rounded">
                    <AddRiskForm />
                </div>
            </div>
        </div>
    </div>)
}

export default AddRiskAssessments;