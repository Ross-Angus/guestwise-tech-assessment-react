import React, { useState, useEffect } from "react";
import { ListGroup, Container } from "react-bootstrap";
import { getRestaurants } from "../services/api";

type Restaurant = {
  id: number;
  name: string;
  shortDescription: string;
};

type RestaurantListProps = {
  onRestaurantSelect: (id: number) => void;
};

const RestaurantList: React.FC<RestaurantListProps> = ({
  onRestaurantSelect,
}) => {
  // Populating the restaurant list with holding text
  const [ restaurants, setRestaurants ] = useState([{
    id: 1,
    name: "Velvet & Vine",
    shortDescription: "A fine dining experience with a modern twist.",
    cuisine: "French",
    rating: 4.7,
    details: {
      id: 1,
      address: "123 Fine St, London",
      openingHours: {
        weekday: "12:00 PM - 10:00 PM",
        weekend: "11:00 AM - 11:00 PM",
      },
      reviewScore: 4.7,
      contactEmail: "info@gourmetkitchen.com",
    },
  }]);

  useEffect(() => {
    const restaurantPromise = getRestaurants();

    restaurantPromise.then((restaurantArray: []) => {
      setRestaurants(restaurantArray);
    });
  }, []);


  return (
    <Container>
      <h2>Restaurants</h2>
      <ListGroup>
        {restaurants.map((restaurant) => (
          <ListGroup.Item
            key={restaurant.id}
            action
            onClick={() => onRestaurantSelect(restaurant.id)}
          >
            <h5>{restaurant.name}</h5>
            <p>{restaurant.shortDescription}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default RestaurantList;
