import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
// import Form from 'react-bootstrap/Form'
import '../App.css'
// var perskill = []

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
      views.push(<li key={item.index}><button onClick={this.removeSkill.bind(null, item.index)}>Remove {item.text}</button></li>
      );
    }, this);
    return views;
  }

  removeSkill = (i) => {
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
      console.log(data)
      // window.location.reload()
      // if (data !== "") {
      //     this.setState({success:"t"})
      // } else {
      //     this.setState({success:"f"})
      // }
    })
    
  }
  

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
      <div>
        {/* this.searchLikes;
              <h3>Skill(s): {this.state.likesData.join(", ")}</h3> */}
        <h1>Edit Skills</h1>
         <button onClick={this.searchLikes}>Show Skills</button>
         {/* <text>{"\n"}</text> */}
         {this.state.success === "f" && <h2>User doesn't exist</h2>}
         {this.state.success ==="t" && 
            <div>
              {this.renderButtons(this.state.likesData.length, this.state.likesData)}
            </div>
         }
      </div>

    )
  }
}

export default SearchView;
