import React, { useState } from 'react'
import Header from './Header';
import Menubar from './Menubar';

function UserMaintenance() {
    const [eid, setEid] = useState('')
    const [phoneno, setPhoneno] = useState('')
    const [lname, setLname] = useState('')
    const [fname, setFname] = useState('')
    const [mname, setMname] = useState('')
    const [addr1, setAddr1] = useState('')
    const [addr2, setAddr2] = useState('')

    const handleValidate = (e) => {
        e.preventDefault();
        console.log(eid, '\n' +
            phoneno, '\n' +
            lname, '\n' +
            fname, '\n' +
            mname, '\n' +
            addr1, '\n' +
            addr2);
    }
    return (<div>
        <Header />
        <div className="d-flex">
            <Menubar />
            <div className="means-body col-md-9 bg-light">
                <h4 className="ps-5 pt-4 pb-2 mean-title">User Maintenance</h4>
                <hr />
                <div className="container">
                    <div className="shadow-sm p-3 mb-5 bg-body rounded mt-4">
                        <h5 className="pb-3">Application Form</h5>
                        <form onSubmit={handleValidate}>
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
                                <div className="col-md-12 pt-3">
                                    <button style={{ maxWidth: "20%", float: "right" }} type="submit" className="btn_ btn-purple pt-3">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>)


}

export default UserMaintenance;