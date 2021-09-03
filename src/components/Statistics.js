import {useEffect, useState} from "react";
import firebase from "firebase";
import {Button, ButtonGroup, Container, Table} from "react-bootstrap";
import FirebaseTasks from "./firebase/FirebaseTasks";
import statisticsValues from "./StatisticsValues";

let db = firebase.firestore();
const firebaseTasks = new FirebaseTasks();

/**
 *
 * NOCH IN BEARBEITUNG:
 * Formatierung der Anzahl Stunden und noch vor diese Woche muss noch implementiert werden
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
                        <Button key={'stats-' + index} onClick={() => setSelectedStat(value)}
                                variant="outline-secondary" active={value === selectedStat}>
                            {value}</Button>))}
            </ButtonGroup>
            <br/><br/>

            <Table responsive variant="light">
                <thead>
                <tr>
                    <th>Tätigkeit</th>
                    <th>Arbeitszeit</th>
                    <th>Pause</th>
                </tr>
                </thead>

                <tbody>
                {data.map(((value, index) =>
                    <tr key={'statistics-' + index}>
                        <td>{value.name}</td>
                        <td>{convertTime(value.worked)}</td>
                        <td>{convertTime(value.pause)}</td>
                    </tr>))}
                </tbody>
            </Table>
        </Container>
    )
}

function convertTime(hours) {
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return rhours + " h " + rminutes + " min";
}