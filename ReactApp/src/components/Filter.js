import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
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
}