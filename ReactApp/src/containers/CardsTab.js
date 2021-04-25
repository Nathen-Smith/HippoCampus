import React from "react";
import Matches from "../components/Matches"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

// export default function makeMatches() {
//     return (
//       <div className="match_tab text-center">
//         <h3>Find Study Buddies!</h3>
//       </div>
//     );
//   }

//const CardStack = () => {
export default function makeMatches() {
    const CardInfo = [
        {image: "https://www.pinclipart.com/picdir/middle/0-8587_cartoon-stack-of-books-free-image-clipart-stack.png", title: "First and Last Name", text: "~Bio~"}
    ];

    const renderCard = (card, index) => {
        return (
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" src={card.image}/>
            <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.text}</Card.Text>
                <Button variant="success">❤</Button>
            </Card.Body>
            </Card>
        )
    }

    return (
      <div className="cards_tab text-center">
        {CardInfo.map(renderCard)}
      </div>    
    ); 
    
}