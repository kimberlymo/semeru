import firebase from "firebase";
import statisticsValues from "../StatisticsValues";
import Formatter from "../Formatter";

let db = firebase.firestore();
const collectionName = "tasks";
const formatter = new Formatter();

/**
 * Diese Klasse greift auf die Collection tasks zu.
 * Hier werden die CRUD Methoden implementiert und können von den Komponenten aufgerufen und benutzt werden.
 *
 * @author Kimberly Moorhouse
 */
export default class FirebaseTasks {

    /**
     * erstellt eine neue Tätigkeit mit den nötigen Attributen
     *
     * @param name
     * @param plannedFrom
     * @param plannedTill
     * @param priority
     * @param user E-Mail Adresse von dem Benutzer.
     */
    create(name, plannedFrom, plannedTill, priority, user) {
        db.collection(collectionName).doc().set({
            name: name,
            plannedFrom: plannedFrom,
            plannedTill: plannedTill,
            editTime: [],
            pause: [],
            priority: priority,
            user: user

        }).catch(error => alert("Ein Fehler ist aufgetreten: " + error))
    }

    /**
     * muss noch bearbeitet werden, vielleicht mit einem Filter?
     *
     * @param queryShot
     * @returns {*[]}
     */
    getFromUser(queryShot) {
        let list = [];

        queryShot.forEach(doc => {
            if (doc.data().user === localStorage.getItem('email')) list.push(doc.data())
        });
        return list;
    }

    /**
     * beschafft sich die DocIDs der verschiedenen Tätigkeiten
     * beim getFromUser werden NUR die DATEN der Tätigkeiten beschaffen und nicht die IDs!
     *
     * @param queryShot
     * @returns {*[]}
     */
    getDocIdsFromUser(queryShot) {
        let docIds = [];

        queryShot.docs.forEach(doc => {
            if (doc.data().user === localStorage.getItem('email')) docIds.push(doc.id)
        });
        return docIds;
    }

    /**
     * Die Tätigkeit wird aktualisiert, mit den nötigen Werte
     * alle Werte werden angegeben!
     *
     * @param docId
     * @param task
     * @param workTime
     * @param pause
     */
    updateTask(docId, task, workTime, pause) {
        db.collection(collectionName).doc(docId).update({
            name: task.name,
            plannedFrom: task.plannedFrom,
            plannedTill: task.plannedTill,
            editTime: workTime,
            pause: pause,
            priority: task.priority,
            user: task.user

        }).catch(error => alert("Ein Fehler ist aufgetreten: " + error))
    }

    deleteATask(docId) {
        db.collection(collectionName).doc(docId).delete().then(() => alert("Ihr Eintrag wurde erfolgreich gelöscht."))
    }

    /**
     * beschafft die Daten für die Statistiken, die Zeiten werden hier berechnet und auch zurückgegeben
     * Die Zeiten sind in Stunden berechnet und müssen in den Komponenten formatiert werden.
     * NOCH IN BEARBEITUNG!!!!
     *
     * @param queryShot
     * @param conditionValue: StatisticsValues
     * @returns {*[]}: {name: '', worked: 0, pause: 0, planned: 0}
     */
    getStatsFromTask(queryShot, conditionValue) {
        let data = this.getFromUser(queryShot);
        let stats = [];


        data.forEach((task, index) => {
            let saveIndex = -1;
            let workTime = 0;
            let planned = formatter.subtractTimeInHours(task.plannedTill, task.plannedFrom)
            let pause = 0;

            task.editTime.forEach(time => {
                const convertFrom = new Date(time.from.toMillis());
                const convertTill = new Date(time.till.toMillis());

                //sobald die Bedingung stimmt, wird die Zeit hinzugefügt.
                if (returnCondition(conditionValue, convertTill, convertFrom)) {
                    saveIndex = index
                    workTime += ((convertTill - convertFrom) % 86400000) / 3600000;
                }
            });

            task.pause.forEach(time => {
                const convertFrom = new Date(time.from.toMillis());
                const convertTill = new Date(time.till.toMillis());

                //sobald die Bedingung stimmt, wird die Zeit hinzugefügt.
                if (returnCondition(conditionValue, convertTill, convertFrom)) pause += ((convertTill - convertFrom) % 86400000) / 3600000;
            })

            if (saveIndex === index) stats.push({
                name: data[index].name,
                worked: workTime,
                planned: planned,
                pause: pause
            })
        })
        return stats;
    }
}

/**
 * Sobald die ConditionValue übereinstimmt, mit der Bedindung gibt dieser eine neue Bedingung zurück
 * zu dem richtigen Statistiktyp.
 *
 * @param conditionValue
 * @param till
 * @param from
 * @returns {boolean}
 */
function returnCondition(conditionValue, till, from) {
    const today = new Date().toDateString();
    const currMonday = new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 1)).toDateString();

    switch (conditionValue) {
        case statisticsValues.today:
            return from.toDateString() === today || till.toDateString() === today;
        case statisticsValues.thisWeek:
            return from.toDateString() >= currMonday && from.toDateString() <= today;
        case statisticsValues.thisMonth:
            return from.getMonth() === new Date().getMonth() || till.getMonth() === new Date().getMonth()
        default:
            return false;
    }
}