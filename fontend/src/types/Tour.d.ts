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

export interface ITourDeparture {
	id: number;
	tourCode: string;
	departureDate: LocalDateTime;
	returnDate: LocalDateTime;
	availableSeats: Short;
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

export interface ApiResponse<T> {
  code: number;
  message?: string;
  result: T;
}

type ToursResponse = ApiResponse<ITour[]>;

type TourResponse = ApiResponse<ITour>;

type IDepartureResponse = ApiResponse<ITourDeparture[]>;
