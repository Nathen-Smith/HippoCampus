import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
// import Form from 'react-bootstrap/Form'
// import Box from '@material-ui/core/Box';
import {Button, Col, Row} from 'react-bootstrap'
// import Checkbox from "../components/Checkbox";
import '../App.css'

// const OPTIONS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // checkboxes: OPTIONS.reduce(
      //   (options, option) => ({
      //     ...options,
      //     [option]: false
      //   }),
      // ),
      Age : sessionStorage.getItem('Age'),
      ClassStanding : sessionStorage.getItem('ClassStanding'),
      Location : sessionStorage.getItem('Location'),
      Major : sessionStorage.getItem('Major'),
      Minor : sessionStorage.getItem('Minor'),
      Bio : sessionStorage.getItem('Bio'),
      Statement : sessionStorage.getItem('Statement'),
      AvailableOnMonday: sessionStorage.getItem('AvailableOnMonday'),
      AvailableOnTuesday: sessionStorage.getItem('AvailableOnTuesday'),
      AvailableOnWednesday: sessionStorage.getItem('AvailableOnWednesday'),
      AvailableOnThursday: sessionStorage.getItem('AvailableOnThursday'),
      AvailableOnFriday: sessionStorage.getItem('AvailableOnFriday'),
      AvailableOnSaturday: sessionStorage.getItem('AvailableOnSaturday'),
      AvailableOnSunday: sessionStorage.getItem('AvailableOnSunday')
    }
  }
  ////////////////////////////////////////////////////////
  // handleCheckboxChange = changeEvent => {
  //   const { name } = changeEvent.target;

  //   this.setState(prevState => ({
  //     checkboxes: {
  //       ...prevState.checkboxes,
  //       [name]: !prevState.checkboxes[name]
  //     }
  //   }));
  // };

  // handleFormSubmit = formSubmitEvent => {
  //   formSubmitEvent.preventDefault();
  //   var selections = []
  //   Object.keys(this.state.checkboxes)
  //     .filter(checkbox => this.state.checkboxes[checkbox])
  //     .forEach(checkbox => {
  //       if (this.state.checkboxes[checkbox] === true) {
  //         console.log(checkbox, "is selected.");
  //         selections.push(checkbox)
  //       }
  //     });

  //     var data = {
  //       "UserID": sessionStorage.getItem("UserID"),
  //        "Preferences": selections
  //     }
  //     fetch('http://127.0.0.1:5000/updatePrefs', {
  //       headers: {
  //       "Content-Type": "application/json"
  //       },
  //       method: "POST",
  //       body: JSON.stringify(data)
  //     })
  //     .then(response => response.json())
  //     .then((data) => {
  //       console.log(data)
  //       if (data !== "") {
  //         // this.setState({success:"t", likesData: data})
  //       } else {
  //         // this.setState({success:"f"})
  //       }
  //     })
      
  // };

  // createCheckbox = option => (
  //   <Checkbox
  //     label={option}
  //     isSelected={this.state.checkboxes[option]}
  //     onCheckboxChange={this.handleCheckboxChange}
  //     key={option}
  //   />
  // );

  // createCheckboxes = () => OPTIONS.map(this.createCheckbox);
  ////////////////////////////////////////////////////////////

  changeAge = (e) => {
    this.setState({Age: e.target.value})
  }

  changeClassStanding = (e) => {
    this.setState({ClassStanding: e.target.value})
  }

  changeLocation = (e) => {
    this.setState({Location: e.target.value})
  }

  changeMajor = (e) => {
    this.setState({Major: e.target.value})
  }

  changeMinor = (e) => {
    this.setState({Minor: e.target.value})
  }

  changeBio = (e) => {
      this.setState({Bio: e.target.value})
  }

  changeStatement = (e) => {
    this.setState({Statement: e.target.value})
  }

  changeMonday = (e) => {
    this.setState({AvailableOnMonday: e.target.value})
  }

  changeTuesday = (e) => {
    this.setState({AvailableOnTuesday: e.target.value})
  }

  changeWednesday = (e) => {
    this.setState({AvailableOnWednesday: e.target.value})
  }

  changeThursday = (e) => {
    this.setState({AvailableOnThursday: e.target.value})
  }

  changeFriday = (e) => {
    this.setState({AvailableOnFriday: e.target.value})
  }

  changeSaturday = (e) => {
    this.setState({AvailableOnSaturday: e.target.value})
  }

  changeSunday = (e) => {
    this.setState({AvailableOnSunday: e.target.value})
  }

  updateAvailability = () => {
    var data =  {
      UserID: sessionStorage.getItem("UserID"),
      Monday : this.state.AvailableOnMonday,
      Tuesday : this.state.AvailableOnTuesday,
      Wednesday : this.state.AvailableOnWednesday,
      Thursday : this.state.AvailableOnThursday,
      Friday : this.state.AvailableOnFriday,
      Saturday : this.state.AvailableOnSaturday,
      Sunday : this.state.AvailableOnSunday
    }
    // console.log(data)

    fetch('http://127.0.0.1:5000/updateAvailability', {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then((data) => {
      console.log(data)
      var data_arr = JSON.parse(data)
      // console.log(data_arr)
      
      sessionStorage.setItem('AvailableOnMonday', data_arr[0][1])
      sessionStorage.setItem('AvailableOnTuesday', data_arr[0][2])
      sessionStorage.setItem('AvailableOnWednesday', data_arr[0][3])
      sessionStorage.setItem('AvailableOnThursday', data_arr[0][4])
      sessionStorage.setItem('AvailableOnFriday', data_arr[0][5])
      sessionStorage.setItem('AvailableOnSaturday', data_arr[0][6])
      sessionStorage.setItem('AvailableOnSunday', data_arr[0][7])
    })
    
  }


  updateUser = () => {
    var name = sessionStorage.getItem("name").split(" ")
    var data =  {
        UserID: sessionStorage.getItem("UserID"),
        Age : this.state.Age,
        ClassStanding : this.state.ClassStanding,
        FirstName : name[0],
        LastName : name[1],
        Location : this.state.Location,
        Major : this.state.Major,
        Minor : this.state.Minor,
        Bio : this.state.Bio,
        Statement : this.state.Statement
    }

    fetch('http://127.0.0.1:5000/updateUser', {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then((data) => {
      console.log(data)
      var data_arr = JSON.parse(data)
      sessionStorage.setItem('Age', data_arr[0][1])
      sessionStorage.setItem('ClassStanding', data_arr[0][2])
      sessionStorage.setItem('Location', data_arr[0][5])
      sessionStorage.setItem('Major', data_arr[0][6])
      sessionStorage.setItem('Minor', data_arr[0][7])
      sessionStorage.setItem('Bio', data_arr[0][8])
      sessionStorage.setItem('Statement', data_arr[0][9])
    })
    
  }

  // var name = sessionStorage.getItem("name")

  render() {
    // console.log(this.state.id1)
    // console.log(this.state.id2)
    // console.log(this.state.id3)
    // console.log(this.state.id4)
    // console.log(this.state.id5)
    return (
      <div class="container p-3 my-3 bg-light text-dark">
        <h1>{sessionStorage.getItem("name")}</h1>
          <Row>
            <Col md={3} style={{marginRight:"20px", marginLeft:"15px"}}>
              <Row style={{width:"280px"}}>
                <h6>Major</h6>
              </Row>
              <Row style={{width:"280px"}}>
                <input 
                  type="text" 
                  class="form-control" 
                  onChange={this.changeMajor}
                  value={this.state.Major}
                  style={{border: "1px solid #aaa", width:"280px", marginBottom:"10px"}}
                />
              </Row>
            </Col>
            <Col md={3}>
              <Row style={{width:"280px"}}>
                <h6>Minor</h6>
              </Row>
              <Row style={{width:"280px"}}>
                  <input 
                    type="text" 
                    class="form-control" 
                    onChange={this.changeMinor}
                    value = {this.state.Minor}
                    style={{border: "1px solid #aaa", width:"280px", marginBottom:"10px"}}
                  />
              </Row>
            </Col>
          </Row>
          <h6>Class Standing</h6>
          <Row>
            <Col md={3}>
              {/* <div class="input-group mb-3"> */}
                <input 
                  type="text" 
                  class="form-control" 
                  onChange={this.changeClassStanding}
                  value = {this.state.ClassStanding}
                  style={{border: "1px solid #aaa", width:"280px", marginBottom:"10px"}}
                />
              {/* </div> */}
            </Col>
          </Row>
          <h6>Location</h6>
          <Row>
            <Col md={3}>
                <input 
                  type="text" 
                  class="form-control" 
                  onChange={this.changeLocation}
                  value = {this.state.Location}
                  style={{border: "1px solid #aaa", width:"280px", marginBottom:"10px"}}
                />
            </Col>
          </Row>
          <h6>Bio</h6>
          <Row>
            <Col>
                <textarea
                  type="text" 
                  class="form-control" 
                  onChange={this.changeBio}
                  value = {this.state.Bio}
                  style={{border: "1px solid #aaa", marginBottom:"10px"}}
                />
            </Col>
          </Row>
          <h6>Statement</h6>
          <Row>
            <Col>
              <div class="input-group mb-3">
                <input
                  type="text" 
                  class="form-control" 
                  onChange={this.changeStatement}
                  value = {this.state.Statement}
                  style={{border: "1px solid #aaa"}}
                />
              </div>
            </Col>
          </Row>
          <Button onClick={this.updateUser}>Save</Button>
          {/*old code//////////////////////////////////////////////////}
          {/* <h6>Location</h6>
          <Row>
            <Col md={2}>
              <div class="input-group mb-3">
                <input 
                  type="text" 
                  class="form-control" 
                  onChange={this.changeLocation}
                  value = {this.state.Location}
                />
              </div>
            </Col>
          </Row> */}
          {/* <h6>Major</h6> */}
          
          {/* <h6>Minor</h6>
          <Row>
            <Col md={2}>
              <div class="input-group mb-3">
                <input 
                  type="text" 
                  class="form-control" 
                  onChange={this.changeMinor}
                  value = {this.state.Minor}
                />
              </div>
            </Col>
          </Row> */}
          {/* <input
              type="text"
              onChange={this.changeAge}
              value = {this.state.Age}
          /> */}
          {/* <h2>Class Standing</h2>
          <input
              type="text"
              
          /> */}
          {/* <h2>Location</h2>
          <input
              type="text"
              
          /> */}
          {/* <h2>Major</h2>
          <input
              type="text"
              onChange={this.changeMajor}
              value = {this.state.Major}
          /> */}
          {/* <h2>Minor</h2>
          <input
              type="text"
              onChange={this.changeMinor}
              value = {this.state.Minor}
          /> */}
          {/* <h2>Bio</h2>
          <input
              type="text"
              onChange={this.changeBio}
              value={this.state.Bio}
          /> */}
          {/* <h2>Statement</h2>
          <input
              type="text"
              onChange={this.changeStatement}
              value={this.state.Statement}
          /> */}
        {/* </Box> */}
        {/* <Box color="black" bgcolor="DarkKhaki" p={1}> */}
        {/* </Col>
        <Col> */}
        {/* <h1>Update Your Availability</h1>
        <form onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}

              {/* <div className="form-group mt-2"> */}
                {/* <button
                  type="button"
                  className="btn btn-outline-primary mr-2"
                  onClick={this.selectAll}
                >
                  Select All
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary mr-2"
                  onClick={this.deselectAll}
                >
                  Deselect All
                </button> */}
                {/* <button type="submit" className="btn btn-primary" >
                  Save
                </button> */}
              {/* </div> */}
            {/* </form> */}
        {/* <h2>Available on Monday</h2>
        <input
            type="text"
            onChange={this.changeMonday}
            value={this.state.AvailableOnMonday}
         />
        <h2>Available on Tuesday</h2>
        <input
            type="text"
            onChange={this.changeTuesday}
            value={this.state.AvailableOnTuesday}
         />
        <h2>Available on Wednesday</h2>
        <input
            type="text"
            onChange={this.changeWednesday}
            value={this.state.AvailableOnWednesday}
         />
        <h2>Available on Thursday</h2>
        <input
            type="text"
            onChange={this.changeThursday}
            value={this.state.AvailableOnThursday}
         />
        <h2>Available on Friday</h2>
        <input
            type="text"
            onChange={this.changeFriday}
            value={this.state.AvailableOnFriday}
         />
        <h2>Available on Saturday</h2>
        <input
            type="text"
            onChange={this.changeSaturday}
            value={this.state.AvailableOnSaturday}
         />
        <h2>Available on Sunday</h2>
        <input
            type="text"
            onChange={this.changeSunday}
            value={this.state.AvailableOnSunday}
         /> */}
         {/* <button onClick={this.updateAvailability}>Update Availability</button> */}
         {/* </Box>   */}
         {/* </Col>
         </Row> */}
     
      {/* </div> */}
      
      </div>
    )
  }
}

export default Edit;
