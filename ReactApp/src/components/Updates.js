import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
// import Form from 'react-bootstrap/Form'
import '../App.css'

class Updates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // id1: -1,
      // id2: -1,
      // id3: -1,
      // id4: -1,
      // id5: -1,
      UserID: "",
      Skill: "",
      Rating: ""
    }
  }

  changeid1 = (e) => {
    this.setState({id1: e.target.value})
  }

  changeid2 = (e) => {
    this.setState({id2: e.target.value})
  }

  changeid3 = (e) => {
    this.setState({id3: e.target.value})
  }

  changeid4 = (e) => {
    this.setState({id4: e.target.value})
  }

  changeid5 = (e) => {
    this.setState({id5: e.target.value})
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

  updateLikes = () => {
    var data =  {
      "UserID": this.state.UserID,
      "Skill": this.state.Skill,
      "Rating": this.state.Rating,
      "Like3": this.state.id3,
      "Like4": this.state.id4,
      "Like5": this.state.id5
    }

    fetch('https://hippocampus-309101.uc.r.appspot.com/update', {
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
    console.log(this.state.UserID)
    console.log(this.state.Skill)
    console.log(this.state.Rating)
    // console.log(this.state.id4)
    // console.log(this.state.id5)
    return (
      <div>
        <h1>Update Likes</h1>
        <h2>User ID</h2>
        <input
            type="text"
            onChange={this.changeUserID}
            value = {this.state.UserID}
         />
        <h2>Update Skill</h2>
        <input
            type="text"
            onChange={this.changeSkill}
            value = {this.state.Skill}
         />
         <h2>Update Skill Rating</h2>
        <input
            type="text"
            onChange={this.changeRating}
            value = {this.state.Rating}
         />
         {/* <h2>Update ID3</h2>
        <input
            type="text"
            onChange={this.changeid3}
            value = {this.state.id3}
         />
         <h2>Update ID4</h2>
        <input
            type="text"
            onChange={this.changeid4}
            value = {this.state.id4}
         />
         <h2>Update ID5</h2>
        <input
            type="text"
            onChange={this.changeid5}
            value={this.state.id5}
         /> */}
         <button onClick={this.updateLikes}>Update Skill Rating</button>
        
     
      </div>

    )
  }
}

export default Updates;
