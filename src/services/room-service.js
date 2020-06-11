import * as firebaseClient from '../firebase-client.js';

const db = firebaseClient.database;

export const getAllRooms = () => {
  return db.collection('rooms').get().then(function (querySnapshot) {
    const rooms = [];
    querySnapshot.forEach(function (doc) {
      const room = doc.data();
      room.id = doc.id;
      rooms.push(room);
    });
    return rooms;
  });
};

const getRoom = (roomId) => {
  let room;
  return db.collection('rooms').doc(roomId).get().then(function (doc) {
    if (doc.exists) {
      room = doc.data();
      room.id = doc.id;
      return room;
    }
    else {
      return null;
    }
  }).catch(function (error) {
    console.log('Error getting room:', error);
    return null;
  });
};

export const roomService = { getAllRooms, getRoom };
