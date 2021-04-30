import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
// import Form from 'react-bootstrap/Form'
import '../App.css'

class Delete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id1: -1,
      id2: -1,
      id3: -1,
      id4: -1,
      id5: -1,
      userID: "",
      Skill: ""
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
      this.setState({userID: e.target.value})
  }
  changeSkill = (e) => {
    this.setState({Skill: e.target.value})
  }

  deleteLikes = () => {
    var data =  {
      "UserID": this.state.userID,
      "Skill": this.state.Skill
    }

    fetch('https://hippocampus-309101.uc.r.appspot.com/delete', {
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
      <div>
        <h1>Delete All Skills</h1>
        <h2>User ID</h2>
        <input
            type="text"
            onChange={this.changeUserID}
            value = {this.state.userID}
         />
         {/* <h2>Skill To Delete</h2>
        <input
            type="text"
            onChange={this.changeSkill}
            value = {this.state.Skill}
         /> */}
         <button onClick={this.deleteLikes}>Delete</button>
        
     
      </div>

    )
  }
}

export default Delete;
