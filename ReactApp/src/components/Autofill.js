import React from 'react'
import Autosuggest from 'react-autosuggest'
import './Autofill.css'
import './Rating.css'
import {Button, Row, Col} from 'react-bootstrap'

const languages = [	
	{name: 'C#'},
	{name: 'C++'},
	{name: 'C'},
	{name: 'Algorithms'},
	{name: 'Analytical Skills'},
	{name: 'Big Data'},
	{name: 'Calculating'},
	{name: 'Compiling Statistics'},
	{name: 'Data Analytics'},
	{name: 'Data Mining'},
	{name: 'Database Design'},
	{name: 'Database Management'},
	{name: 'Documentation'},
	{name: 'Modeling'},
	{name: 'Modification'},
	{name: 'Needs Analysis'},
	{name: 'Quantitative Research'},
	{name: 'Quantitative Reports'},
	{name: 'Statistical Analysis'},
	{name: 'Applications'},
	{name: 'Certifications'},
	{name: 'Coding'},
	{name: 'Computing'},
	{name: 'Configuration'},
	{name: 'Customer Support'},
	{name: 'Debugging'},
	{name: 'Design'},
	{name: 'Development'},
	{name: 'Hardware'},
	{name: 'Implementation'},
	{name: 'Infrastructure'},
	{name: 'Languages'},
	{name: 'Maintenance'},
	{name: 'Network Architecture'},
	{name: 'Network Security'},
	{name: 'Networking'},
	{name: 'New Technologies'},
	{name: 'Operating Systems'},
	{name: 'Programming'},
	{name: 'Restoration'},
	{name: 'Security'},
	{name: 'Servers'},
	{name: 'Software'},
	{name: 'Solution Delivery'},
	{name: 'Storage'},
	{name: 'Structures'},
	{name: 'Systems Analysis'},
	{name: 'Technical Support'},
	{name: 'Technology'},
	{name: 'Testing'},
	{name: 'Tools'},
	{name: 'Training'},
	{name: 'Troubleshooting'},
	{name: 'Usability'},
	{name: 'Benchmarking'},
	{name: 'Budget Planning'},
	{name: 'Engineering'},
	{name: 'Fabrication'},
	{name: 'Following Specifications'},
	{name: 'Operations'},
	{name: 'Performance Review'},
	{name: 'Project Planning'},
	{name: 'Quality Assurance'},
	{name: 'Quality Control'},
	{name: 'Scheduling'},
	{name: 'Task Delegation'},
	{name: 'Task Management'},
	{name: 'Blogging'},
	{name: 'Digital Photography'},
	{name: 'Digital Media'},
	{name: 'Facebook'},
	{name: 'Instagram'},
	{name: 'Networking'},
	{name: 'Pinterest'},
	{name: 'SEO'},
	{name: 'Social Media Platforms'},
	{name: 'Twitter'},
	{name: 'Web Analytics'},
	{name: 'Client Relations'},
	{name: 'Email'},
	{name: 'Requirements Gathering'},
	{name: 'Research'},
	{name: 'Subject Matter Experts (SMEs)'},
	{name: 'Technical Documentation'},
	{name: 'Mathematics'},
	{name: 'Physics'},
	{name: 'Essay Writing'},
	{name: 'Calculus'},
	{name: 'Differential Equations'},
	{name: 'Graph Theory'},
	{name: 'Machine Learning'},
	{name: 'History'},
	{name: 'Political Science'},
	{name: 'Business'},
	{name: 'Agriculture'},
	{name: 'Blacksmithing'},
	{name: 'Soldering'},
	{name: 'Carpentry'},
	{name: 'Java'},
	{name: 'Python'},
	{name: 'Go'},
	{name: 'Rust'},
	{name: 'MySQL'},
	{name: 'SQL'},
	{name: 'PostGreSQL'},
	{name: 'MongoDB'},
	{name: 'Neo4j'},
	{name: 'React'},
	{name: 'Vue'},
	{name: 'CI/CD'},
	{name: 'NodeJS'},
	{name: 'JavaScript'},
	{name: 'R'},
	{name: 'Matlab'},
	{name: 'Creo'},
	{name: 'Algebra'},
	{name: 'Geometry'},
	{name: 'Addition'},
	{name: 'Multiplication'},
	{name: '2-digit Multiplication'},
	{name: '3-digit Multiplication'},
	{name: 'Music Production'},
	{name: 'Cooking'},
	{name: 'Fashion'},
	{name: 'Chemistry'},
	{name: 'Biology'},
	{name: 'Molecular & Cellular Biology'},
	{name: 'Economics'},
	{name: 'Thermal Physics'},
	{name: 'Quantum Physics'},
	{name: 'Electromagnetic Physics'},
	{name: 'Theoretical Physics'},
	{name: 'Astrophysics'},
	{name: 'Easter Egg Finding'},
];
  
