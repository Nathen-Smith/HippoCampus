import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import {Button} from 'react-bootstrap'
// import Form from 'react-bootstrap/Form'
import '../App.css'

class Create extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userID: sessionStorage.getItem("UserID"),
        matchesData: [],
        success: ""
      }
    }

    removePerson = (i) => {
      if(window.confirm("Are you sure you want to delete this person?")) {
        // console.log(this.state.matchesData)
      var data =  {
        "UserID": this.state.userID,
        "personUserID": this.state.matchesData[i][4],
      }

      fetch('http://127.0.0.1:5000/deletePerson', {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data)
      })
      .then(response => response.text())
      .then((data) => {
        // console.log(data)
        this.searchMatches()
      })

    }}
    searchMatches = () => {
      var data =  {
        "UserID": this.state.userID,
        "FirstName": "",
        "LastName": "",
      }
      // console.log(data)
      fetch('http://127.0.0.1:5000/matches', {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then((data) => {
        // console.log(data)
        if (data.length !== 0) {
          this.setState({success:"t", matchesData : data})
        } else {
          alert("No favorites...yet ;)")
          this.setState({success: "f"})
        }
      })
    }
    removeAndSearch = (i) => {
      this.removePerson(i)
    }
    render() {
      return (

        <div>
        <Button variant="outline-primary" onClick={this.searchMatches}> Load Favorites </Button>
        {this.state.success === "t" &&
          <div>
            <table class="table">
            <thead>
            <tr>
                <th class="match-name">Name</th>
                <th class="match-major">Major</th>
                <th class="match-class-standing">Class Standing</th>
                <th class="match-remove">Remove</th>
            </tr>
            </thead>

            {this.state.matchesData.slice(0, this.state.matchesData.length).map((item, index) => {
            return (
              <tr>
                <td>{item[0] + " " + item[1]}</td>
                <td>{item[2]}</td>
                <td>{item[3]}</td>
                <Button variant="outline-danger"onClick={this.removeAndSearch.bind(null,index)}> Remove</Button>
              </tr>
            );
          })}
            </table>
            </div>
    }
          </div>
      )
    }
  }

  export default Create;
