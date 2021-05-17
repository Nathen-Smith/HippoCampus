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
      if (data !== "") {
          this.setState({success:"t", likesData: data})
      } else {
          this.setState({success:"f"})
      }
    })
    
  }

  generateCards (num_cards, data) {
    var views = [], cards = []
    for (var i = 0; i < num_cards; i++) {
      if (data[i][0] != null && data[i][1] != null) {
        cards.push({index: i, text: data[i]})
      }
    }
    cards.forEach(function(item) {
      views.push(
      <div key={item.index} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        {/* <br> */}
        {/* <Button className={styles.thick}
          variant="outline-danger"
          size="sm"
          onClick={this.removeSkill.bind(null, item.index)}>
          Remove
          
        </Button>{" "} */}
        {/* <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="https://www.pinclipart.com/picdir/middle/0-8587_cartoon-stack-of-books-free-image-clipart-stack.png"/>
        <Card.Body>
          <Card.Title>{this.state.likesData[item.index][0]+ ' '+ this.state.likesData[item.index][1]}</Card.Title>
          <Card.Text>
            {this.state.likesData[0][2]}
            <br></br>
            {this.state.likesData[0][3]}
          </Card.Text>
          <Button variant="danger">❤</Button>
        </Card.Body>
        </Card> */}

        <Card style={{width: "400px"}}>
        <Card.Header>{this.state.likesData[item.index][3]}</Card.Header>
        <Card.Body>
          <Card.Title>{this.state.likesData[item.index][0]+ ' '+ this.state.likesData[item.index][1]}</Card.Title>
          <Card.Text>
          {this.state.likesData[0][2]}
          </Card.Text>
          <Button variant="danger" onClick={this.likedUser.bind(null, item.index)}>❤</Button>
          {/* <Button variant="danger">❤</Button> */}
        </Card.Body>
      </Card>     
{/* 
        <span className={styles.normal}>
        {item.text}
        </span> */}
        {/* </br> */}
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
    return (
      <div>
        {/*<h1>Filter</h1>*/}
          <button onClick={this.searchLikes}>Find!</button>
          {this.state.success === "f" && <h2>User doesn't exist</h2>}
          {this.state.success ==="t" && 
            <div>
              <br/>
                {this.generateCards(this.state.likesData.length, this.state.likesData)}
              <br/>
            </div>
          }
     
      </div>

    )
  }
}



export default Filtering;
