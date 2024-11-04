import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

type RestaurantSortProps = {
  sort: Function;
};

const RestaurantSort: React.FC<RestaurantSortProps> = ({
  sort,
}) => {
  const [ sortId, setSortId ] = useState('');
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const btn = event.target as HTMLButtonElement;
    const type: string = btn.innerText;
    setSortId(type);
    sort(type);
  };

  return (
    <>
      <Row>
        <Col>
          <fieldset>
            <legend className="h5">Sort by name:</legend>
            <p className="btn-group" role="group" aria-label="Sort by name">
              <button type="button" className={`btn btn-${sortId === 'A-Z' ? '' : 'outline-'}primary`} onClick={handleClick}>A-Z</button>
              <button type="button" className={`btn btn-${sortId === 'Z-A' ? '' : 'outline-'}primary`} onClick={handleClick}>Z-A</button>
            </p>
          </fieldset>
        </Col>
        <Col className="col-auto">
          <fieldset>
            <legend className="h5">Sort by rating:</legend>
            <p className="btn-group" role="group" aria-label="Sort by rating">
            <button type="button" className={`btn btn-${sortId === 'High to low' ? '' : 'outline-'}primary`} onClick={handleClick}>High to low</button>
            <button type="button" className={`btn btn-${sortId === 'Low to high' ? '' : 'outline-'}primary`} onClick={handleClick}>Low to high</button>
            </p>
          </fieldset>
        </Col>
      </Row>
    </>
  )
};

export default RestaurantSort;
