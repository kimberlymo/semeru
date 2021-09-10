import {useEffect, useState} from "react";
import firebase from "firebase";
import {Button, Container} from "react-bootstrap";
import FirebaseTasks from "../firebase/FirebaseTasks";
import Formatter from "../Formatter";
import StopwatchView from "../timers/StopwatchView";
import TimerView from "../timers/TimerView";
import {motion} from "framer-motion";
import DeleteTask from "./DeleteTask";

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
    let from = new Date();
    let till = new Date();
    const [isActive, setIsActive] = useState(false);

     // beschafft die Tätigkeiten des Benutzers aus der Datenbank, dabei werden auch die DocIDs gespeichert.
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
        till = new Date();

        stopwatch.start();
        timer.start();

        if (ind === index) setIndex(-1);

        if (!isActive) {
            from = new Date();
            console.log("hjsjkf")
        }

        update(ind);
        //ladet die Seite neu und die Werte werden wieder neugesetzt.
        if (isActive) window.location.reload();
    }

    /**
     * aktualisiert die Daten in der Datenbank.
     * Die Daten die verändert wurden, sind die Arbeitszeiten.
     * @param ind
     */
    function update(ind) {
        let newWorkTime = [{from: from, till: till}];
        const activeTask = tasks.values[ind];

        if (activeTask.editTime.length > 0) newWorkTime = [...activeTask.editTime, newWorkTime[0]];

        firebaseTasks.updateTask(tasks.docIds[ind], newWorkTime, activeTask.pause);
    }

    return (
        <Container className="col-11 col-lg-8">
            <motion.div initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}}
                        transition={{
                            type: "keyframes",
                            stiffness: 200,
                            damping: 20
                        }}>
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
                    <motion.div key={'tasks' + ind} initial={{scale: 0, rotate: -10}}
                                animate={{rotate: 0, scale: 1}} whileHover={{scale: 1.05, rotate: 0}}
                                whileTap={{scale: 1.05, rotate: 0}}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20
                                }}>

                        <Button onClick={() => activateStopwatch(ind)} className="col-8" active={ind === index}
                                variant="outline-secondary">
                            {formatter.showTask(value)}
                        </Button> <DeleteTask docId={tasks.docIds[ind]}/>
                        <br/><br/>
                    </motion.div>))}
            </motion.div>
        </Container>
    )
}