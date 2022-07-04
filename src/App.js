import { Component } from "react";
import axios from 'axios';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null
    }
  }
  onChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    })
  }

  onClickHandler = (event) => {
    event.preventDefault();
    const data = new FormData();
    console.log(data);
    data.append('file', this.state.selectedFile);
    axios.post("http://localhost:3000", data, {
    })
    .then(res => {
      console.log(res.statusText);
    })
  }
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='offset-md-3 col-md-6'>

          <div className='form-group files'>
            
              <label>Upload your resume</label>
              <input type='file' name='file' onChange={this.onChangeHandler}/>
            
          </div>
          <button type='button' className='btn' onClick={this.onClickHandler}>Upload</button>
          </div>
        </div>
      </div>
    )    
  }
}

export default App;