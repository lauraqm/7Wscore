import * as firebaseClient from '../firebase-client.js';

const db = firebaseClient.database;

const getGame = (roomId, gameId) => {
  let game;
  return db.collection('rooms').doc(roomId).collection('games').doc(gameId).get().then(function (doc) {
    if (doc.exists) {
      game = doc.data();
      game.id = doc.id;
      return game;
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
      const scorecards = [];
      querySnapshot.forEach(function (doc) {
        scorecards.push(doc.data());
      });
      return scorecards;
    }).catch(function (error) {
      console.log('Error getting game:', error);
      return null;
    });
};

const getGamesByRoom = (roomId) => {
  const gamesRef = db.collection('rooms').doc(roomId).collection('games');
  return gamesRef.orderBy('createdOn', 'desc').get()
    .then(function (querySnapshot) {
      const games = [];
      querySnapshot.forEach(function (doc) {
        const obj = doc.data();
        obj.id = doc.id;
        games.push(obj);
      });
      return games;
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error);
    });
};

export const gameService = { getGamesByRoom, getGame, getScoreCards };
