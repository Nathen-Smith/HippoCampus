import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class Filtering extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: sessionStorage.getItem("UserID"),
      success: "",
      likesData: [],
      userTopSkills: [],
      curr_idx: 0
    }
  }

  changeUserID = (e) => {
      this.setState({userID: e.target.value})
  }

  searchLikes = () => {
    var data =  {
      "UserID": this.state.userID
    }

    fetch('http://127.0.0.1:5000/filter', {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        if (data.length !== 0) {
          this.setState({success:"t", likesData: data[0], userTopSkills: data[1]})
        } else {
          alert("No matches :( \nSelect preferences in the Edit Profile tab")
          this.setState({success:"f"})
        }
      })
    }

  generateCards (num_cards, data) {
    console.log(data)
    var views = [], cards = []
    for (var i = 0; i < num_cards; i++) {
      if (data[i][0] != null && data[i][1] != null) {
        cards.push({index: i, text: data[i]})
        // DO NOT FETCH INSIDE FOR LOOP
        // why? for loop can iterate quicker than the backend operation
        // var skills =  {"UserID": data[i][5]}
        // //find top three skills for UserID (data[i][5])
        // fetch('http://127.0.0.1:5000/topSkillFinder', {
        //   headers: {
        //     "Content-Type": "application/json"
        //   },
        //   method: "POST",
        //   body: JSON.stringify(skills)
        // })
        // .then(response => response.json())
        // .then((top_skills_data) => {
        //   top_skills.push(top_skills_data)
        //   console.log(top_skills_data)
        // })
      }
    }
    
    cards.forEach(function(item) {
      views.push(
      <div key={item.index} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Card style={{width: "400px"}}>
        <Card.Header>{this.state.likesData[item.index][3]}</Card.Header>
        <Card.Body>
          <Card.Title>{this.state.likesData[item.index][0]+ ' '+ this.state.likesData[item.index][1]}</Card.Title>
          <Card.Text>
          {this.state.likesData[item.index][2]}
          </Card.Text>
          <Card.Text>
            Skills: {this.state.userTopSkills[item.index].join(", ")}
          </Card.Text>
          <Button variant="danger" onClick={this.likedUser.bind(null, item.index)}>❤</Button>
          {/* <Button variant="danger">❤</Button> */}
        </Card.Body>
      </Card>     
      </div>

      );
    }, this);
    return views[this.state.curr_idx];
  }
  
  likedUser = (i) => {
    alert("You have liked a User (>‿◠)✌")
    var data =  {
      "UserID": this.state.userID,
      "LikedID": this.state.likesData[i][5] 
    }
    fetch('http://127.0.0.1:5000/addLike', {
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
          this.setState({success:"t"})
          if (this.state.curr_idx >= this.state.likesData.length) {
            this.setState({curr_idx: 0})
            alert("Add more to your preferences!")
            window.location.reload()
          } else {
            this.setState({curr_idx: this.state.curr_idx + 1})
          }
      } else {
          this.setState({success:"f"})
      }
    })
    })
    
  }

  render() {
    if (this.state.success === "") {
      return (
        <div>
            <Button variant="outline-primary" onClick={this.searchLikes}>View matches</Button>
        </div>
      )
    } else if (this.state.success === "t") {
      return (
        <div>
          <br/>
          {this.generateCards(this.state.likesData.length, this.state.likesData)}
        </div>
      )
    } else if (this.state.success === "f") {
      return (
        <div>
          <h1>No matches found :(</h1>
        </div>
      )
    }
  }
}



export default Filtering;
