import React, { useState } from "react";

type RestaurantFilterProps = {
  filter: Function;
};

const RestaurantFilter: React.FC<RestaurantFilterProps> = ({
  filter,
}) => {
  const [ filterText, setFilterText ] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredString = event.target.value;
    setFilterText(enteredString);
    filter(enteredString);
  };

  return (
    <p>
      <label htmlFor="filter" className="form-label">Filter list by name</label>
      <input type="text" className="form-control" id="filter" onChange={handleChange} value={filterText}/>
    </p>
  )
};

export default RestaurantFilter;
