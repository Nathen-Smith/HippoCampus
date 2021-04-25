import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
// import Form from 'react-bootstrap/Form'
import '../App.css'
// var perskill = []

class SearchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // userID: sessionStorage.getItem("UserID"),
      userID: 8,
      success: "",
      likesData: [],
      toRemove: "",
      editing: false
    }
    // this.renderButtons = this.renderButtons.bind(this);
  }
  // test = (val) => {
  //   console.log(val)
  // }
  renderButtons = (num_skills, data) => {
    const views = [];
    // const data_ = data;
    for (var i = 0; i < num_skills; i ++) {
      // views.push(<button>FUCK</button>)
      // views.push(<button style={{backgroundColor: 'lime'}}>Remove {data[i][0]}</button>)
      views.push(<button style={{backgroundColor: 'lime'}}onClick={this.removeSkill.bind(null, i)}key={i}>Remove {data[i][0]}</button>)
      // https://www.codeblocq.com/2015/12/Loops-and-callbacks-in-React/ BIND creates new function with global context
      // views.push(<button style={{backgroundColor: 'lime'}}onClick={this.removeSkill(data[i])}>Remove {data[i]}</button>)
      // views.push(<p>Update {data[i][0]}</p>)
      // views.push(<input
      //   type="text"
      // />)
      views.push(<br />)
      // onClick={}

    }
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
  // renderButtons = (data) => {
  //   const views = [];
  //   for (var i = 0; i < num_skills; i += 2) {
  //     views.push(<button key={this.state.likesData[i]} style={{backgroundColor: 'lightblue'}}>Find Skills</button>)

  //   }
  //   return views;
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
        {/* <h2>User ID</h2> */}
        {/* <input
            type="text"
            onChange={this.changeUserID}
            value = {this.state.userID}
         /> */}
         <button style={{backgroundColor: 'magenta'}}onClick={this.searchLikes}>Show Skills</button>
         {/* <text>{"\n"}</text> */}
         {this.state.success === "f" && <h2>User doesn't exist</h2>}
         {this.state.success ==="t" && 
            <div>
            {/* look into the map function in js*/}
            {/* <h3>UserID: {this.state.likesData[0][0]}</h3> */}
            {/* <h3>Skill(s): {this.state.likesData[].join(", ")}</h3> */}
            {/* <h3>Skills(s)</h3> */}
            {/* {perskill} */}


            {this.renderButtons(this.state.likesData.length, this.state.likesData)}
            {/* <button onClick={this.searchLikes}></button> */}

            {/* <h3>Like2: {this.state.likesData[0][2]}</h3>
            <h3>Like3: {this.state.likesData[0][3]}</h3>
            <h3>Like4: {this.state.likesData[0][4]}</h3>
            <h3>Like5: {this.state.likesData[0][5]}</h3> */}
            {/* {this.end} */}
            </div>
         }
                {/* {this.searchLikes} */}

      </div>

    )
  }
}

export default SearchView;
