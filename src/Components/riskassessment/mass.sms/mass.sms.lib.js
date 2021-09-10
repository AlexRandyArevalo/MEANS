import { Component } from "react";
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
library.add(faPaperPlane);

export default class MassSms extends Component {
    constructor(props) {
        super(props)
        this.state = {
            icontoggle: false,
            loadertoggle: false,
        }
    }

    render() {
        const SmsButton = () => {
            const { addToast } = useToasts()
            const SendSMS = () => {
                this.setState({
                    icontoggle: true,
                    loadertoggle: true,
                })
                axios.post(`riskSms/${this.props.riskdata._id}`)
                    .then(res => {
                        addToast(res.data.msg, {
                            appearance: 'success',
                            autoDismiss: true,
                        })
                        this.setState({
                            icontoggle: false,
                            loadertoggle: false,
                        })
                    })
                    .catch(err => {
                        addToast(err.message, {
                            appearance: 'error',
                            autoDismiss: true,
                        })
                    })
            }
            return (
                <button onClick={SendSMS} className="btn btn-outline-success btn-sm">
                    <ClipLoader color={'#198754'} loading={this.state.loadertoggle} size={10} hidden={this.state.loadertoggle} />
                    <FontAwesomeIcon icon="paper-plane" hidden={this.state.icontoggle} />
                    &nbsp;Send
                </button>
            )
        }
        return (
            <ToastProvider>
                <SmsButton />
            </ToastProvider>
        )
    }
}