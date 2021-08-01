function AddEmployeeform() {
    // Individual Employee Data
    // const [eid, setEid] = useState('')
    // const [phoneno, setPhoneno] = useState('')
    // const [lname, setLname] = useState('')
    // const [fname, setFname] = useState('')
    // const [mname, setMname] = useState('')
    // const [addr, setAddr1] = useState('')

    return (<div className="row m-3">
        <div className="col-md-7 mb-2">
            <input name="eid" type="email" className="form-control" placeholder="E.I.D" required />
        </div>
        <div className="col-md-5">
            <div className="input-group mb-2">
                <input type="text" className="form-control" value="+63" style={{ maxWidth: "55px" }} />
                <input name="phoneno" type="text" className="form-control" placeholder="___-___-__" required />
            </div>
        </div>
        <div className="col-md-4 mt-4 mb-2">
            <input name="lname" type="text" className="form-control" placeholder="Last Name" required />
        </div>
        <div className="col-md-4 mt-4 mb-2">
            <input name="fname" type="text" className="form-control" placeholder="First Name" required />
        </div>
        <div className="col-md-4 mt-4 mb-2">
            <input name="mname" type="text" className="form-control" placeholder="Middle Name" required />
        </div>
        <div className="col-md-12 mt-4 mb-2">
            <input name="addr" type="text" className="form-control" placeholder="Address Line 1" required />
        </div>
    </div>)
}

export default AddEmployeeform;