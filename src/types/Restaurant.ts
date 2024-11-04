export type Restaurant = {
  id: number;
  name: string;
  shortDescription: string;
  details: {
    address: string;
    contactEmail: string;
    id: number;
    openingHours: {
      weekday: string;
      weekend: string;
    }
    reviewScore: number;
  }
};
