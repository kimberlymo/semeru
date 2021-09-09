import {Button, Container, Form, FormControl, InputGroup} from "react-bootstrap";
import {useState} from "react";
import firebase from "firebase";
import FirebaseUsers from "../firebase/FirebaseUsers";

/**
 * Hier kann sich der Benutzer registrieren und sein Konto wird eröffnet.
 * Dazu muss der Benutzer seine Email-Adresse, Vor- und Nachname und Passwort angeben.
 * Das Passwort wird NICHT in die Collection "user" GESPEICHERT!
 * AUSSEHEN NOCH IN BEARBEITUNG
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 * @author Kimberly Moorhouse
 */
export default function SignUp(props) {
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState({value: '', confirmPwd: ''})

    const rules = [
        {fn: () => firstname.length < 31, message: "Ihr Vorname muss max. 30 Buchstaben enthalten"},
        {fn: () => firstname.length > 2, message: "Ihr Vorname muss mind. 3 Buchstaben enthalten"},
        {fn: () => firstname.match(/\w+/), message: "Ihr Vorname muss Buchstaben enthalten"},
        {fn: () => lastname.length < 31, message: "Ihr Nachname muss max. 30 Buchstaben enthalten"},
        {fn: () => lastname.match(/\w+/), message: "Ihr Nachname kann nur Buchstaben enthalten"},
        {fn: () => lastname.length > 2, message: "Ihr Nachname muss mind. 3 Buchstaben enthalten"},
        {fn: () => email.match(/.+@.+\..+/), message: "Es wurde keine gültige E-Mail-Adresse angegeben"},
        {fn: () => password.value.length > 6, message: "Ihres Passwort muss mind. 6 Zeichen enthalten"},
        {fn: () => password.confirmPwd === password.value, message: "Ihre Passwörter sind nicht identisch"}
    ]

    /**
     * erstellt einen User und dieser kann in der Zukunft mit diesen Konto anmelden
     * Dazu werden noch alle Felder validiert und falls diese nicht gültig sind, wird eine Fehlermeldung ausgegeben
     */
    function handleSubmit() {
        const failures = rules.filter(r => !r.fn());
        const firebaseCon = new FirebaseUsers();

        if (failures.length) {
            failures.forEach(r => alert(r.message));
            return;
        }

        //erstellt eine Registration, damit dieser User auf diese Datenbank zugreifen kann.
        firebase.auth().createUserWithEmailAndPassword(email, password.value)
            .then(() => {
                firebaseCon.create(email, firstname, lastname);
                localStorage.setItem('email', email);
                props.history.push('schnellmenu')
            })
            .catch(error => alert("Es ist ein Fehler aufgetreten: " + error));
    }

    return (
        <Container className={"col-10"}>
            <h3>Registrieren</h3>
            <br/>

            <Form>
                <InputGroup>
                    <InputGroup.Prepend
                        className={"col-4"}><InputGroup.Text>E-Mail</InputGroup.Text></InputGroup.Prepend>
                    <FormControl value={email} type={"e-mail"} onChange={e => setEmail(e.target.value)}
                                 isValid={email.match(/.+@.+\..+/)}/>
                </InputGroup>
                <br/>

                <InputGroup>
                    <InputGroup.Prepend
                        className={"col-4"}><InputGroup.Text>Vorname</InputGroup.Text></InputGroup.Prepend>
                    <FormControl value={firstname} onChange={e => setFirstname(e.target.value)}/>
                </InputGroup>
                <br/>

                <label htmlFor="lastname">Nachname</label>
                <FormControl value={lastname} id="lastname" onChange={e => setLastname(e.target.value)}/>
                <br/>

                <label htmlFor="password">Passwort</label>
                <FormControl value={password.value} onChange={e => setPassword({...password, value: e.target.value})}
                             type={"password"} id={"password"}/>
                <br/>

                <label htmlFor="password">Passwort bestätigen</label>
                <FormControl value={password.confirmPwd} type={"password"} id={"confirmPassword"}
                             onChange={e => setPassword({...password, confirmPwd: e.target.value})}/>
                <br/><br/>

                <Button className="col-4" onClick={handleSubmit}>Registrieren</Button>
            </Form>
        </Container>
    )
}