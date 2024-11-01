export type BookingData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
}

export type Errors = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
}

// An object which has an unknown number of keys, all of which
// are strings. This is used for form validation in this file:
// /src/text-content/FormErrorMessages.tsx
// to collect together error messages. This may help in the
// future, should the language of the page change
export type AllStringObject = Record<string, string>;
