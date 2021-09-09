import {useEffect, useState} from "react";
import {Button, Container, Dropdown, DropdownButton} from "react-bootstrap";
import firebase from "firebase";
import FirebaseTasks from "./firebase/FirebaseTasks";
import Formatter from "./Formatter";
import StopwatchView from "./timers/StopwatchView";
import TimerView from "./timers/TimerView";


//werden für den Timer und auch für die Stoppuhr gebraucht.
let Stopwatch = require('timer-stopwatch')
let stopwatch = new Stopwatch();
let timer = new Stopwatch();

let db = firebase.firestore();
const firebaseTasks = new FirebaseTasks();
const formatter = new Formatter();

/**
 * nimmt die Zeit auf, wie lange der Benutzer arbeitet oder gerade Pause hat.
 * Dabei kann der Benutzer entscheiden bei welcher Tätigkeit er arbeiten möchte
 * Die Zeiten werden noch nicht richtig aufgenommen
 * TODO: Pausen werden noch nicht richtig gespeichert.
 *
 * @returns {JSX.Element}
 * @constructor
 * @author Kimberly Moorhouse
 */
export default function RecordTimeForTask() {
    const [tasks, setTasks] = useState({value: [], docIds: []});
    const [index, setIndex] = useState(-1);
    let till = new Date();
    let from = new Date();
    let pauseFrom = null;
    let pauseTill = null;

    const [pause, setPause] = useState({from: new Date(), till: new Date()});

    const [isOnBreak, setIsOnBreak] = useState(false);
    const [isActive, setIsActive] = useState(false);

    /**
     * holt die Tätigkeiten des Benutzers und speichert auch die IDs
     */
    useEffect(() => {
        db.collection("tasks").get().then(queryShot => {
            setTasks({docIds: firebaseTasks.getDocIdsFromUser(queryShot), value: firebaseTasks.getFromUser(queryShot)})
        });
    }, []);

    /**
     * startet oder stoppt den Timer und speichert die Daten in die Datenbank.
     * Hier werden die Arbeitszeiten aufgenommen.
     */
    function validateWorkTime() {
        till = new Date();
        setIsActive(!isActive);

        if (isActive) {
            stopwatch.stop();
            stopwatch.reset();
            timer.stop();
            timer.reset();
            window.location.reload();

        } else {
            stopwatch.start();
            timer.start();
            from = new Date();
        }
        update();
    }

    /**
     * startet oder stoppt den Timmer und speichert die Daten in die Datenbank
     * Hier werden die Pausen aufgenommen.
     * TODO: BEARBEITEN, DATEN WERDEN KOMISCH GESPEICHERT, alter useState wird verwendet.
     */
    function validateBreaks() {
        setIsOnBreak(!isOnBreak);
        stopwatch.start();
        timer.start();
        pauseTill = new Date();

        if (!isOnBreak) {
            pauseFrom = new Date();
            pauseTill = new Date();
            stopwatch.stop();
            timer.stop();
        }
        update();
    }

    /**
     * Sobald die Auswahl der Tätigkeit verändert wurde, werden die Daten wieder auf die Standartwerte gespeichert.
     * @param index
     */
    function onSelect(index) {
        stopwatch.reset();
        timer.reset();
        setIsActive(false);
        setIndex(index);
        till = new Date();
        pauseTill = new Date();
        pauseFrom = new Date();
    }

    /**
     * speichert die verschiedene Zeiten in die Firestore Datenbank
     * Dabei sollen die vorherigen Arbeitszeiten und Pausen nicht überschrieben.
     */
    function update() {
        let workTime = [{from: from, till: till}];
        let pauses = [{from: pauseFrom, till: pauseTill}];
        let task = tasks.value[index];

        if (task.editTime.length > 0) {
            [...tasks.value[index].editTime].forEach((time) => {
                workTime.push({from: new Date(time.from.toMillis()), till: new Date(time.till.toMillis())})
            });
        }
        if (tasks.value[index].pause.length > 0) {
            [...tasks.value[index].pause].forEach((time) => {
                pauses.push({from: new Date(time.from.toMillis()), till: new Date(time.till.toMillis())})
            });
        }
        firebaseTasks.updateTask(tasks.docIds[index], workTime, pauses);
    }

    return (
        <Container className="col-11 col-lg-8">
            <h3>Zeiten erfassen</h3>
            <br/>

            <DropdownButton title={(index >= 0) ? formatter.showTask(tasks.value[index]) : "Bitte etwas auswählen"}
                            variant='warning'>
                {tasks.value.map(((value, index) =>
                    <Dropdown.Item key={'tasks' + index}
                                   onSelect={() => onSelect(index)}>{formatter.showTask(value)}</Dropdown.Item>)
                )}
            </DropdownButton>
            <br/>
            <hr/>

            <h6>Vorhandene Zeit: </h6>
            <TimerView
                startValue={(index < 0) ? 0 : formatter.getDateFromHours(tasks.value[index].plannedTill) - formatter.getDateFromHours(tasks.value[index].plannedFrom)}
                timer={timer}/>

            <br/>
            <Button onClick={validateWorkTime} variant="light"
                    disabled={(index < 0 || isOnBreak)}>{(isActive) ? "Stopp" : "Start"}
            </Button>

            <br/><br/>
            <hr/>

            <p>berechnete Zeit:</p>
            <StopwatchView stopwatch={stopwatch}/>
            <br/>

            <Button className="col-6" disabled={(index < 0)} onClick={validateBreaks} variant="light">
                {(isOnBreak) ? 'weiter' : 'pausieren'}
            </Button>
            <br/><br/>
        </Container>
    )
}