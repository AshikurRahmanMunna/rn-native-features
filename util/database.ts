import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

const database = SQLite.openDatabase("places.db");

export function init() {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                lng REAL NOT NULL
            )`,
        [],
        (transaction, resultSet) => {
          resolve({ transaction, resultSet });
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

export const insertPlace = (place: Place) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          console.log(result);
          resolve(result);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
};

export const fetchPlaces = (): Promise<Place[]> => {
  const promise = new Promise<Place[]>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          const places = [];
          for (const dp of result.rows._array) {
            places.push(
              new Place(
                dp.title,
                dp.imageUri,
                {
                  lat: dp.lat,
                  lng: dp.lng,
                  address: dp.address,
                },
                dp.id
              )
            );
          }
          resolve(places);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
};

export const fetchPlaceDetails = (id: string): Promise<Place> => {
  const promise = new Promise<Place>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id = ?`,
        [id],
        (_, result) => {
          const [SQLPlace] = result.rows._array;
          const place = new Place(
            SQLPlace.title,
            SQLPlace.imageUri,
            { lat: SQLPlace.lat, lng: SQLPlace.lng, address: SQLPlace.address },
            SQLPlace.id
          );
          resolve(place);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
};
