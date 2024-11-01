import React, { useState } from "react";
import { Container } from "react-bootstrap";
import NormaliseTime from "../tools/NormaliseTime";
import type { BookingData, Errors } from "../types/Bookings";

const BookTable: React.FC = ({}) => {
  // Today's date, converted to ISO string (YYYYMMDD), then converted
  // to a string
  const now = new Date();
  const nowISO = now.toISOString().split('T')[0];
  const nowString = `${nowISO}`;
  // For use in form validation
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

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

  // Holding error messages to pass onto the user
  const [errors, setErrors]: [Errors, Function] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: ''
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

  // Validates the contents of `bookingData`, updates the `errors` object
  // and returns a valid boolean
  const isFormValid = (): boolean => {
    let formValid = true;

    // Validate name
    if (bookingData.name.length < 2) {
      setErrors((prev: Errors) => ({
        ...prev,
        "name": "You must provide a name"
      }));
      formValid = false;
    } else {
      setErrors((prev: Errors) => ({
        ...prev,
        "name": ""
      }));
    }

    // Validate email
    if (bookingData.email.indexOf('@') === -1 || bookingData.email.indexOf('.') === -1) {
      setErrors((prev: Errors) => ({
        ...prev,
        "email": "Please provide a valid email address"
      }));
      formValid = false;
    } else {
      setErrors((prev: Errors) => ({
        ...prev,
        "email": ""
      }));
    }

    // Validate phone (accounting for a booking by the police - "+44999")
    if (bookingData.phone.length < 6) {
      setErrors((prev: Errors) => ({
        ...prev,
        "phone": "Please provide a valid telephone number"
      }));
      formValid = false;
    } else {
      setErrors((prev: Errors) => ({
        ...prev,
        "phone": ""
      }));
    }

    // Validate date
    if (bookingData.date < nowISO) {
      setErrors((prev: Errors) => ({
        ...prev,
        "date": "Please provide a date in the future"
      }));
      formValid = false;
    } else {
      setErrors((prev: Errors) => ({
        ...prev,
        "date": ""
      }));
    }

    // Validate time
    // 1) Booking is for today
    if (bookingData.date === nowISO) {
      // One hour from now, in the format HH:MM
      let earliestTime = `${currentHour + 1}:${currentMinutes}`;
      earliestTime = NormaliseTime(earliestTime);
      const bookedTime = NormaliseTime(bookingData.time);

      // Booking is for the past
      if (bookedTime < earliestTime) {
        setErrors((prev: Errors) => ({
          ...prev,
          "time": "Please provide a time in the future (and enough time for us to make your booking)"
        }));
        formValid = false;
      } else {
        setErrors((prev: Errors) => ({
          ...prev,
          "time": ""
        }));
      }
    } else {
      // If the user sets the time in the past but instead of changing the time,
      // they change the date to the future, we need to clear the time error
      // message
      setErrors((prev: Errors) => ({
        ...prev,
        "time": ""
      }));
    }
    // 2) Booking is for a time outside of the opening hours of the restaurant
    // This is a valid check which could be made, however the restaurant data is not
    // sent to this component and would need to be parsed into a useable format
    // before it could be compared (out of scope but valid change request)


    // There's a `max` attribute added to the input, but this might be hacked
    // with by the user using the inspector, I guess...
    if (bookingData.guests > 12) {
      setErrors((prev: Errors) => ({
        ...prev,
        "guests": "We can't take bookings for over twelve people using this form. Please contact the restaurant directly to make this booking."
      }));
      formValid = false;
    } else {
      setErrors((prev: Errors) => ({
        ...prev,
        "guests": ""
      }));
    }

    return formValid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isFormValid()) {
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
    }
  };

  return (
    <Container>
      <h2>Book a Table</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label>Name{' '}
            <input type="text" id="name" name="name" value={bookingData.name} onChange={handleChange}/>
            {' '}
            <output className="text-danger">{errors.name}</output>
          </label>

        </p>

        <p>
          <label>Email{' '}
            <input type="email" id="email" name="email" value={bookingData.email} onChange={handleChange}/>
            </label>
            {' '}
            <output className="text-danger">{errors.email}</output>
        </p>

        <p>
          <label>Phone{' '}
            <input type="tel" id="phone" name="phone" value={bookingData.phone} onChange={handleChange}/>
          </label>
          {' '}
          <output className="text-danger">{errors.phone}</output>
        </p>

        <p>
          <label>Date{' '}
            <input type="date" id="date" name="date" value={bookingData.date} onChange={handleChange}/>
          </label>
          {' '}
          <output className="text-danger">{errors.date}</output>
        </p>

        <p>
          <label>Time{' '}
            <input type="time" id="time" name="time" value={bookingData.time} onChange={handleChange}/>
          </label>
          {' '}
          <output className="text-danger">{errors.time}</output>
        </p>

        <p>
          <label>Guests{' '}
            <input type="number" id="guests" name="guests" min="1" max="12" value={bookingData.guests} onChange={handleChange}/>
          </label>
          {' '}
          <output className="text-danger">{errors.guests}</output>
        </p>

        <p><button type="submit">Book</button></p>
      </form>
    </Container>
  );
};

export default BookTable;
