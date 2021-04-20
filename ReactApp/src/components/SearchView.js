import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
// import Form from 'react-bootstrap/Form'
import '../App.css'

class SearchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "",
      success: "",
      likesData: [],
      editing: false,
    }
  }
  renderButtons = (num_skills) => {
    const views = [];
    for (var i = 0; i < num_skills; i++) {
      views.push(<button key={this.state.likesData[i]} style={{backgroundColor: 'lightblue'}}>Find Skills</button>)

    }
    return views;
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
  

  render() {
    return (
      <div>
        <h1>Search Skills</h1>
        <h2>User ID</h2>
        <input
            type="text"
            onChange={this.changeUserID}
            value = {this.state.userID}
         />
         <button style={{backgroundColor: 'lightblue'}}onClick={this.searchLikes}>Find Skills</button>
         {this.state.success === "f" && <h2>User doesn't exist</h2>}
         {this.state.success ==="t" && 
            <div>
            {/* look into the map function in js*/}
            {/* <h3>UserID: {this.state.likesData[0][0]}</h3> */}
            <h3>Skill(s): {this.state.likesData.join(", ")}</h3>
            {this.renderButtons(this.state.likesData.length)}
            <button onClick={this.searchLikes}></button>
            {/* <h3>Like2: {this.state.likesData[0][2]}</h3>
            <h3>Like3: {this.state.likesData[0][3]}</h3>
            <h3>Like4: {this.state.likesData[0][4]}</h3>
            <h3>Like5: {this.state.likesData[0][5]}</h3> */}
            </div>
         }
     
      </div>

    )
  }
}

export default SearchView;
