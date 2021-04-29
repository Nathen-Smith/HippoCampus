import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
// import Form from 'react-bootstrap/Form'
import Box from '@material-ui/core/Box';
import '../App.css'

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Age : 0,
      ClassStanding : '',
      Location : '',
      Major : '',
      Minor : '',
      Bio : '',
      Statement : '',
      AvailableOnMonday: 0,
      AvailableOnTuesday: 0,
      AvailableOnWednesday: 0,
      AvailableOnThursday: 0,
      AvailableOnFriday: 0,
      AvailableOnSaturday: 0,
      AvailableOnSunday: 0,
      success: 0,
      userData : []
  }    

    // var data =  {
    //   "UserID": sessionStorage.getItem("UserID")
    // }

    // fetch('http://127.0.0.1:5000/getUserInfo', {
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   method: "POST",
    //   body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then((data) => {
    //   console.log(data)
    //   if (data !== "") {
    //       // this.setState({success:"t", userData: data})
    //   } else {
    //       // this.setState({success:"f"})
    //   }
    // })
    // console.log(this.state.userData)
    // if (this.state.success === 't'){
    //   this.setState({Age : this.state.userData[0][1]})
    //   this.setState({ClassStanding : this.state.userData[0][2]})
    //   this.setState({Location : this.state.userData[0][5]})
    //   this.setState({Major: this.state.userData[0][6]})
    //   this.setState({Minor: this.state.userData[0][7]})
    //   this.setState({Bio: this.state.userData[0][8]})
    //   this.setState({Statement: this.state.userData[0][9]})
    // }
    // else{
    //   console.log('haha loser')
    // }
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
    })
    
  }

  updateInfo = () => {
    // this.updateAvailability()
    this.updateUser()
  }

  render() {
    // console.log(this.state.id1)
    // console.log(this.state.id2)
    // console.log(this.state.id3)
    // console.log(this.state.id4)
    // console.log(this.state.id5)
    return (
      <div>
        <Box color="white" bgcolor="DarkOliveGreen" p={1}>
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
          <button onClick={this.updateUser}>Update User Info</button>
        </Box>
        <Box color="black" bgcolor="DarkKhaki" p={1}>
        <h3>Available on Monday</h3>
        <input
            type="text"
            onChange={this.changeMonday}
            value={this.state.AvailableOnMonday}
         />
        <h3>Available on Tuesday</h3>
        <input
            type="text"
            onChange={this.changeTuesday}
            value={this.state.AvailableOnTuesday}
         />
        <h3>Available on Wednesday</h3>
        <input
            type="text"
            onChange={this.changeWednesday}
            value={this.state.AvailableOnWednesday}
         />
        <h3>Available on Thursday</h3>
        <input
            type="text"
            onChange={this.changeThursday}
            value={this.state.AvailableOnThursday}
         />
        <h3>Available on Friday</h3>
        <input
            type="text"
            onChange={this.changeFriday}
            value={this.state.AvailableOnFriday}
         />
        <h3>Available on Saturday</h3>
        <input
            type="text"
            onChange={this.changeSaturday}
            value={this.state.AvailableOnSaturday}
         />
        <h3>Available on Sunday</h3>
        <input
            type="text"
            onChange={this.changeSunday}
            value={this.state.AvailableOnSunday}
         />
         <button onClick={this.updateAvailability}>Update Availability</button>
         </Box>  
     
      </div>

    )
  }
}

export default Edit;
