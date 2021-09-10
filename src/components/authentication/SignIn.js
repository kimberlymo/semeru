import {Button, Container, FormControl} from "react-bootstrap";
import {useState} from "react";
import FirebaseConnection from "../firebase/FirebaseConnection";
import {NavLink} from "react-router-dom";

/**
 * Hier kann sich der Benutzer anmelden
 * Dazu muss der Benutzer ein gültiges Konto haben und falls dieses nicht vorhanden ist, kann er sich über den
 * Link registrieren.
 *
 * @returns {JSX.Element}
 * @constructor
 * @author Kimberly Moorhouse
 */
export default function SignIn() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const rules = [
        {fn: () => email.match(/.+@.+\..+/), message: "Es wurde keine gültige E-Mail-Adresse angegeben"},
        {fn: () => password.length > 6, message: "Ihres Passwort muss mindestens 6 Zeichen enthalten"}
    ]

    /**
     * Hier werden die Daten validiert und es wird kontrolliert, ob dieser User auf die Datenbank zugreifen kann
     * @param props
     */
    function handleSubmit(props) {
        const failures = rules.filter(r => !r.fn());

        if (failures.length) {
            failures.forEach(r => alert(r.message));
            return;
        }

        FirebaseConnection.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                localStorage.setItem('email', email);
                props.history.push('schnellmenu')
            })
            .catch((e) => alert(e + "Ihre E-Mail Adresse stimmt nicht überein mit dem Passwort."));
    }

    return (
        <Container>
            <h2>Anmeldung</h2>
            <br/>

            <label htmlFor="email">E-Mail Adresse: </label>
            <FormControl value={email} onChange={e => setEmail(e.target.value)} id={"email"}/>
            <br/>

            <label htmlFor="password">Passwort: </label>
            <FormControl value={password} onChange={e => setPassword(e.target.value)} type={"password"}
                         id={"password"}/>
            <br/><br/>


            <Button className="col-8" onClick={handleSubmit} variant="secondary">Anmelden</Button><br/><br/>
            <NavLink to="/registrieren">Kein Konto? Melden Sie sich hier an!</NavLink>
        </Container>
    )
}