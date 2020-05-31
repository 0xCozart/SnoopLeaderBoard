import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../App.css";

function CardLink() {
  return (
    <div className="link-card">
      <Card bg="dark" text="white" style={{ width: "21rem" }}>
        <Card.Img variant="top" src="/ethereum-icon.png" />
        <Card.Body>
          <Card.Title>Gin &amp; Juice</Card.Title>
          <Card.Text>
            Ethererum ERC-20 Collectible for all your sippin needs.
          </Card.Text>
          <Button
            variant="light"
            onClick={() => window.open("http://52.53.173.93/")}
          >
            Visit G&amp;J
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

function DbCard() {
  return (
    <div className="db-card">
      <Card bg="dark" text="white" style={{ width: "21rem" }}>
        <Card.Img variant="top" src="/nodes.gif" alt="nodes" />
        <Card.Body>
          <Card.Title>Adventure Token Database</Card.Title>
          <Card.Text>
            Monitor transactions involving Adventure Corp. sponsored tokens.
          </Card.Text>
          <Button
            variant="light"
            onClick={() => window.open("http://13.56.163.182:8000/#/")}
          >
            Visit Database
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export { CardLink, DbCard };
