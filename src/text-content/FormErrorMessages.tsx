import type { AllStringObject } from "../types/Bookings";

// This object is used to generate the error messages on the booking form.
export default function FormErrorMessages(): AllStringObject {
  return {
    "noName": "You must provide a name",
    "noEmail": "Please provide a valid email address",
    "noPhone": "Please provide a valid telephone number",
    "datePast": "Please provide a date in the future",
    "timePast": "Please provide a time in the future (and enough time for us to make your booking)",
    "largeParty": "We can't take bookings for over twelve people using this form. Please contact the restaurant directly to make this booking."
  }
};
