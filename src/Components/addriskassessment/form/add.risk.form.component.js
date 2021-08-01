function AddRiskForm() {
    return (<div>
        <div className="col-md-12 d-flex">
            <div className="col-md-6 p-3">
                <input name="title" type="text" className="form-control" placeholder="Title" required />
            </div>
            <div className="col-md-6 p-3">
                <input name="address" type="text" className="form-control" placeholder="Address" required />
            </div>
        </div>
        <div className="col-md-12 d-flex">
            <div className="col-md-6 p-3">
                <input name="city" type="text" className="form-control" placeholder="City" required />
            </div>
            <div className="col-md-6 p-3">
                <input name="region" type="text" className="form-control" placeholder="Region" required />
            </div>
        </div>
        <div className="col-md-12 mb-5">
            <div className="col p-3">
                <textarea name="desc" className="form-control" rows="3" placeholder="Description" required></textarea>
            </div>
        </div>
    </div>)
}

export default AddRiskForm;