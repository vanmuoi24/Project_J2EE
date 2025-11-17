import type { AxiosResponse } from './comment';

export interface ICity {
  id: number;
  city: string;
  type: string | null;
}

export interface ITourPrice {
  id: number;
  adultPrice: number;
  childPrice: number;
  infantPrice: number;
  toddlerPrice: number;
  singleSupplementPrice: number;
}

export interface TourPriceRequest {
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

export interface ItineraryRequest{
  title: string;
  description: string;
  meal: string;
  tourId: number;
}

export interface IDepartureDate {
  id: number;
  tourCode: string;
  departureDate: string;
  returnDate: string;
  availableSeats: number;
  tourId: number;
  tourPrice: {
    id: number;
    adultPrice: number;
    childPrice: number;
    toddlerPrice: number;
    infantPrice: number;
    singleSupplementPrice: number;
  };
}

export interface DepartureDateRequest {
  departureDate: string;
  returnDate: string;
  availableSeats: number;
  tourId: number;
}

export interface ITour {
  id: number;
  tourTitle: string;
  tourProgram: string;
  description: string;
  duration: number;
  departures: IDepartureDate[];
  basePrice: number;
  imageIds: string[];
  itineraries?: IItinerary[];
  departureCity: ICity;
  destinationCity: ICity;
  tourPrice: ITourPrice;
  vehicle: IVehicle;
}

export interface TourRequest {
  tourTitle: string;
  tourProgram: string;
  description: string;
  duration: number;
  departureLocationId: number;
  destinationLocationId: number;
  basePrice: number;
  vehicleId: string;
  tourPriceId: number;
  files: File[];
}

export interface ITourResponse {
  code: number;
  message?: string;
  result: ITour[];
}

export interface ITourDeparture {
  id: int;
  tourCode: string;
  departureDate: string;
  returnDate: string;
  availableSeats: string;
  tourId: string;
  tourPrice: ITourPrice;
}

export interface ITourDeparture {
  id: string;
  tourCode: string;
  departureDate: string;
  returnDate: string;
  availableSeats: string;
  tourId: string;
  tourPrice: ITourPrice;
}

export interface ITourDepartureResponse {
  code: number;
  message?: string;
  result: ITourDeparture;
}

export interface IDestination {
  city: string;
  type: number;
}
export interface IDeparture {
  city: string;
  type: number;
}

export interface ILocation {
  id: number;
  city: string;
  type: string;
}

export interface LocationRequest {
  city: string;
  type: string;
}

type ToursResponse = AxiosResponse<ITour[]>;

type TourResponse = AxiosResponse<ITour>;

type TourDeparturesResponse = AxiosResponse<ITourDeparture[]>;

type TourDepartureResponse = AxiosResponse<ITourDeparture>;

type ItineraryResponse = AxiosResponse<IItinerary[]>;

export interface ITourDepartureResponse {
  code: number;
  message?: string;
  result: ITourDeparture;
}


