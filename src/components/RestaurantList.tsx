import React, { useState, useEffect } from "react";
import { ListGroup, Container } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
import type { Restaurant } from "../types/Restaurant";
import { getRestaurants } from "../services/api";
import RestaurantFilter from "./RestaurantFilter";
import RestaurantSort from "./RestaurantSort";
import { CompareNamesAZ, CompareNamesZA, CompareRateHiLo, CompareRateLoHi } from "../tools/Comparisons";
import GetRestaurantsFromCache from "../tools/GetRestaurantsFromCache";

type RestaurantListProps = {
  onRestaurantSelect: (id: number) => void;
};

const RestaurantList: React.FC<RestaurantListProps> = ({
  onRestaurantSelect,
}) => {
  // The original full list of restaurants
  const [ restaurants, setRestaurants ] = useState<Restaurant[]>([{
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

  // As above, but the filtered version
  const [ filteredRestaurants, setFilteredRestaurants ] = useState<Restaurant[]>(restaurants);
  const [userMessage, setUserMessage] = useState('We\'re loading a list of restaurants for you right now.');

  useEffect(() => {
    const timer = setTimeout(() => setUserMessage('The remote server is being a bit slow, but we\'re still trying to load your restaurants.'), 3000);
    // Call the restaurant list from the cache and set the maximum
    // age to 100 hours
    const cachedRestaurants = GetRestaurantsFromCache(100);

    // We do not have any cached restaurants (or the cache is too old)
    if (!cachedRestaurants.length) {
      const restaurantPromise = getRestaurants();

      restaurantPromise.then((restaurantArray: []) => {
        clearTimeout(timer);
        setUserMessage('');
        setRestaurants(restaurantArray);
        setFilteredRestaurants(restaurantArray);
        // Set up local storage cache
        localStorage.setItem("restaurantList", JSON.stringify(restaurantArray));
        localStorage.setItem("restaurantListAge", '' + new Date().getTime());
      })
      .catch(() => {
        clearTimeout(timer);
        setUserMessage('I\'m afraid the remote server isn\'t responding.');
      });
    } else {
      clearTimeout(timer);
      setUserMessage('');
      setRestaurants(cachedRestaurants);
      setFilteredRestaurants(cachedRestaurants);
    }
  }, []);

  const handleFilterText = (filterText: string) => {
    // If the search is empty, show all restaurants
    if (filterText === '') {
      setFilteredRestaurants(restaurants);
    } else {
      setFilteredRestaurants(filteredRestaurants.filter(restaurant => restaurant.name.toLowerCase().includes(filterText.toLowerCase())));
    }
  };

  // Calling sorting functions for restaurant list
  const handleSort = (sortBy: string) => {
    switch (sortBy) {
      case 'A-Z':
        filteredRestaurants.sort(CompareNamesAZ);
        setFilteredRestaurants([...filteredRestaurants]); // Trigger a re-render
        break;
      case 'Z-A':
        filteredRestaurants.sort(CompareNamesZA);
        setFilteredRestaurants([...filteredRestaurants]);
        break;
      case 'High to low':
        filteredRestaurants.sort(CompareRateHiLo);
        setFilteredRestaurants([...filteredRestaurants]);
        break;
      case 'Low to high':
        filteredRestaurants.sort(CompareRateLoHi);
        setFilteredRestaurants([...filteredRestaurants]);
        break;
    }
  };

  return (
    <Container>
      <h2>Restaurants</h2>
      {userMessage !== '' && <Alert variant="info">{userMessage}</Alert>}
      <RestaurantFilter filter={handleFilterText}/>
      <RestaurantSort sort={handleSort}/>
      <ListGroup>
        {filteredRestaurants.map((restaurant) => (
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
