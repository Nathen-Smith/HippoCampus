import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
// import Form from 'react-bootstrap/Form'
import {Button, Container, Row, Col, InputGroup, FormControl, Select} from 'react-bootstrap'
import Box from '@material-ui/core/Box';
import '../App.css'

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UserID: sessionStorage.getItem("UserID"),
      Skill: "",
      Rating: "5"
    }
  }

  changeSkill = (e) => {
    this.setState({Skill: e.target.value})
  }

  changeRating = (e) => {
    this.setState({Rating: e.target.value})
  }

  insertLikes = () => {
    var data =  {
      "UserID": this.state.UserID,
      "Skill": this.state.Skill,
      "Rating": this.state.Rating
    }
    if (this.state.Skill !== null) {
    

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
        // this.setState({UserID: this.state.UserID})
      })
    }
    
  }

  render() {
    return (
        <div class="container p-3 my-3 bg-light text-dark">
          <Row>
            <Col md={6}>
              <h2>Add skill</h2>  

              <div class="input-group mb-3">
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="(ex: 2-digit Multiplication)" 
                  aria-describedby="basic-addon3"
                  style={{ width:"100px" }}
                  onChange={this.changeSkill}
                  value = {this.state.Skill}
                />
            
                <div class="input-group-append">
                  <span class="input-group-text" id="basic-addon3">Rating</span>
                  <select
                  class="form-select" 
                  value={this.state.Rating} 
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
            </Col>
          </Row>
        </div>
    )
  }
}

export default Create;
  