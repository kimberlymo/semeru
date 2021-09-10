import {useEffect, useState} from "react";
import firebase from "firebase";
import {ButtonGroup, Container} from "react-bootstrap";
import FirebaseTasks from "./firebase/FirebaseTasks";
import statisticsValues from "./StatisticsValues";
import {motion} from "framer-motion"

let db = firebase.firestore();
const firebaseTasks = new FirebaseTasks();

/**
 * In dieser Komponente werden alle Statistiken des Benutzers angezeigt.
 * Momentan kann der Benutzer über den heutigen Tag, diese Woche und diesen Monat die Statistiken anschauen
 * TODO: Layout erstellen und vielleicht Pausen implementieren
 *
 * @returns {JSX.Element}
 * @constructor
 * @author Kimberly Moorhouse
 */
export default function Statistics() {
    const [data, setData] = useState([]);
    const [selectedStat, setSelectedStat] = useState(statisticsValues.today);

    useEffect(() => {
        db.collection("tasks").get().then(queryShot => {
            setData(firebaseTasks.getStatsFromTask(queryShot, selectedStat))
            console.log(firebaseTasks.getStatsFromTask(queryShot, selectedStat))
        });
    }, [selectedStat]);

    return (
        <Container className="col-12 col-lg-8">
            <h3>Ihre Statistiken</h3>
            <br/>

            <ButtonGroup className="me-2">
                {[statisticsValues.today, statisticsValues.thisWeek, statisticsValues.thisMonth]
                    .map(((value, index) =>
                        <motion.button key={'stats-' + index} onClick={() => setSelectedStat(value)}
                                       className={"btn btn-outline-secondary " + ((selectedStat === value) ? "active" : "")}
                                       initial={{scale: 1.3, rotate: 10}}
                                       animate={{rotate: 0, scale: 1}} whileHover={{scale: 1.1, rotate: 2}}
                                       whileTap={{scale: 1.1, rotate: 2}}
                                       transition={{type: "spring", stiffness: 260, damping: 20}}>
                            {value}</motion.button>))}
            </ButtonGroup>
            <br/><br/>

            {data.map(((value, index) => <motion.div key={index} whileHover={{scale: 1.1, rotate: 0}}>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>{value.name}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>gearbeitet</td>
                        <td>{convertTime(value.worked)}</td>
                    </tr>
                    <tr>
                        <td>eingeplannt pro Tag</td>
                        <td>{convertTime(value.planned)}</td>
                    </tr>
                    </tbody>
                </table>
                <br/></motion.div>))}
        </Container>
    )
}

function convertTime(hours) {
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return rhours + " h " + rminutes + " min";
}