import React from "react";
import Filtering from "../components/Filtering"

export default function makeMatches() {
    return (
      <div className="match_tab text-center">
        <h3>Looking for your next study buddy?</h3>
        <Filtering></Filtering>
      </div>
    );
  }

// //const CardStack = () => {
// export default function CardStack() {
//     const CardInfo = [
//         {image: "https://www.pinclipart.com/picdir/middle/0-8587_cartoon-stack-of-books-free-image-clipart-stack.png", title: "First, Last Name", text: "~Bio~"}
//     ];

//     const renderCard = (card, index) => {
//         return (
//             <Card style={{ width: '18rem' }}>
//             <Card.Img variant="top" src="holder.js/100px180" src={card.image}/>
//             <Card.Body>
//                 <Card.Title>{card.title}</Card.Title>
//                 <Card.Text>{card.text}</Card.Text>
//                 <Button variant="danger">❤</Button>
//             </Card.Body>
//             </Card>
//         )
//     }

//     return (
//       <div className="cards_tab text-center">
//         {CardInfo.map(renderCard)}
//       </div>    
//     ); 
    
// }