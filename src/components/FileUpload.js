import React from "react";
import axios from "axios";

class FileUpload extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedFile: "",
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    submit() {
        const data = new FormData();
        data.append("file", this.state.selectedFile);
        axios.post("http://localhost:8080/upload/", data)
        .then(res => {
            console.warn(res);
        })
        .catch(error => console.log(error));
    }

    render() {
        return(
            <div>
                <input type="file" onChange={this.handleInputChange}/>
                <button onClick={() => this.submit()}>Upload</button>
            </div>
        )
    }
}

export default FileUpload;

// import React, {useState} from 'react';
// import axios from 'axios';

// const App = () => {
//     const [file, setFile] = useState();
//     const [fileName, setFileName] = useState("");
    
//     const saveFile = (e) => {
//         setFile(e.target.files[0]);
//         setFileName(e.target.files[0].name);
//     }

//     const uploadFile = async (e) => {
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("fileName", fileName);
//         try {
//             const res = await axios.post(
//                 "http://localhost:3000/upload",
//                 formData
//             )
//             console.log(res);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     return (
//         <div>
//             <input type='file' onChange={saveFile}></input>
//             <button onClick={uploadFile}>Upload</button>
//         </div>
//     )
// }

// export default App;

