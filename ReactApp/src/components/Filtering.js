import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import styles from './SearchView.module.css';


class Filtering extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: sessionStorage.getItem("UserID"),
      success: "",
      likesData: []
    }
  }


// //create card stack, cycle through and assign values 
//   renderCards = (num_cards, data) => {
//     var views = [], cards = []
//     for (var i = 0; i < num_cards; i++) {
//       cards.push({index: i, text: data[i]})
//     }
//     cards.forEach(function(item) {
//       views.push(
//       <li key={item.index}>
//                 <Card style={{ width: '18rem' }}>
//                   <Card.Img variant="top" src="https://www.pinclipart.com/picdir/middle/0-8587_cartoon-stack-of-books-free-image-clipart-stack.png"/>
//                   <Card.Body>
//                     <Card.Title>{item.text}</Card.Title>
//                     <Card.Text>
//                       {item.text}
//                       <br></br>
//                       {item.text}
//                     </Card.Text>
//                       <Button variant="danger" 
//                               onClick={this.likedUser.bind(null, item.index)}>
//                                 ❤
//                       </Button>
//                   </Card.Body>
//                 </Card>     

//         <span className={styles.normal}>
//         {item.text}
//         </span>
//       </li>
//       );
//     }, this);
//     return views;
//   }

  //function if you like a user
  //prompt an alert and connect to backend where user will be added to likes
  // likedUser = (i) => {
  //   alert("You have liked a User (>‿◠)✌")
  //   var data =  {
  //     "UserID": this.state.userID,
  //     "LikedID": this.state.likesData[i][0] //dont know if this is the ID of liked person
  //   }
  //   fetch('http://127.0.0.1:5000/addLike', {
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     method: "POST",
  //     body: JSON.stringify(data)
  //   })
  //   .then(response => response.json())
  //   .then((data) => {
  //     var data2 = {"UserID": this.state.userID}
  //     // console.log(data)
  //     fetch('http://127.0.0.1:5000/search', {
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     method: "POST",
  //     body: JSON.stringify(data2)
  //   })
  //   .then(response => response.json())
  //   .then((data) => {
  //     console.log(data)
  //     if (data !== "") {
  //         this.setState({success:"t", likesData: data})
  //     } else {
  //         this.setState({success:"f"})
  //     }
  //   })
  //   })
    
  // }

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

  render() {
    return (
      <div>
        {/*<h1>Filter</h1>*/}
         <button onClick={this.searchLikes}>Find!</button>
         {this.state.success === "f" && <h2>User doesn't exist</h2>}
         {this.state.success ==="t" && 

            <div>
            {/* look into the map function in js*/}
                <h2>Users in the CS Major:</h2>

                {/*NEED TO PUT THIS IN A FOR LOOP*/}

                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="https://www.pinclipart.com/picdir/middle/0-8587_cartoon-stack-of-books-free-image-clipart-stack.png"/>
                  <Card.Body>
                    <Card.Title>{this.state.likesData[0][0]+ ' '+ this.state.likesData[0][1]}</Card.Title>
                    <Card.Text>
                      {this.state.likesData[0][2]}
                      <br></br>
                      {this.state.likesData[0][3]}
                    </Card.Text>
                    <Button variant="danger">❤</Button>
                  </Card.Body>
                </Card>     


            </div>
         }
     
      </div>

    )
  }
}

// render() {
//   return (
//     <div>
//       {/* this.searchLikes;
//             <h3>Skill(s): {this.state.likesData.join(", ")}</h3> */}
//       <h1>Find partners!</h1>

//        <Button variant="outline-success" onClick={this.searchLikes}>Show Users</Button>
//        {/* <text>{"\n"}</text> */}
//        {this.state.success === "f" && <h2>User doesn't exist</h2>}
//        {this.state.success ==="t" && 
//           <div>
//             <br/>
//             {this.renderCards(this.state.likesData.length, this.state.likesData)}
//             <br/>
//           </div>
          
//        }
//     </div>

//   )
// }
// }



export default Filtering;
