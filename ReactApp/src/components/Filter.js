import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import FormControl from '@material-ui/core/FormControl';
// import Form from 'react-bootstrap/Form'
import Box from '@material-ui/core/Box';
import '../App.css'

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        UserID: sessionStorage.getItem("UserID")
        }
    }

    onValueChange(event) {
        sessionStorage.setItem("CurrentFilter", event.target.value)
        window.location.reload()
        // this.setState({UserID: this.state.UserID})
        // console.log(this.state.UserID)
    }

    formSubmit(event) {
        event.preventDefault();
        console.log(sessionStorage.getItem("CurrentFilter"))
      }

    render () {
        return (
            <Box color="black" bgcolor="LightGreen" p={1}> 
                {/* <div onChange={this.onChangeValue}>          
                <h1>Filter Cards By</h1>
                    <input type="radio" value="Location" name="filter" checked={sessionStorage.getItem("CurrentFilter")==="Location"}/> Location
                    <input type="radio" value="Major" name="filter" checked={sessionStorage.getItem("CurrentFilter")==="Major"}/> Major
                    <input type="radio" value="Availability" name="filter" checked={sessionStorage.getItem("CurrentFilter")==="Availability"}/> Availability
                    <input type="radio" value="Class" name="filter" checked={sessionStorage.getItem("CurrentFilter")==="Class"}/> Class Standing
                    <input type="radio" value="NoFilter" name="filter" checked={sessionStorage.getItem("CurrentFilter")==="NoFilter"}/> No Filter           
                </div> */}
                <h1>Filter Cards By Your</h1>
                <form onSubmit={this.formSubmit}>
                <div className="radio">
                <label>
                    <input
                    type="radio"
                    value="Location"
                    checked={sessionStorage.getItem("CurrentFilter") === "Location"}
                    onChange={this.onValueChange}
                    />
                    Location
                </label>
                </div>
                <div className="radio">
                <label>
                    <input
                    type="radio"
                    value="Major"
                    checked={sessionStorage.getItem("CurrentFilter") === "Major"}
                    onChange={this.onValueChange}
                    />
                    Major
                </label>
                </div>
                <div className="radio">
                <label>
                    <input
                    type="radio"
                    value="Availability"
                    checked={sessionStorage.getItem("CurrentFilter") === "Availability"}
                    onChange={this.onValueChange}
                    />
                    Availability
                </label>
                </div>
                <div className="radio">
                <label>
                    <input
                    type="radio"
                    value="Class"
                    checked={sessionStorage.getItem("CurrentFilter") === "Class"}
                    onChange={this.onValueChange}
                    />
                    Class
                </label>
                </div>
                <div className="radio">
                <label>
                    <input
                    type="radio"
                    value="NoFilter"
                    checked={sessionStorage.getItem("CurrentFilter") === "NoFilter"}
                    onChange={this.onValueChange}
                    />
                    No Filter
                </label>
                </div>
                <div>
                Selected option is : {sessionStorage.getItem("CurrentFilter")}
                </div>
                <button className="btn btn-default" type="submit">
                Submit
                </button>
            </form>
            </Box>
        )
    }
}
export default Filter;