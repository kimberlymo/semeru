import firebase from "firebase";


let db = firebase.firestore();
const collectionName = "user";

/**
 * Diese Klasse greift auf die User Collection zu.
 * Hier werden die CRUD Methoden implementiert, damit diese mehrmals gebraucht werden können in den Komponenten.
 *
 * @author Kimberly Moorhouse
 */
export default class FirebaseUsers {

    /**
     * erstellt einen neuen User mit den nötigen Attributen.
     * @param email
     * @param firstname
     * @param lastname
     */
    create(email, firstname, lastname) {
        db.collection(collectionName).doc(email).set({
            firstname: firstname,
            lastname: lastname

        }).catch(error => alert("Es ist ein Fehler aufgetreten: " + error));
    }

    /**
     * greift auf die Daten eines User zu.
     * ist noch in Bearbeitung!
     * @param email
     */
    getAUser(email) {
        db.collection(collectionName).get().then(query => {
            query.forEach(doc => {
                if (doc.id === email) return doc.data()
            });
        });
    }
}