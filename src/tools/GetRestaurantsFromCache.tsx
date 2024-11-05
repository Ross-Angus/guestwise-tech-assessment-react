import type { Restaurant } from "../types/Restaurant";

// This checks to see if we need to fetch the list of
// restaurants from the server or if we can steal them
// from the local user's cache instead
export default function GetRestaurantsFromCache(hours: number): Restaurant[] {
  const cachedRestaurants: string | null =  localStorage?.getItem('restaurantList');
  const cachedRestaurantsAge: string | null  = localStorage?.getItem('restaurantListAge');
  if (cachedRestaurants && cachedRestaurantsAge) {
    const now: number = new Date().getTime();
    // The age of the cache, in hours
    const age = (now - +cachedRestaurantsAge) / (1000 * 60 * 60);
    // If the cache is young enough, return the data
    if (age < hours) return JSON.parse(cachedRestaurants) as Restaurant[];
  }
  return [];
};
