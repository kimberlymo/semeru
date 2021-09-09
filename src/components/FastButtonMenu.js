import {useEffect, useState} from "react";
import firebase from "firebase";
import {Button} from "react-bootstrap";
import FirebaseTasks from "./firebase/FirebaseTasks";
import Formatter from "./Formatter";
import StopwatchView from "./timers/StopwatchView";
import TimerView from "./timers/TimerView";

//wird gebracht für den Timer und Stoppuhr
let Stopwatch = require('timer-stopwatch')
let stopwatch = new Stopwatch();
let timer = new Stopwatch();

let db = firebase.firestore();
const firebaseTasks = new FirebaseTasks();
const formatter = new Formatter();

/**
 * Hier kann der Benutzer schnell seine Arbeitszeiten erfassen mit nur einem Klick.
 * Sobald er auf den Knopf drückt, werden die Arbeitszeiten aufgenommen.
 * Pausen wurden nicht implementiert, sowie auch nicht Unterbrechungen.
 *
 * @returns {JSX.Element}
 * @constructor
 * @author Kimberly Moorhouse
 */
export default function FastButtonMenu() {
    const [tasks, setTasks] = useState({values: [], docIds: []});
    const [index, setIndex] = useState(-1);
    const [workTime, setWorkTime] = useState({from: new Date(), till: new Date()});
    const [isActive, setIsActive] = useState(false);

    /**
     * beschafft die Tätigkeiten des Benutzers aus der Datenbank, dabei werden auch die DocIDs gespeichert.
     */
    useEffect(() => {
        db.collection("tasks").get().then(queryShot => {
            setTasks({docIds: firebaseTasks.getDocIdsFromUser(queryShot), values: firebaseTasks.getFromUser(queryShot)})
        });
    }, [])

    /**
     * startet oder stoppt die Stoppuhr und erfasst diese Daten in die Datenbank.
     * @param ind
     */
    function activateStopwatch(ind) {
        setIndex(ind);
        setIsActive(!isActive);

        setWorkTime({from: workTime.from, till: new Date()});
        stopwatch.start();
        timer.start();

        if (ind === index) setIndex(-1);

        if (isActive) {
            setWorkTime({from: new Date(), till: new Date()});
            //akutalisiert alle Daten auf ihre Standartwerte und beschafft neue Daten
            window.location.reload()
        }

        update(ind);
    }

    /**
     * aktualisiert die Daten in der Datenbank.
     * Die Daten die verändert wurden, sind die Arbeitszeiten.
     * @param ind
     */
    function update(ind) {
        let newWorkTime = [workTime];
        const activeTask = tasks.values[ind];

        if (activeTask.editTime.length > 0) newWorkTime = [...activeTask.editTime, workTime];

        firebaseTasks.updateTask(tasks.docIds[ind], activeTask, newWorkTime, activeTask.pause);
    }

    return (
        <div>
            <h3>Schnell Menu</h3>
            <h4>{(index < 0) ? '' : tasks.values[index].name}</h4>
            <br/>

            <h6>berechnete Zeit: </h6>
            <StopwatchView stopwatch={stopwatch}/>

            <br/>
            <h6>verfügbare Zeit:</h6>
            <TimerView
                startValue={(index < 0) ? 0 : formatter.getDateFromHours(tasks.values[index].plannedTill) - formatter.getDateFromHours(tasks.values[index].plannedFrom)}
                timer={timer}/>
            <br/>
            <hr/>

            {tasks.values.map(((value, ind) =>
                <div key={'tasks' + ind}>
                    <Button onClick={() => activateStopwatch(ind)} className="col-8" active={ind === index}
                            variant="outline-secondary">
                        {formatter.showTask(value)}
                    </Button><br/><br/>
                </div>))}

        </div>
    )
}