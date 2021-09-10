import {Container, DropdownButton, Dropdown, FormControl, Button, InputGroup, Row, Alert} from "react-bootstrap";
import {useState} from "react";
import TimePicker from 'react-times';
import 'react-times/css/material/default.css';
import FirebaseTasks from "./firebase/FirebaseTasks";
import Formatter from "./Formatter";
import Priority from "./Priority";

const format = new Formatter();
const firebaseCon = new FirebaseTasks();

/**
 * Auf der Website kann hier eine neue Tätigkeit hinzugefügt werden.
 * Der User wird mitgegeben über den Localstorage
 * Natürlich werden die Daten validiert und geben eine Fehlermeldung aus.
 *
 * @returns {JSX.Element}
 * @constructor
 * @author Kimberly Moorhouse
 */
export default function CreateTask() {
    const [name, setName] = useState('');
    const [priority, setPriority] = useState('');
    const [from, setFrom] = useState('');
    const [till, setTill] = useState('');

    const rules = [
        {fn: () => name.length < 31, message: "Die Tätigkeit muss max. 30 Buchstaben enthalten"},
        {fn: () => Boolean(priority), message: "Sie müssen eine Priorität setzen"},
        {fn: () => Boolean(from), message: "Sie müssen eine Startzeit setzen"},
        {fn: () => Boolean(till), message: "Sie müssen eine Endzeit setzen"},
        {fn: () => name.length > 2, message: "Die Tätigkeit muss mind. 3 Buchstaben enthalten"}
    ];

    /**
     * kontrolliert, ob die Daten stimmen. Falls diese stimmen werden diese in die Firestore Datenbank gespeichert und
     * die Werte werden aktuallisiert.
     * Falls diese nicht stimmen, bekommt der User eine Fehlermeldung, bei dem was nicht stimme
     */
    function handleSubmit() {
        const failures = rules.filter(r => !r.fn());

        if (failures.length) {
            failures.forEach(r => alert(r.message));
            return;
        }

        //erstellt eine neue Tätigkeit
        firebaseCon.create(name, from, till, priority, localStorage.getItem('email'));

        setName('');
        setFrom('');
        setTill('');
        setPriority('');
    }

    return (
        <Container className="col-10 col-lg-8">
            <h3>Tätigkeit erfassen</h3>
            <br/>

            <InputGroup>
                <InputGroup.Prepend className={"col-4 col-lg-3"}>
                    <InputGroup.Text>Tätigkeit</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl value={name} onChange={e => setName(e.target.value)} id={"name"}/>
            </InputGroup>
            <br/>

            <hr/>
            <h5>{(Boolean(from) && Boolean(till)) ? "dauer: " +
                format.calculateDifferenceDates(format.getDateFromHours(till), format.getDateFromHours(from)) : ''}</h5>

            <Alert variant="warning">
                <label>Von: </label>
                <TimePicker colorPalette="dark" onTimeChange={time => setFrom(time.hour + ":" + time.minute)}
                            time={from}
                            phrases={{confirm: 'Sind Sie sicher?', cancel: 'abbrechen?', close: 'schliessen'}}/>

                <br/><br/>
                <label>Bis: </label>
                <TimePicker colorPalette="dark" onTimeChange={time => setTill(time.hour + ":" + time.minute)}
                            time={till}
                            pharese={{confirm: 'Sind Sie sicher?', cancel: 'abbrechen?', close: 'schliessen'}}/>
            </Alert>

            <hr/>
            <br/>

            <Row>
                <label className="col-4 col-lg-3 offset-lg-2">Priorität: </label>
                <DropdownButton id="dropdown-basic-button" className="col-3" variant="light"
                                title={(Boolean(priority)) ? priority : 'Bitte etwas auswählen'}>
                    <Dropdown.Item onSelect={() => setPriority(Priority.high)}>{Priority.high}</Dropdown.Item>
                    <Dropdown.Item onSelect={() => setPriority(Priority.normal)}>{Priority.normal}</Dropdown.Item>
                    <Dropdown.Item onSelect={() => setPriority(Priority.low)}>{Priority.low}</Dropdown.Item>
                </DropdownButton>
            </Row>

            <br/><br/>
            <Button onClick={handleSubmit} className="col-5" variant="secondary">speichern</Button>
        </Container>
    )
}