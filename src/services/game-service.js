import { Utils } from '../services/utils.ts';
import * as firebaseClient from '../firebase-client.js';

const db = firebaseClient.database;

const getGame = (roomId, gameId) => {
  return db.doc(`rooms/${roomId}/games/${gameId}/`).get().then(function (doc) {
    if (doc.exists) {
      return Utils.handleData(doc);
    }
    else {
      return null;
    }
  }).catch(function (error) {
    console.log('Error getting game:', error);
    return null;
  });
};

const getScoreCards = (roomId, gameId) => {
  return db.collection(`rooms/${roomId}/games/${gameId}/scorecards/`)
    .get().then(function (querySnapshot) {
      return Utils.handleData(querySnapshot);
    }).catch(function (error) {
      console.log('Error getting game:', error);
      return null;
    });
};

const getGamesByRoom = (roomId) => {
  const gamesRef = db.collection('rooms').doc(roomId).collection('games');
  return gamesRef.orderBy('createdOn', 'desc').get()
    .then(function (querySnapshot) {
      return Utils.handleData(querySnapshot);
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error);
    });
};

export const gameService = { getGamesByRoom, getGame, getScoreCards };
