import {useEffect, useState} from "react";
import firebase from "firebase";
import {Button, ButtonGroup, Container} from "react-bootstrap";
import FirebaseTasks from "./firebase/FirebaseTasks";
import statisticsValues from "./StatisticsValues";

let db = firebase.firestore();
const firebaseTasks = new FirebaseTasks();

/**
 *
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
                        <Button key={'stats-' + index} onClick={() => setSelectedStat(value)}
                                variant="outline-secondary" active={value === selectedStat}>
                            {value}</Button>))}
            </ButtonGroup>
            <br/><br/>

            {data.map(((value, index) => <div key={index}>
                <table className="table table-striped">
                    <thead>
                    <th>{value.name}</th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>gearbeitet</td>
                        <td>{convertTime(value.worked)}</td>
                    </tr>
                    <tr>
                        <td>eingeplannt</td>
                        <td>{convertTime(value.planned)}</td>
                    </tr>
                    </tbody>
                </table>
                <br/></div>))}
        </Container>
    )
}

function convertTime(hours) {
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return rhours + " h " + rminutes + " min";
}