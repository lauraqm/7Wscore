import * as firebaseClient from '../firebase-client.js';

const db = firebaseClient.database;

export let getAllRooms = () => { 
    return db.collection("rooms").get().then(function (querySnapshot) {
        let rooms = [];
        querySnapshot.forEach(function (doc) {
            let room = doc.data();
            room.id = doc.id;
            rooms.push (room);
        });
        return rooms;
    });

};

let getRoom = (roomId) => {
    let room;
    return db.collection("rooms").doc(roomId).get().then(function (doc) {
        if (doc.exists) {
            room = doc.data();
            room.id = doc.id;
            return room;
        } else {
            return null;
        }
    }).catch(function (error) {
        console.log("Error getting room:", error);
        return null;
    });
}


export let roomService = {getAllRooms, getRoom}

