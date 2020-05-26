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

export let roomService = {getAllRooms}

