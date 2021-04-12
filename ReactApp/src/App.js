import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
// import Form from 'react-bootstrap/Form'
import './App.css'
import Create from './components/Create.js'
import Updates from './components/Updates.js';
import Delete from './components/Delete.js'
import SearchView from './components/SearchView.js'
import AdvancedQuery from './components/AdvancedQuery.js'

class App extends React.Component {
  render() {
    return (
      <div>
        <Create></Create><br />
        <Updates></Updates><br />
        <Delete></Delete><br />
        <SearchView></SearchView><br />
        <AdvancedQuery></AdvancedQuery><br />
      </div>

    )
  }
}

export default App;
