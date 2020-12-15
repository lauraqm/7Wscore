// import { firestore } from "firebase";
import firebase from 'firebase';
import { IPlayer } from '../model/IPlayer';
import { IRoom } from '../model/IRoom';

type FirestoreSnapshot = firebase.firestore.QuerySnapshot & firebase.firestore.QueryDocumentSnapshot;
type FirestoreDocument = firebase.firestore.DocumentData;

class Utils {
  /**
   * Sort any array of objects by property
   * @param {*} array
   * @param {*} property
   */
  static sortArrayByProperty (array:any[], property:string) {
    return array.sort((a, b) => {
      return b[property] - a[property];
    });
  }

  /*
  * Extracts one or multiple parameters from the URL search query.
  * Usages:
  *   Utils.getURLParams('example')
  *   Utils.getURLParams(['example1', 'example2'])
  */
  static getURLParams (requestedParams:string ) : string;
  static getURLParams (requestedParams:string[]):string[];
  static getURLParams (requestedParams:any ) : any {
    const urlParams = new URLSearchParams(window.location.search);
    const isArray = Array.isArray(requestedParams);
    let inputArray : string[];

    isArray? inputArray = requestedParams as string[] : inputArray = [requestedParams as string];
    
    let outputParams = inputArray.map((param:string) => {
        return urlParams.get(param);
      });

      if (isArray ) {
        return outputParams;
      }
      else {
        return outputParams[0];
      }
    
  } 

  static buildQueryURL (object:{}) {
    return (new URLSearchParams(object)).toString();
  };

  /**
   * This method takes the data gotten from Data base and adds an unique ID
   * @param {*} snapshot
   */
  static handleData (snapshot: FirestoreSnapshot) : any {
    // If it's a single document
    if (snapshot.exists) {
      const document = snapshot.data();
      document.id = snapshot.id;
      return document;
    }
    //  If it's a collection
    else {
      const collection: FirestoreDocument[] = [];
      snapshot.forEach(function (doc) {
        const document = doc.data();
        document.id = doc.id;
        collection.push(document);
      });
      return collection;
    }
  };

  static getPlayersDataByProperty (room:IRoom, property:string) {
    const players:IPlayer[] = room.players;
    const output: string[] = [];
    players.forEach((element) => {
      output.push(element[property]);
    });
    return output;
  };

  static buildPlayerObjectFromRoom (room:IRoom, username:string) {
    const playerData = room.players.filter(player => {
      return player.username === username;
    });
    const player = {
      url: playerData[0].pictureUrl,
      color: playerData[0].color,
      username: playerData[0].username
    };
    return player;
  }
}

export { Utils };
