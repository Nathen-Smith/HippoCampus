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
        UserID: sessionStorage.getItem("UserID"),
        MajorFilter: ''
        }
    }
    render () {
        return (
            <div>
            <h1>Filter By</h1>
            <input type="radio" value="Location" name="filter" /> Location
            <input type="radio" value="Major" name="filter" /> Major
            <input type="radio" value="Availability" name="filter" /> Availability
            <input type="radio" value="Class Standing" name="filter" /> Class Standing
          </div>
        )
    }
}
export default Filter;