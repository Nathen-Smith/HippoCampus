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
      likesData: []
    }
  }

  changeUserID = (e) => {
      this.setState({userID: e.target.value})
  }

  searchLikes = () => {
    var data =  {
      "UserID": this.state.userID, 
      "Filter": sessionStorage.getItem("CurrentFilter")
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
      cards.push({index: i, text: data[i]})
    }
    cards.forEach(function(item) {
      views.push(
      <li key={item.index}>
        {/* <Button className={styles.thick}
          variant="outline-danger"
          size="sm"
          onClick={this.removeSkill.bind(null, item.index)}>
          Remove
          
        </Button>{" "} */}
        <Card style={{ width: '18rem' }}>
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
        </Card>     
{/* 
        <span className={styles.normal}>
        {item.text}
        </span> */}
      </li>
      );
    }, this);
    return views;
  }

  render() {
    return (
      <div>
        {/*<h1>Filter</h1>*/}
         <button onClick={this.searchLikes}>Find!</button>
         {this.state.success === "f" && <h2>User doesn't exist</h2>}
         {this.state.success ==="t" && 

            // <div>
            // {/* look into the map function in js*/}
            //     <h2>Users in the CS Major:</h2>

            //     {/*NEED TO PUT THIS IN A FOR LOOP*/}

            //     <Card style={{ width: '18rem' }}>
            //       <Card.Img variant="top" src="https://www.pinclipart.com/picdir/middle/0-8587_cartoon-stack-of-books-free-image-clipart-stack.png"/>
            //       <Card.Body>
            //         <Card.Title>{this.state.likesData[0][0]+ ' '+ this.state.likesData[0][1]}</Card.Title>
            //         <Card.Text>
            //           {this.state.likesData[0][2]}
            //           <br></br>
            //           {this.state.likesData[0][3]}
            //         </Card.Text>
            //         <Button variant="danger">❤</Button>
            //       </Card.Body>
            //     </Card>     


            // </div>
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
