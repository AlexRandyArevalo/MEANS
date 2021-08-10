import React, { useState } from 'react'
import axios from 'axios'

function UserForm() {
    // Input Data
    const [eid, setEid] = useState('')
    const [phoneno, setPhoneno] = useState('')
    const [lname, setLname] = useState('')
    const [fname, setFname] = useState('')
    const [mname, setMname] = useState('')
    const [addr1, setAddr1] = useState('')
    const [addr2, setAddr2] = useState('')

    // Validate Data
    const handleValidate = (e) => {
        e.preventDefault();
        let jsonData = {
            eid: eid,
            phoneno: phoneno,
            lname: lname,
            fname: fname,
            mname: mname,
            addr1: addr1,
            addr2: addr2
        }
        axios.post('/saveUser', jsonData)
        .then((res) => {
            console.log(res);
        }, (err) => {
            console.log(err);
        });
    }
    return (<form onSubmit={handleValidate}>
        <div className="row m-3">
            <div className="col-md-7">
                <input onChange={(e) => setEid(e.target.value)} value={eid} type="email" className="form-control" placeholder="E.I.D" required />
            </div>
            <div className="col-md-5">
                <div className="input-group">
                    <input type="text" className="form-control" value="+63" style={{ maxWidth: "55px" }} />
                    <input onChange={(e) => setPhoneno(e.target.value)} value={phoneno} type="text" className="form-control" placeholder="___-___-__" required />
                </div>
            </div>
            <div className="col-md-4 mt-4">
                <input onChange={(e) => setLname(e.target.value)} value={lname} type="text" className="form-control" placeholder="Last Name" required />
            </div>
            <div className="col-md-4 mt-4">
                <input onChange={(e) => setFname(e.target.value)} value={fname} type="text" className="form-control" placeholder="First Name" required />
            </div>
            <div className="col-md-4 mt-4">
                <input onChange={(e) => setMname(e.target.value)} value={mname} type="text" className="form-control" placeholder="Middle Name" required />
            </div>
            <div className="col-md-12 mt-4">
                <input onChange={(e) => setAddr1(e.target.value)} value={addr1} type="text" className="form-control" placeholder="Address Line 1" required />
            </div>
            <div className="col-md-12 mt-4">
                <input onChange={(e) => setAddr2(e.target.value)} value={addr2} type="text" className="form-control" placeholder="Address Line 2" />
            </div>
            <div className="col-md-12 pt-3" style={{ textAlign: "end" }}>
                <button type="submit" className="btn_ btn-purple">Submit</button>
            </div>
        </div>
    </form>)
}

export default UserForm;