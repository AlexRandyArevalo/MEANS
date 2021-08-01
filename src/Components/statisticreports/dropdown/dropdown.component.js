function DropDown() {
    // DropDown Static Data
    const dropdownlist = [
        {
            id: 1,
            text: "Type of Risk 1"
        },
        {
            id: 2,
            text: "Type of Risk 2"
        },
        {
            id: 3,
            text: "Type of Risk 3"
        }
    ]

    return (<div className="card-header p-3 d-flex align-self-center bg-white">
        <div className="col-md-6 align-self-center" >
            Select Risk Assessment
        </div>
        <div className="col-md-6 align-self-center" style={{ display: "flex", justifyContent: "flex-end" }}>
            <select className="form-select w-50" aria-label="Default select example">
                <option selected>Please select</option>
                {
                    dropdownlist.map(riskdata =>
                        <option value={riskdata.id}>{riskdata.text}</option>
                    )
                }
            </select>
        </div>
        
    </div>)
}

export default DropDown;