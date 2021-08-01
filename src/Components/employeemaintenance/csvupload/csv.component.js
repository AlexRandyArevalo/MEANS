import React, { useState } from 'react'
import CSVReader from 'react-csv-reader'

function UploadCsv() {
    // Upload Multiple Employees    
    const parseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header =>
            header
                .toLowerCase()
                .replace(/\W/g, '_')
    }

    // Handle CSV Data On Upload
    const [csvData, setCsvData] = useState([]);
    const handleData = (data, info) => {
        setCsvData(data)
    }
    const onError = (err) => {
        console.log(err)
    }

    // Save CSV Data to DB
    const SaveToDB = () => {
        console.log(csvData)
    }
    return (<div className="col-md-3 upload-employees">
        <div className="shadow-sm p-4 mb-5 bg-body rounded h-75">
            <CSVReader
                className=""
                cssClassName="csv-reader-input form-control"
                label="File Upload"
                cssLabelClass="fs-5 pb-3"
                onFileLoaded={handleData}
                onError={onError}
                parserOptions={parseOptions}
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
            <div className="mt-4">
                <button type="button" className="btn_ btn-purple w-100" onClick={SaveToDB}>Submit</button>
            </div>
        </div>
    </div>)
}

export default UploadCsv;