//   https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); //without replacing, conflicts with RegExp can happen
  }
  
  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    
    if (escapedValue === '') {
      return [];
    }
  
    const regex = new RegExp('^' + escapedValue, 'i');
  
    return languages.filter(language => regex.test(language.name));
  }
  
  function getSuggestionValue(suggestion) {
    return suggestion.name;
  }
  
  function renderSuggestion(suggestion) {
    return (
      <span>{suggestion.name}</span>
    );
  }
  
  class Autofill extends React.Component {
    constructor() {
      super();
  
      this.state = {
        value: '',
        suggestions: [],
				UserID: sessionStorage.getItem("UserID"),
				// Skill: "",
				Rating: "5"
      };    
    }
  
    onChange = (event, { newValue, method }) => {
      this.setState({
        value: newValue
      });
    };
    
    onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: getSuggestions(value)
      });
    };
  
    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };

		changeRating = (e) => {
			this.setState({Rating: e.target.value})
		}

		insertLikes = () => {
			var data =  {
				"UserID": this.state.UserID,
				"Skill": this.state.value,
				"Rating": this.state.Rating
			}
			if (this.state.Skill !== null) {
			
	
				fetch('http://127.0.0.1:5000/create', {
					headers: {
						"Content-Type": "application/json"
					},
					method: "POST",
					body: JSON.stringify(data)
				})
				.then(response => response.text())
				.then((data) => {
					console.log(data)
					// this.setState({UserID: this.state.UserID})
				})
			}
			
		}
  
    render() {
      const { value, suggestions } = this.state;
      const inputProps = {
        placeholder: "(ex: 2-digit Multiplication)",
        value,
        onChange: this.onChange
      };
  
      return (
        <div class="container p-3 my-3 bg-light text-dark">
          <Row>
            <Col md={6}>
							<h2>Add skill</h2>  
              <div class="input-group mb-3">
                <div class="input-group-prepend">
									<Autosuggest 
										suggestions={suggestions}
										onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
										onSuggestionsClearRequested={this.onSuggestionsClearRequested}
										getSuggestionValue={getSuggestionValue}
										renderSuggestion={renderSuggestion}
										inputProps={inputProps} 
									/>
								</div>
                <div class="input-group-append">
                  <span 
										class="input-group-text" 
										id="basic-addon3" 
										style={{border: "1px solid #aaa"}}>
										Rating
									</span>
                  <select
                  	class="selectBox"
										value={this.state.Rating} 
										onChange={this.changeRating} 
										style={{
											borderRadius: "0px", 
											border: "1px solid #aaa", 
											borderLeft: "0px", 
											borderRight: "0px"
										}}
                  >
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>
                    <option value="None">None</option>
                  </select>
                  <Button variant="outline-primary" onClick={this.insertLikes}>Add</Button>
            		</div>
            	</div>
          	</Col>
          </Row>
				</div>
      );
    }
  }
  
export default Autofill;
  