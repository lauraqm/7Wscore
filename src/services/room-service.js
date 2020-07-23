import { Utils } from '../services/utils';
import * as firebaseClient from '../firebase-client.js';

const db = firebaseClient.database;
const roomCollection = db.collection('rooms');

export const getAllRooms = () => {
  return roomCollection.get().then(function (querySnapshot) {
    return Utils.handleData(querySnapshot);
  });
};

const getRoom = (roomId) => {
  return roomCollection.doc(roomId).get().then(function (doc) {
    if (doc.exists) {
      return Utils.handleData(doc);
    }
    else {
      console.log('No such document!');
      return null;
    }
  }).catch(function (error) {
    console.log('Error getting room:', error);
    return null;
  });
};

export const roomService = { getAllRooms, getRoom };
