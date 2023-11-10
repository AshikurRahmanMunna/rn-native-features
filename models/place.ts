interface ILocation {
  lat: number;
  lng: number;
}
class Place {
  title: string;
  imageUri: string;
  address: string;
  location: ILocation;
  id: string;
  constructor(
    title: string,
    imageUri: string,
    address: string,
    location: ILocation
  ) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location;
    this.id = new Date().toString() + Math.random().toString();
  }
}
