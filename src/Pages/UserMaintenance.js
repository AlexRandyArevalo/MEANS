import UserForm from "../Components/usermaintenance/usermaintenance.component/user.form.component";

function UserMaintenance() {
    return (<div className="means-body col-md-9 bg-light">
        <h4 className="ps-4 pt-4 pb-2 mean-title">User Maintenance</h4>
        <hr />
        <div className="container">
            <div className="shadow-sm p-3 mb-5 bg-body rounded mt-4">
                <h5 className="pb-3">Application Form</h5>
                <UserForm />
            </div>
        </div>
    </div>)
}

export default UserMaintenance;