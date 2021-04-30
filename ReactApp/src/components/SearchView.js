import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
// import Form from 'react-bootstrap/Form'
import '../App.css'
import {Button} from 'react-bootstrap'
import Box from '@material-ui/core/Box';
import styles from './SearchView.module.css';
// import { Link } from 'react-router-dom'

class SearchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: sessionStorage.getItem("UserID"),
      // userID: 4,
      success: "",
      likesData: [],
      toRemove: "",
      editing: false
    }
  }

  renderButtons = (num_skills, data) => {
    var views = [], buttons = []
    for (var i = 0; i < num_skills; i++) {
      buttons.push({index: i, text: data[i]})
    }
    buttons.forEach(function(item) {
      views.push(
      <li key={item.index}>
        <Button className={styles.thick}
          variant="outline-danger"
          size="sm"
          onClick={this.removeSkill.bind(null, item.index)}>
          Remove
        </Button>{" "}

        <span className={styles.normal}>
        {item.text}
        </span>
      </li>
      );
    }, this);
    return views;
  }

  removeSkill = (i) => {
    if(window.confirm("Are you sure you want to delete this skill?")) {
    var data =  {
      "UserID": this.state.userID,
      "Skill": this.state.likesData[i][0]
    }

    fetch('http://127.0.0.1:5000/deleteSkill', {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then((data) => {
      var data2 = {"UserID": this.state.userID}
      // console.log(data)
      fetch('http://127.0.0.1:5000/search', {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data2)
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      if (data !== "") {
          this.setState({success:"t", likesData: data})
      } else {
          this.setState({success:"f"})
      }
    })
    })

  }}


  changeUserID = (e) => {
      this.setState({userID: e.target.value})
  }


  searchLikes = () => {
    var data =  {
      "UserID": this.state.userID
    }

    fetch('http://127.0.0.1:5000/search', {
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
          this.setState({success:"t", likesData: data})
      } else {
          this.setState({success:"f"})
      }
    })

  }
  // end = () => {
  //   this.setState({success:"f"})
  // }


  render() {
    // for (var i = 0; i < this.state.likesData.length; i++  ) {
    //   perskill.push(<button>PLS</button>)
    // }
    return (
      <div className="row mt-5">
        <Box color="black" bgcolor="DarkSeaGreen" p={1}>
        {/* this.searchLikes;
              <h3>Skill(s): {this.state.likesData.join(", ")}</h3> */}
        <h1>Edit Skills</h1>
        {/* <Link to="/editskills">
            <Button>
                  Click Me!
            </Button>
        </Link> */}
         <Button variant="secondary" onClick={this.searchLikes}>Show Skills</Button>
         {/* <text>{"\n"}</text> */}
         {this.state.success === "f" && <h2>User doesn't exist</h2>}
         {this.state.success ==="t" &&
            <div>
              <br/>
              {this.renderButtons(this.state.likesData.length, this.state.likesData)}
              <br/>
            </div>

         }
         </Box>
      </div>

    )
  }
}

export default SearchView;
