import './style.css'

function Cards() {
    return (<div className="d-flex mt-4 col-md-12 mean-card-main" >
        <div className="col-md-4 means-card">
            <div className="shadow-sm m-3 mb-5 bg-body rounded">
                <div className="card-body d-flex">
                    <div className="means-card-total p-2">100</div>
                    <hr className="vertical" />
                    <div className="means-card-title p-2">Risk <br />Assessments</div>
                </div>
            </div>
        </div>
        <div className="col-md-4 means-card">
            <div className="shadow-sm m-3 mb-5 bg-body rounded">
                <div className="card-body d-flex">
                    <div className="means-card-total p-2">200</div>
                    <hr className="vertical" />
                    <div className="means-card-title p-2">Employees</div>
                </div>
            </div>
        </div>
        <div className="col-md-4 means-card">
            <div className="shadow-sm m-3 mb-5 bg-body rounded">
                <div className="card-body d-flex">
                    <div className="means-card-total p-2">300</div>
                    <hr className="vertical" />
                    <div className="means-card-title p-2">Employees <br />Reponses</div>
                </div>
            </div>
        </div>
    </div >)
}

export default Cards;