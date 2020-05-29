import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function CardLink() {
  // const link = () => {
  //   return (

  //   );
  // };

  return (
    <Card style={{ width: "21rem" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Gin &amp; Juice</Card.Title>
        <Card.Text>
          Ethererum ERC-20 Collectible for all your sippin needs.
        </Card.Text>
        <Button variant="dark" href="http://52.53.173.93/">
          G&amp;J Page
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CardLink;
