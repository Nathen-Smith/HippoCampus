import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
// import Form from 'react-bootstrap/Form'
import '../App.css'

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        "Age" : -1,
        "ClassStanding" : '',
        "Location" : '',
        "Major" : '',
        "Minor" : '',
        "Bio" : '',
        "Statement" : '',
        "Available on Monday": -1,
        "Available on Tuesday": -1,
        "Available on Wednesday": -1,
        "Available on Thursday": -1,
        "Available on Friday": -1,
        "Available on Saturday": -1,
        "Available on Sunday": -1

    }
    
  }

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


  updateInfo = () => {
    var data =  {
        "Age" : -1,
        "ClassStanding" : '',
        "Location" : '',
        "Major" : '',
        "Minor" : '',
        "Bio" : '',
        "Statement" : '',
        "AvailableOnMonday": -1,
        "AvailableOnTuesday": -1,
        "AvailableOnWednesday": -1,
        "AvailableOnThursday": -1,
        "AvailableOnFriday": -1,
        "AvailableOnSaturday": -1,
        "AvailableOnSunday": -1
    }

    fetch('http://127.0.0.1:5000/update', {
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
    // console.log(this.state.id1)
    // console.log(this.state.id2)
    // console.log(this.state.id3)
    // console.log(this.state.id4)
    // console.log(this.state.id5)
    return (
      <div>
        <h1>Update Info</h1>
        <h2>Age</h2>
        <input
            type="text"
            onChange={this.changeAge}
            value = {this.state.Age}
         />
        <h2>Class Standing</h2>
        <input
            type="text"
            onChange={this.changeClassStanding}
            value = {this.state.ClassStanding}
         />
         <h2>Location</h2>
        <input
            type="text"
            onChange={this.changeLocation}
            value = {this.state.Location}
         />
         <h2>Major</h2>
        <input
            type="text"
            onChange={this.changeMajor}
            value = {this.state.Major}
         />
         <h2>Minor</h2>
        <input
            type="text"
            onChange={this.changeMinor}
            value = {this.state.Minor}
         />
         <h2>Bio</h2>
        <input
            type="text"
            onChange={this.changeBio}
            value={this.state.Bio}
         />
         <h2>Statement</h2>
        <input
            type="text"
            onChange={this.changeStatement}
            value={this.state.Statement}
         />
        <h2>Available on Monday</h2>
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
         />
         <button onClick={this.updateInfo}>Update Info</button>
        
     
      </div>

    )
  }
}

export default Edit;