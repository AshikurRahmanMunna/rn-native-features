import { ILocation } from "../types/common";

interface ILocationSmall {
  lat: number;
  lng: number;
}
export class Place {
  title: string;
  imageUri: string;
  address: string;
  location: ILocationSmall;
  id: string;
  constructor(
    title: string,
    imageUri: string,
    location: ILocation,
    id: string
  ) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address as string;
    this.location = { lat: location.lat, lng: location.lng };
    this.id = id;
  }
}
