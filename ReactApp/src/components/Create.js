import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
// import Form from 'react-bootstrap/Form'
import {Button, Container} from 'react-bootstrap'
import Box from '@material-ui/core/Box';
import '../App.css'

class Create extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      UserID: sessionStorage.getItem("UserID"),
      Skill: "",
        Rating: "",
      }
    }
    handleChange = (e) => {
      this.setState({Rating: e.target.value})
    }
  
    changeUserID = (e) => {
      this.setState({UserID: e.target.value})
    }
  
    changeSkill = (e) => {
      this.setState({Skill: e.target.value})
    }
  
    changeRating = (e) => {
      this.setState({Rating: e.target.value})
    }
  
    changeid4 = (e) => {
      this.setState({id4: e.target.value})
    }
  
    changeid5 = (e) => {
      this.setState({id5: e.target.value})
    }
  
    insertLikes = () => {
      var data =  {
        "UserID": this.state.UserID,
        "Skill": this.state.Skill,
        "Rating": this.state.Rating
      }
  
      fetch('http://127.0.0.1:5000/create', {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data)
      })
      .then(response => response.text())
      .then((data) => {
        console.log(data)
      })
      
    }
  
    render() {
      return (
          <div class="container p-3 my-3 bg-light text-dark">

            <h2>Insert Skill</h2>  

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon3">What skill?</span>
              </div>
              <input 
                type="text" 
                class="form-control" 
                placeholder="(ex: 2-digit Multiplication)" 
                aria-describedby="basic-addon3"
                onChange={this.changeSkill}
                value = {this.state.Skill}
              />
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon3">What rating?</span>
              </div>
              <select 
                class="input-group-mb-3"
                value={this.state.selectRating} 
                onChange={this.changeRating} 
              >
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>
            
              <Button variant="primary" onClick={this.insertLikes}>Insert Skill</Button>

            </div>
          </div>

      )
    }
  }
  
  export default Create;
  