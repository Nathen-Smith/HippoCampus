 import React, { Component } from "react";
import Checkbox from "./Checkbox";

const OPTIONS = ["Major", "Class Standing", "Similar Skills"];

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxes: OPTIONS.reduce(
        (options, option) => ({
          ...options,
          [option]: false
        }),
      )
    }
  }
  

  selectAllCheckboxes = isSelected => {
    Object.keys(this.state.checkboxes).forEach(checkbox => {
      // BONUS: Can you explain why we pass updater function to setState instead of an object?
      this.setState(prevState => ({
        checkboxes: {
          ...prevState.checkboxes,
          [checkbox]: isSelected
        }
      }));
    });
  };

  selectAll = () => this.selectAllCheckboxes(true);

  deselectAll = () => this.selectAllCheckboxes(false);

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    var selections = []
    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
        if (this.state.checkboxes[checkbox] === true) {
          console.log(checkbox, "is selected.");
          selections.push(checkbox)
        }
      });

      var data = {
        "UserID": sessionStorage.getItem("UserID"),
         "Preferences": selections
      }
      fetch('http://127.0.0.1:5000/updatePrefs', {
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
          // this.setState({success:"t", likesData: data})
        } else {
          // this.setState({success:"f"})
        }
      })
      
  };

  createCheckbox = option => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );

  createCheckboxes = () => OPTIONS.map(this.createCheckbox);

  render() {
    return (    
      // <div className="container">
      <div class="container p-3 my-3 bg-light text-dark">
       
        {/* <div className="row mt-5"> */}
          {/* <div className="col-sm-12"> */}
            <h2>Filter Cards By</h2>
            <form onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}

              <div className="form-group mt-2">
                <button
                  type="button"
                  className="btn btn-outline-primary mr-2"
                  onClick={this.selectAll}
                >
                  Select All
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary mr-2"
                  onClick={this.deselectAll}
                >
                  Deselect All
                </button>
                <button type="submit" className="btn btn-primary" >
                  Save
                </button>
              </div>
            </form>
          {/* </div> */}
        {/* </div> */}
      </div>
    );
  }
}

export default Filter;