import React, {Fragment, useState} from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from "axios";
import * as XLSX from "xlsx";

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const [fileData, setFileData] = useState([]);

    const onChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);

        const promise = new Promise((resolve, reject) => {
            const file = e.target.files[0];
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, {type: 'buffer'});
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws, {header: 1});
                resolve(data);
                setFileData([...data]);
            }

            fileReader.onerror = (err) => {
                reject(err);
            }
        })

        promise.then((data) => {
            // console.log(data);
            // console.log(fileData);
        })


        // const file = e.target.files[0];
        // const reader = new FileReader();

        // reader.onload = (evt) => {
        //     const bstr = evt.target.result;
        //     const wb = XLSX.read(bstr, {type: 'binary'});
        //     const wsname = wb.SheetNames[0];
        //     const ws = wb.Sheets[wsname];
        //     const data = XLSX.utils.sheet_to_csv(ws, {header: 1});
        //     console.log(data);
        // }

        // reader.readAsBinaryString(file);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post('http://localhost:8080/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
                     // Clear progress bar after 10 seconds
                    setTimeout(() => setUploadPercentage(0), 10000);
                }
            });                
          const {fileName, filePath} = res.data;

          setUploadedFile({fileName, filePath});
          setMessage('File Uploaded');
        } catch(err) {
            if (err.response.status === 500) {
                setMessage('There was a problem with the server');
            } else {
                setMessage(err.response.data.msg);
            }
        }
    }
    
    return (
        <Fragment>
        {message ? <Message msg={message} /> : null}
            <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <input type="file" className="custom-file-input" id="customFile" onChange={onChange}/>
                    <label className='custom-file-label' htmlFor="customFile">{fileName}</label>
                </div>
                <Progress percentage={uploadPercentage}/>
                <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4"/>
            </form>
            {/* <div>{fileData.map(item => {
                if (item.length !== 0) {
                    return console.log(item[2])
                }                
            })}</div> */}
        </Fragment>
    )
}

export default FileUpload
// import React from "react";
// import axios from "axios";

// class FileUpload extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             selectedFile: "",
//         }

//         this.handleInputChange = this.handleInputChange.bind(this);
//     }

//     handleInputChange(event) {
//         this.setState({
//             selectedFile: event.target.files[0]
//         })
//     }

//     submit() {
//         const data = new FormData();
//         data.append("file", this.state.selectedFile);
//         axios.post("http://localhost:8080/upload/", data)
//         .then(res => {
//             console.warn(res);
//         })
//         .catch(error => console.log(error));
//     }

//     render() {
//         return(
//             <div>
//                 <input type="file" onChange={this.handleInputChange}/>
//                 <button onClick={() => this.submit()}>Upload</button>
//             </div>
//         )
//     }
// }

// export default FileUpload;

