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
 *
 * @returns {JSX.Element}
 * @constructor
 * @author Kimberly Moorhouse
 */
export default function RecordTimeForTask() {
    const [tasks, setTasks] = useState({value: [], docIds: []});
    const [index, setIndex] = useState(-1);
    const [workingTime, setWorkingTime] = useState({from: new Date(), till: new Date()});
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
     * BEARBEITEN, DATEN WERDEN KOMISCH GESPEICHERT.
     */
    function validateWorkTime() {
        setIsActive(!isActive);
        setWorkingTime({from: workingTime.from, till: new Date()});

        if (!isActive) {
            stopwatch.start();
            timer.start();
            setWorkingTime({from: new Date(), till: new Date()});
        } else {
            stopwatch.stop();
            stopwatch.reset();
            timer.stop();
            timer.reset();
        }
        update();
    }

    /**
     * startet oder stoppt den Timmer und speichert die Daten in die Datenbank
     * Hier werden die Pausen aufgenommen.
     */
    function validateBreaks() {
        setIsOnBreak(!isOnBreak);
        stopwatch.start();
        timer.start();
        setPause({from: pause.from, till: new Date()});

        if (!isOnBreak) {
            setPause({from: new Date(), till: new Date()});
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
        setWorkingTime({from: new Date(), till: new Date()});
        setPause({from: new Date(), till: new Date()});
    }

    /**
     * speichert die verschiedene Zeiten in die Firestore Datenbank
     * Dabei sollen die vorherigen Arbeitszeiten und Pausen nicht überschrieben.
     */
    function update() {
        let worktime = [workingTime];
        let pauses = [pause];

        if (tasks.value[index].editTime.length > 0) worktime = [...tasks.value[index].editTime, workingTime];
        if (tasks.value[index].pause.length > 0) pauses = [...tasks.value[index].pause, pause];

        firebaseTasks.updateTask(tasks.docIds[index], tasks.value[index], worktime, pauses);
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
            <br/><hr/>

            <h6>Vorhandene Zeit: </h6>
            <TimerView
                startValue={(index < 0) ? 0 : formatter.getDateFromHours(tasks.value[index].plannedTill) - formatter.getDateFromHours(tasks.value[index].plannedFrom)}
                timer={timer}/>

            <br/>
            <Button onClick={validateWorkTime} variant="light"
                    disabled={(index < 0 || pause.isActive)}>{(isActive) ? "Stopp" : "Start"}
            </Button>

            <br/><br/>
            <hr/>

            <h6>{"angefangen: " + ((isActive) ? formatter.formatDate(workingTime.from) : 'nicht definiert.')}</h6>
            <p>berechnete Zeit:</p>
            <StopwatchView stopwatch={stopwatch}/>
            <br/>

            <Button className={"col-6"} disabled={(index < 0)} onClick={validateBreaks} variant="light">
                {(isOnBreak) ? 'weiter' : 'pausieren'}
            </Button>
            <br/><br/>
        </Container>
    )
}