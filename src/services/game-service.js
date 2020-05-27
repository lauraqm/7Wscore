import * as firebaseClient from '../firebase-client.js';

const db = firebaseClient.database;


let getGame = (roomId, gameId) => {
    let game;
    return db.collection("rooms").doc(roomId).collection("games").doc(gameId).get().then(function (doc) {
        if (doc.exists) {
            game = doc.data();
            game.id = doc.id;
            return game;
        } else {
            return null;
        }
    }).catch(function (error) {
        console.log("Error getting game:", error);
        return null;
    });
}


let getScoreCards = (roomId, gameId) => {
    return db.collection(`rooms/${roomId}/games/${gameId}/scorecards/`)
    .get().then(function (querySnapshot) {
        let scorecards = [];
        querySnapshot.forEach(function (doc) { 
            scorecards.push(doc.data());
        });
        return scorecards;
    }).catch(function (error) {
        console.log("Error getting game:", error);
        return null;
    });
}


let getGamesByRoom = (roomId) => {
    let gamesRef = db.collection("rooms").doc(roomId).collection("games");
    return gamesRef.orderBy("createdOn", "desc").get()
        .then(function (querySnapshot) {
            let games = [];
            querySnapshot.forEach(function (doc) {
                let obj = doc.data();
                obj.id = doc.id;
                games.push(obj);
            });
            return games;
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}



export let gameService = {getGamesByRoom, getGame, getScoreCards}