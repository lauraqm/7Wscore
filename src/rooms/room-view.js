import * as titleComponent from '../components/title/title.js';
import * as firebaseClient from '../firebase-client.js';

const db = firebaseClient.db;

const title = "Rooms";


let initialize = () => {
    let tittle = document.querySelector('.title-container');  
    tittle.appendChild (titleComponent.create(title));
    renderRooms();
}


let renderRooms = () =>{

    var docRef = db.collection("rooms");

    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
};


initialize();