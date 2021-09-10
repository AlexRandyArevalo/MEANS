import React from "react";
import UserForm from "../Components/usermaintenance/user.form/user.form.component"


function UserMaintenance() {
    return (<div className="means-body col-md-10 bg-light">
        <h4 className="ps-4 pt-4 pb-2 mean-title">User Maintenance</h4>
        <hr />
        <div className="container">
            <UserForm />
        </div>
    </div>)
}

export default UserMaintenance;