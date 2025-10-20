import type { AxiosResponse } from "./comment";

export interface ICity {
  city: string;
  type: string;
}

export interface ITourPrice {
  id: number;
  adultPrice: number;
  childPrice: number;
  infantPrice: number;
  toddlerPrice: number;
  singleSupplementPrice: number;
}

export interface IVehicle {
  id: string;
  name: string;
}

export interface IItinerary {
  id: number;
  dayNumber: number;
  title: string;
  description: string;
  meal: string;
}

export interface ITour {
  id: number;
  tourTitle: string;
  tourProgram: string;
  description: string;
  duration: number;
  basePrice: number;
  imageIds: string[];
  itineraries?: IItinerary[];
  departureCity: ICity;
  destinationCity: ICity;
  tourPrice: ITourPrice;
  vehicle: IVehicle;
}

export interface ITourResponse {
  code: number;
  message?: string;
  result: ITour[];
}

export interface ITourDeparture {
<<<<<<< HEAD
	id: int;
=======
	id: string;
>>>>>>> 36b0d30dd64d1d5fd9385dabe168388c1f72f378
    tourCode: string;
    departureDate: string;
    returnDate: string;
    availableSeats: string;
    tourId: string;
    tourPrice: ITourPrice;
}

<<<<<<< HEAD
type ToursResponse = AxiosResponse<ITour[]>;

type TourResponse = AxiosResponse<ITour>;

type TourDeparturesResponse = AxiosResponse<ITourDeparture[]>;

type TourDepartureResponse = AxiosResponse<ITourDeparture>;

type ItineraryResponse = AxiosResponse<IItinerary[]>;
=======
export interface ITourDepartureResponse {
	code: number;
	message?: string;
	result: ITourDeparture;
}
>>>>>>> 36b0d30dd64d1d5fd9385dabe168388c1f72f378
