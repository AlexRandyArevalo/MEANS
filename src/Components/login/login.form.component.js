import './style.css'
import logo from '../../Assets/images/acn-logo.svg';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { ToastProvider, useToasts } from 'react-toast-notifications'
import axios from 'axios';
import { ClipLoader } from "react-spinners";
import { useCookies } from 'react-cookie';

function LoginForm() {
    const [eid, setUser] = useState('arux.randy.arevalo')
    const [password, setPass] = useState('pw@1234')
    const [loader, setLoader] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies([]);

    const history = useHistory();

    useEffect(() => {
        removeCookie('name')
        removeCookie('_token')
    }, [removeCookie])

    const SubmitButton = () => {
        const { addToast } = useToasts()
        const Login = () => {
            setLoader(true)
            let jsonData = {
                eid: eid,
                password: password,
            }
            axios.post('/login', jsonData)
                .then(res => {
                    setCookie('name', res.data.name)
                    setCookie('_token', res.data.token)
                    setLoader(false)
                    history.push('/')
                }).catch(err => {
                    addToast('Incorrect eid or password.', {
                        appearance: 'error',
                        autoDismiss: true,
                    })
                    setLoader(false)
                })
        }

        return (
            <button onClick={Login} className="btn_ btn-purple mb-4 w-100">
                <ClipLoader color={'#fff'} loading={loader} size={10} />
                &nbsp; Login &nbsp;
            </button>
        )
    }

    return (
        <ToastProvider>
            <div className="col-md-4 mx-auto bg-light p-5 rounded">
                <h1 className="pb-4">MEANS</h1>
                <div className="mb-4">
                    <input onChange={(e) => setUser(e.target.value)} type="text" value={eid} className="form-control" placeholder="*EID" />
                </div>
                <div className="mb-4">
                    <input onChange={(e) => setPass(e.target.value)} type="password" value={password} className="form-control" placeholder="*Password" />
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