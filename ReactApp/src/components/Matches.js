import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
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
        console.log(data)
      })

      // fetch('http://127.0.0.1:5000/deletePerson', {
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   method: "POST",
      //   body: JSON.stringify(data)
      // })
      // .then(response => response.json())
      // .then((data) => {
      //   var data2 = {"UserID": this.state.userID}
      //   // console.log(data)
      //   fetch('http://127.0.0.1:5000/search', {
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   method: "POST",
      //   body: JSON.stringify(data2)
      // })
      // .then(response => response.json())
      // .then((data) => {
      //   console.log(data)
      //   if (data !== "") {
      //     // i thin kthis will cause a problem w matchesData being rewritten idk
      //       this.setState({success:"t", matchesData: data})
      //   } else {
      //       this.setState({success:"f"})
      //   }
      // })
      // })

    }}
    searchMatches = () => {
      var data =  {
        "UserID": this.state.userID,
        "FirstName": "",
        "LastName": "",
      }
      console.log(data)
      fetch('http://127.0.0.1:5000/matches', {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        if (data !== "") {
          this.setState({success:"t", matchesData : data})
        } else {
          this.setState({success: "f"})
        }
      })
    }

    // deleteAndSearch = (i) => {
    //   this.removePerson.bind(null, i),
    //   this.searchMatches;
    // }
    removeAndSearch = (i) => {
      this.removePerson(i)
      this.searchMatches()
      this.setState({success:"f"})
      window.location.reload()
      this.setState({success:"t"})
    }
    render() {
      return (

        <div>
        <button onClick={this.searchMatches}> Load Favorites </button>
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
              <button onClick={this.removeAndSearch.bind(null,index)}> Remove Person </button>
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
