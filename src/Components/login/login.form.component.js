import './style.css'
import logo from '../../Assets/images/acn-logo.svg';
import swal from 'sweetalert'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { ToastProvider, useToasts } from 'react-toast-notifications'

function LoginForm() {
    // User Input
    const [eid, setUser] = useState('alex@accenture.com')
    const [pass, setPass] = useState('111')

    const history = useHistory();

    // Validate Input Data
    const handleValidate = (e) => {
        e.preventDefault()
        if (eid === 'alex@accenture.com' && pass === '111')
            history.push('/')
        else
            swal("Wrong Credentials", "Please try again", "error")
    }

    const SubmitButton = () => {
        const { addToast } = useToasts()
        const Login = () => {
            addToast(`This is your username and password [${eid}, ${pass}]`, {
                appearance: 'success',
                autoDismiss: true,
            })
        }
        return (
            <button onClick={Login} className="btn_ btn-purple mb-4 w-100">Submit</button>
        )
    }

    return (
        <ToastProvider>
            <div className="col-md-4 mx-auto bg-light p-5 rounded">
                <h1 className="pb-4">MEANS</h1>
                <div className="mb-4">
                    <input onChange={(e) => setUser(e.target.value)} type="email" value={eid} className="form-control" placeholder="*EID" />
                </div>
                <div className="mb-4">
                    <input onChange={(e) => setPass(e.target.value)} type="password" value={pass} className="form-control" placeholder="*Password" />
                </div>
                <SubmitButton />
                <div className="d-flex justify-content-center">
                    <img src={logo} className="acn-logo" alt="logo" />
                    <p className="h6 mt-1 ms-2">Powered by Accenture</p>
                </div>
            </div>
        </ToastProvider>
    )
}

export default LoginForm;