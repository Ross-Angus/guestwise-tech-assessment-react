import React, { useState } from "react";
import { Container } from "react-bootstrap";

type BookingData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
}

const BookTable: React.FC = ({}) => {
  // Today's date, converted to ISO string (YYYYMMDD), then converted
  // to a string
  const nowISO = new Date().toISOString().split('T')[0];
  const nowString = `${nowISO}`;

  // These names match those on the input elements on the form
  // for reasons which will become clear inside `handleChange()`
  const [bookingData, setBookingData]: [BookingData, Function] = useState({
    name: '',
    email: '',
    phone: '+44',
    date: nowString,
    time: '18:00',
    guests: 2
  });

  // Handles a change to any input field and attempts to add the data to `bookingData`
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name && value) {
      setBookingData({
        ...bookingData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) throw new Error("Booking failed");

      console.log("Booking successful");
    } catch (err) {
      console.log(err);
    } finally {
      console.log("Completed request");
    }
  };

  return (
    <Container>
      <h2>Book a Table</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={bookingData.name} onChange={handleChange}/>
        <br />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={bookingData.email} onChange={handleChange}/>
        <br />
        <label htmlFor="phone">Phone</label>
        <input type="tel" id="phone" name="phone" value={bookingData.phone} onChange={handleChange}/>
        <br />
        <label htmlFor="date">Date</label>
        <input type="date" id="date" name="date" value={bookingData.date} onChange={handleChange}/>
        <br />
        <label htmlFor="time">Time</label>
        <input type="time" id="time" name="time" value={bookingData.time} onChange={handleChange}/>
        <br />
        <label htmlFor="guests">Guests</label>
        <input type="number" id="guests" name="guests" value={bookingData.guests} onChange={handleChange}/>
        <br />
        <button type="submit">Book</button>
      </form>
    </Container>
  );
};

export default BookTable;
