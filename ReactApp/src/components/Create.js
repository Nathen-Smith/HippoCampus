import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
// import Form from 'react-bootstrap/Form'
import Box from '@material-ui/core/Box';
import '../App.css'

class Create extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      UserID: sessionStorage.getItem("UserID"),
      Skill: "",
        Rating: ""
      }
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
      // console.log(this.state.UserID)
      // console.log(this.state.Skill)
      // console.log(this.state.Rating)
      // console.log(this.state.id4)
      // console.log(this.state.id5)
      return (
        <div>
          <Box color="black" bgcolor="DarkSeaGreen" p={1}> 
          <h1>Insert Skill</h1>  

          {/* <h2>What ID?</h2>  
          <input
              type="text"
              onChange={this.changeUserID}
              value = {this.state.UserID}
           />      */}
          <h2>What Skill?</h2>
          <input
            type="text"
            onChange={this.changeSkill}
            value = {this.state.Skill}
          />
          <h2>What Rating?</h2>

          <input
            type="text"
            onChange={this.changeRating}
            value = {this.state.Rating}
          />
           <button onClick={this.insertLikes}>Insert Skill</button>
          
        </Box>
        </div>
  
      )
    }
  }
  
  export default Create;
  