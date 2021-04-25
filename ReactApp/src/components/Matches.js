import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Form from 'react-bootstrap/Form'
import '../App.css'

class Create extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        // id1: "", //age
        // id2: "", //class
        // id3: "", //fname
        // id4: "", //lname
        // id5: "", //location
        // id6: "", //major
        // id7: "", //minor
        // id8: "", //bio
        // id9: "" // statement
      }
    }

    // changeid1 = (e) => {
    //   this.setState({id1: e.target.value})
    // }
    //
    // changeid2 = (e) => {
    //   this.setState({id2: e.target.value})
    // }
    //
    // changeid3 = (e) => {
    //   this.setState({id3: e.target.value})
    // }
    //
    // changeid4 = (e) => {
    //   this.setState({id4: e.target.value})
    // }
    //
    // changeid5 = (e) => {
    //   this.setState({id5: e.target.value})
    // }
    //
    // changeid6 = (e) => {
    //   this.setState({id6: e.target.value})
    // }
    //
    // changeid7 = (e) => {
    //   this.setState({id7: e.target.value})
    // }
    //
    // changeid8 = (e) => {
    //   this.setState({id8: e.target.value})
    // }
    //
    // changeid9 = (e) => {
    //   this.setState({id9: e.target.value})
    // }

    insertLikes = () => {
      var data =  {
        "Age": this.state.id1,
        "ClassStanding": this.state.id2,
        "FirstName": this.state.id3,
        "LastName": this.state.id4,
        "Location": this.state.id5,
        "Major": this.state.id6,
        "Minor": this.state.id7,
        "Bio": this.state.id8,
        "Statement": this.state.id9,
      }

      fetch('http://127.0.0.1:5000/matches', {
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
      // console.log(this.state.id6)
      // console.log(this.state.id7)
      // console.log(this.state.id8)
      // console.log(this.state.id9)
      return (
        // <div>
        //   <h2>Insert Age</h2>
        //   <input
        //       type="text"
        //       onChange={this.changeid1}
        //       value = {this.state.id1}
        //    />
        //    <h2>Insert Class Standing</h2>
        //   <input
        //       type="text"
        //       onChange={this.changeid2}
        //       value = {this.state.id2}
        //    />
        //    <h2>Insert First Name</h2>
        //   <input
        //       type="text"
        //       onChange={this.changeid3}
        //       value = {this.state.id3}
        //    />
        //    <h2>Insert Last Name</h2>
        //   <input
        //       type="text"
        //       onChange={this.changeid4}
        //       value = {this.state.id4}
        //    />
        //    <h2>Insert Location</h2>
        //   <input
        //       type="text"
        //       onChange={this.changeid5}
        //       value={this.state.id5}
        //    />
        //    <h2>Insert Major</h2>
        //   <input
        //       type="text"
        //       onChange={this.changeid6}
        //       value = {this.state.id6}
        //    />
        //    <h2>Insert Minor</h2>
        //   <input
        //       type="text"
        //       onChange={this.changeid7}
        //       value = {this.state.id7}
        //    />
        //    <h2>Insert Bio</h2>
        //   <input
        //       type="text"
        //       onChange={this.changeid8}
        //       value = {this.state.id8}
        //    />
        //    <h2>Insert Statement</h2>
        //   <input
        //       type="text"
        //       onChange={this.changeid9}
        //       value = {this.state.id9}
        //    />
        //    <button onClick={this.insertLikes}>Insert User</button>
        //
        //
        // </div>
        <div>
        <table class="table">
        <thead>
        <tr>
            <th class="match-number">#</th>
            <th class="match-name">Name</th>
            <th class="match-major">Major</th>
            <th class="match-minor">Minor</th>
            <th class="match-remove">Remove</th>
        </tr>
        </thead>
        <tr>
        <th> hi </th>
        </tr>

        </table>
        </div>
      )
    }
  }

  export default Create;
