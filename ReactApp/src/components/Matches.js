import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
// import Form from 'react-bootstrap/Form'
import '../App.css'

class Create extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        matchesData: [],
        success: ""
      }
    }


    searchMatches = () => {
      var data =  {
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

        if (data !== "") {
          this.setState({success:"t", matchesData : data})
        } else {
          this.setState({success: "f"})
        }
      })
    }

    render() {
      console.log(this.state.matchesData[0])
      return (
        <div>
        <button onClick={this.searchMatches}> load matches </button>
        <element onLoad={this.searchMatches}> </element>
        {this.state.success === "t" &&
          <div>
            <table class="table">
            <thead>
            <tr>

                <th class="match-name">Name</th>
                <th class="match-major">Major</th>
                <th class="match-minor">Class Standing</th>
                <th class="match-remove">Remove</th>
            </tr>
            </thead>
            <tr>

              <th> {this.state.matchesData[0][0] + " " + this.state.matchesData[0][1]} </th>
              <th> {this.state.matchesData[0][2]} </th>
              <th> {this.state.matchesData[0][3]} </th>
              <button> Remove Person </button>
            </tr>
            <tr>

              <th> {this.state.matchesData[1][0] + " " + this.state.matchesData[1][1]} </th>
              <th> {this.state.matchesData[1][2]} </th>
              <th> {this.state.matchesData[0][3]} </th>
              <button> Remove Person </button>
            </tr>
            <tr>

              <th> {this.state.matchesData[2][0] + " " + this.state.matchesData[2][1]} </th>
              <th> {this.state.matchesData[2][2]} </th>
              <th> {this.state.matchesData[0][3]} </th>
              <button> Remove Person </button>
            </tr>
            <tr>

              <th> {this.state.matchesData[3][0] + " " + this.state.matchesData[3][1]} </th>
              <th> {this.state.matchesData[3][2]} </th>
              <th> {this.state.matchesData[0][3]} </th>
              <button> Remove Person </button>
            </tr>
            <tr>

              <th> {this.state.matchesData[4][0] + " " + this.state.matchesData[4][1]} </th>
              <th> {this.state.matchesData[4][2]} </th>
              <th> {this.state.matchesData[0][3]} </th>
              <button> Remove Person </button>
            </tr>
            </table>
            </div>
          }
          </div>
      )
    }
  }

  export default Create;
