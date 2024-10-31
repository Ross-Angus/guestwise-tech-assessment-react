import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { getRestaurantDetails } from "../services/api";

type RestaurantDetailsProps = {
  restaurantId: number;
};

type RestaurantDetailsData = {
  address: string;
  openingHours: {
    weekday: string;
    weekend: string;
  };
  reviewScore: number;
  contactEmail: string;
};

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({
  restaurantId,
}) => {

  const [ details, setDetails ] = useState({
    address: "123 Fine St, London",
    openingHours: {
      weekday: "12:00 PM - 10:00 PM",
      weekend: "11:00 AM - 11:00 PM",
    },
    reviewScore: 4.7,
    contactEmail: "info@velvetandvine.co.uk",
  });

  useEffect(() => {
    const restaurantIDPromise = getRestaurantDetails(restaurantId);

    restaurantIDPromise.then((restaurantDetails) => {
      setDetails(restaurantDetails.details);
    });
  }, [restaurantId]);

  if (!restaurantId) return null;

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Restaurant Details</Card.Title>
          <Card.Text>Address: {details.address}</Card.Text>
          <Card.Text>Review Score: {details.reviewScore}</Card.Text>
          <Card.Text>Contact: {details.contactEmail}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RestaurantDetails;
