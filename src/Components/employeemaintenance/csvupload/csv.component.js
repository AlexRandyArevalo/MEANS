import React, { Component } from 'react'
import CSVReader from 'react-csv-reader'
import { ToastProvider, useToasts } from 'react-toast-notifications'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFileCsv } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { ClipLoader } from 'react-spinners'
library.add(faFileCsv);

export default class UploadCsv extends Component {
    state = {
        loader: false,
        csvData: []
    }
    // Upload Multiple Employees    
    parseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header =>
            header
                .toLowerCase()
                .replace(/\W/g, '_')
    }

    // Handle CSV Data On Upload
    handleData = (data, info) => {
        let obj = []
        data.map(res=>{
            obj.push({
                eid:res.eid,
                phoneno:res.contact,
                lname:res.last_name,
                fname:res.first_name,
                mname:res.middle_name,
                addr:res.address,
                workflow:res.workflow,
            })
        })
        this.setState({
            csvData: obj
        })
    }
    onError = (err) => {
        console.log(err)
    }

    render() {
        const SubmitButton = () => {
            const { addToast } = useToasts()
            const SaveToDB = () => {
                
                this.setState({ loader: true })
                axios.post('/saveBulkEmployee', this.state.csvData)
                    .then((res) => {
                        if (res.data.status) {
                            addToast(res.data.msg, {
                                appearance: 'success',
                                autoDismiss: true,
                            })
                            this.setState({ loader: false })
                            this.props.reloadtable()
                        }
                    }, (err) => {
                        addToast(err.message, {
                            appearance: 'error',
                            autoDismiss: true,
                        })
                        this.setState({ loader: false })
                    });
            }
            return (<div className="p-4">
                <button type="button" className="btn_ btn-purple w-100" onClick={SaveToDB}>
                    <ClipLoader color={'#fff'} loading={this.state.loader} size={10} />
                    &nbsp; Submit &nbsp;
                </button>
            </div>)
        }
        return (<ToastProvider>
            <div className="col-md-3 upload-employees" >
                <div className="shadow-sm pb-1 bg-body rounded h-auto mt-2">
                    <div className="d-flex p-4 pb-0">
                        <div className="w-50">
                            <div className="text-body">File upload</div>
                        </div>
                        <div className="w-50 text-end">
                            <a href="#" onClick={this.props.template} className="text-decoration-none" title="CSV Template">
                                <FontAwesomeIcon icon="file-csv" className="fs-5" />
                            </a>
                        </div>
                    </div>
                    <hr />
                    <div className="p-4 pb-1">
                        <CSVReader
                            cssClassName="csv-reader-input form-control bg-secondary"
                            // label="File upload"
                            // cssLabelClass="fs-5 pb-3 text-dark"
                            onFileLoaded={this.handleData}
                            onError={this.onError}
                            parserOptions={this.parseOptions}
                            inputId="Alex"
                            inputName="Arev"
                            inputStyle={{
                                color: '#444',
                                border: "solid 1px #ccc",
                                borderRadius: "4px",
                                lineHeight: "29px",
                                width: "100%"
                            }}
                        />
                    </div>
                    <SubmitButton />
                </div>
            </div>
        </ToastProvider>)
    }
}