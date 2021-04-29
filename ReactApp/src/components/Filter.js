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

    onChangeValue(event) {
        sessionStorage.setItem("CurrentFilter", event.target.value)
    }

    render () {
        return (
            <Box color="black" bgcolor="LightGreen" p={1}> 
                <div onChange={this.onChangeValue}>          
                <h1>Filter Cards By</h1>
                    <input type="radio" value="Location" name="filter" checked={sessionStorage.getItem("CurrentFilter")==="Location"}/> Location
                    <input type="radio" value="Major" name="filter" checked={sessionStorage.getItem("CurrentFilter")==="Major"}/> Major
                    <input type="radio" value="Availability" name="filter" checked={sessionStorage.getItem("CurrentFilter")==="Availability"}/> Availability
                    <input type="radio" value="Class" name="filter" checked={sessionStorage.getItem("CurrentFilter")==="Class"}/> Class Standing
                    <input type="radio" value="NoFilter" name="filter" checked={sessionStorage.getItem("CurrentFilter")==="NoFilter"}/> No Filter           
                </div>
            </Box>
        )
    }
}
export default Filter;